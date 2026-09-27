/**
 * ============================================================================
 * AUTOMATED ASSET & FAVICON GENERATOR (With Sharp)
 * ============================================================================
 *
 * Why this script is essential for Google Search & SERP Rich Snippets:
 * 1. Google Search displays your favicon in search snippets beside your domain name.
 *    If the favicon is missing, broken, or not multi-resolution, Google shows
 *    a generic default globe icon, killing Click-Through-Rate (CTR).
 * 2. Twitter/X, LinkedIn, iMessage, and Facebook do NOT render SVG OpenGraph cards.
 *    They require real raster PNG images sized exactly at 1200×630.
 * 3. CRITICAL CACHE-BUSTING PROTOCOL:
 *    Google and social media CDNs cache favicons and og:images aggressively
 *    (often for 30–90 days). If you change an image and keep the same filename,
 *    Google will NEVER show the update in search results!
 *    Always bump the version suffix (e.g., from v1 -> v2) whenever updating.
 *
 * Requirements:
 *   npm install -D sharp
 *
 * Usage:
 *   node scripts/generate-og-and-icons.mjs
 */

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.resolve(projectRoot, "public");

// Change this version string whenever you update your brand assets:
const ASSET_VERSION = "v1";

console.log(`\n🎨 Generating Search Assets & OpenGraph Cards (Version: ${ASSET_VERSION})...`);

try {
  // Dynamically import sharp
  const { default: sharp } = await import("sharp");

  // Sample SVG Favicon if none exists
  const defaultFaviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
    <rect width="64" height="64" rx="14" fill="#0f172a"/>
    <text x="50%" y="54%" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="34" fill="#f8fafc" text-anchor="middle" dominant-baseline="middle">SE</text>
  </svg>`;

  // Sample 1200x630 SVG OG Card
  const defaultOgSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0f172a"/>
        <stop offset="100%" stop-color="#1e293b"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)"/>
    <rect x="80" y="80" width="64" height="64" rx="14" fill="#38bdf8"/>
    <text x="112" y="122" font-family="system-ui, sans-serif" font-weight="900" font-size="34" fill="#0f172a" text-anchor="middle">SE</text>
    <text x="80" y="260" font-family="system-ui, sans-serif" font-weight="800" font-size="54" fill="#f8fafc">High-Ranking Engineering Portfolio</text>
    <text x="80" y="330" font-family="system-ui, sans-serif" font-weight="500" font-size="28" fill="#94a3b8">Autonomous AI Agents • Scalable Cloud Systems • High SEO Performance</text>
    <text x="80" y="530" font-family="monospace" font-size="20" fill="#38bdf8">https://yourdomain.com</text>
  </svg>`;

  const faviconBuffer = Buffer.from(defaultFaviconSvg);
  const ogBuffer = Buffer.from(defaultOgSvg);

  const targets = [
    { buffer: ogBuffer, name: `og-image-${ASSET_VERSION}.png`, width: 1200, height: 630 },
    { buffer: faviconBuffer, name: `icon-192-${ASSET_VERSION}.png`, width: 192, height: 192 },
    { buffer: faviconBuffer, name: `icon-512-${ASSET_VERSION}.png`, width: 512, height: 512 },
    { buffer: faviconBuffer, name: `apple-touch-icon-${ASSET_VERSION}.png`, width: 180, height: 180 },
    { buffer: faviconBuffer, name: `icon-maskable-192-${ASSET_VERSION}.png`, width: 192, height: 192 },
    { buffer: faviconBuffer, name: `icon-maskable-512-${ASSET_VERSION}.png`, width: 512, height: 512 },
  ];

  for (const { buffer, name, width, height } of targets) {
    const out = path.join(publicDir, name);
    await sharp(buffer)
      .resize(width, height)
      .png({ compressionLevel: 9 })
      .toFile(out);
    console.log(`  ✔ Generated: public/${name} (${width}x${height})`);
  }

  console.log("\n🎉 All production assets generated successfully!");
  console.log("👉 Make sure your app/layout.tsx and app/manifest.ts reference the current asset version.");
} catch (err) {
  if (err.code === "ERR_MODULE_NOT_FOUND") {
    console.warn("⚠️  Sharp is not installed. To generate real PNGs, run: npm install -D sharp");
  } else {
    console.error("❌ Error generating assets:", err);
  }
}
