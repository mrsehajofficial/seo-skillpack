/**
 * ============================================================================
 * SITEMAP PING & NOTIFICATION SCRIPT
 * ============================================================================
 *
 * Automatically notifies search engines that your sitemap has been updated.
 * Run this in your deployment pipeline or CI/CD workflow (e.g. GitHub Actions).
 *
 * Usage:
 *   node scripts/ping-sitemap.mjs https://yourdomain.com/sitemap.xml
 */

const sitemapUrl =
  process.argv[2] ||
  process.env.SITEMAP_URL ||
  "https://yourdomain.com/sitemap.xml";

const engines = [
  {
    name: "Google (Webmaster Ping)",
    url: `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
  },
  {
    name: "Bing (Webmaster Ping)",
    url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
  },
];

console.log(`\n📢 Notifying search engines of updated sitemap: ${sitemapUrl}\n`);

for (const engine of engines) {
  try {
    const res = await fetch(engine.url);
    console.log(`  ${engine.name}: Response HTTP ${res.status}`);
  } catch (err) {
    console.warn(`  ⚠️ Failed to ping ${engine.name}:`, err.message);
  }
}

console.log("\nNote: For Google, submitting via Google Search Console URL Inspection or Sitemaps panel is recommended for instant crawling.");
