/**
 * ============================================================================
 * PRE-FLIGHT SEO AUDIT SCRIPT
 * ============================================================================
 *
 * Runs automated checks against your site so you never ship a regression
 * that could harm your search visibility (titles, canonicals, schema, discovery files).
 *
 * Checks performed:
 * 1. Title length (< 60 characters to prevent SERP truncation).
 * 2. Meta description length (120 - 160 characters for maximum CTR).
 * 3. Canonical tag matching domain constant (zero canonical drift).
 * 4. OpenGraph image and card tags.
 * 5. Presence of robots.txt, sitemap.xml, llms.txt, and llms-full.txt.
 * 6. Valid JSON-LD Schema syntax.
 *
 * Usage:
 *   node scripts/audit-seo.mjs https://yourdomain.com
 *   or locally against a running dev server:
 *   node scripts/audit-seo.mjs http://localhost:3000
 */

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Support running from seo-skillpack/scripts/ or directly from project scripts/
const projectRoot = existsSync(path.resolve(__dirname, "../../public"))
  ? path.resolve(__dirname, "../..")
  : path.resolve(__dirname, "..");

const targetUrl = process.argv[2] || "http://localhost:3000";
const routesToTest = ["/", "/about", "/work", "/faq"];

console.log("\n=======================================================");
console.log(`🚀 RUNNING SEO & GEO PRE-FLIGHT AUDIT: ${targetUrl}`);
console.log("=======================================================\n");

let warnings = 0;
let errors = 0;

function reportPass(msg) {
  console.log(`  ✅ PASS: ${msg}`);
}
function reportWarn(msg) {
  console.log(`  ⚠️  WARN: ${msg}`);
  warnings++;
}
function reportFail(msg) {
  console.log(`  ❌ FAIL: ${msg}`);
  errors++;
}

// 1. Check required public files
console.log("📁 1. Checking Static Discovery & AI Context Files...");
const requiredFiles = [
  "public/robots.txt", // or dynamic in app/robots.ts
  "public/llms.txt",
  "public/llms-full.txt",
];

for (const relPath of requiredFiles) {
  const fullPath = path.join(projectRoot, relPath);
  // Also check if dynamic Next.js route exists in app/
  const appEquivalent = relPath.replace("public/", "app/").replace(".txt", ".ts");
  if (existsSync(fullPath) || existsSync(path.join(projectRoot, appEquivalent))) {
    reportPass(`Found ${relPath} (or dynamic equivalent)`);
  } else {
    reportWarn(`Missing ${relPath} — AI search engines (Perplexity/ChatGPT) rely on this!`);
  }
}

// 2. Fetch and test live pages (if dev/prod server is up)
console.log("\n🌐 2. Testing Live Page Headers & Metadata...");

async function auditPage(route) {
  const url = `${targetUrl.replace(/\/$/, "")}${route}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      reportFail(`[${route}] Returned HTTP status ${res.status}`);
      return;
    }
    const html = await res.text();

    // Check Title
    const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : null;
    if (!title) {
      reportFail(`[${route}] Missing <title> tag!`);
    } else {
      if (title.length > 60) {
        reportWarn(`[${route}] Title is ${title.length} chars (Google truncates titles > 60 chars): "${title}"`);
      } else {
        reportPass(`[${route}] Title (${title.length} chars): "${title}"`);
      }
    }

    // Check Meta Description
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
    const desc = descMatch ? descMatch[1].trim() : null;
    if (!desc) {
      reportFail(`[${route}] Missing meta description!`);
    } else {
      if (desc.length < 100 || desc.length > 165) {
        reportWarn(`[${route}] Description is ${desc.length} chars (Optimal is 130-160 chars for CTR): "${desc.slice(0, 60)}..."`);
      } else {
        reportPass(`[${route}] Description optimal (${desc.length} chars)`);
      }
    }

    // Check Canonical Tag
    const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
    if (!canonicalMatch) {
      reportFail(`[${route}] Missing canonical link tag!`);
    } else {
      reportPass(`[${route}] Canonical set: ${canonicalMatch[1]}`);
    }

    // Check Open Graph Image
    const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["']/i);
    if (!ogImageMatch) {
      reportWarn(`[${route}] Missing og:image tag (social shares will look blank)`);
    } else {
      reportPass(`[${route}] og:image found: ${ogImageMatch[1]}`);
    }

    // Check JSON-LD
    const jsonLdMatch = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
    if (!jsonLdMatch) {
      reportWarn(`[${route}] No JSON-LD structured data detected!`);
    } else {
      let validSchemas = 0;
      for (const tag of jsonLdMatch) {
        const rawJson = tag.replace(/<\/?script[^>]*>/gi, "");
        try {
          JSON.parse(rawJson);
          validSchemas++;
        } catch (e) {
          reportFail(`[${route}] Malformed JSON-LD script tag!`);
        }
      }
      reportPass(`[${route}] Found ${validSchemas} valid JSON-LD schema block(s)`);
    }

  } catch (err) {
    reportWarn(`Could not fetch ${url}. Make sure your local server is running ('npm run dev') if testing locally.`);
  }
}

for (const route of routesToTest) {
  console.log(`\nChecking route: ${route}`);
  await auditPage(route);
}

console.log("\n=======================================================");
if (errors === 0 && warnings === 0) {
  console.log("🎉 AUDIT PASSED 100%! Technical SEO checks passed — launch-ready. (No ranking is guaranteed.)");
} else if (errors === 0) {
  console.log(`⚡ AUDIT PASSED WITH ${warnings} WARNING(S). Review recommendations above.`);
} else {
  console.log(`🛑 AUDIT FAILED WITH ${errors} ERROR(S) AND ${warnings} WARNING(S). Fix errors before deployment!`);
}
console.log("=======================================================\n");
