/**
 * ============================================================================
 * INDEXNOW INSTANT SUBMISSION SCRIPT
 * ============================================================================
 *
 * IndexNow is an open protocol used by Microsoft Bing, Yandex, Seznam, and Naver.
 * Instead of waiting days or weeks for crawlers to notice new content, this script
 * informs search engines of added, updated, or deleted URLs immediately!
 *
 * How it works:
 * 1. You generate an API key (a random 32-character hex string).
 * 2. You place that key inside a file named {your-key}.txt in /public.
 * 3. Whenever you deploy or update pages, run:
 *    node scripts/indexnow-submit.mjs
 *
 * Documentation: https://www.indexnow.org/
 */

const HOST = process.env.SITE_HOST || "yourdomain.com";
const KEY = process.env.INDEXNOW_KEY || "YOUR_INDEXNOW_KEY_HERE";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// List of all pages recently updated or deployed
const URL_LIST = [
  `https://${HOST}/`,
  `https://${HOST}/about`,
  `https://${HOST}/work`,
  `https://${HOST}/stack`,
  `https://${HOST}/faq`,
];

async function submitIndexNow() {
  console.log(`📡 Submitting ${URL_LIST.length} URLs to IndexNow (Bing/Yandex/Seznam)...`);

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: URL_LIST,
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    if (res.status === 200 || res.status === 202) {
      console.log(`✅ Success! IndexNow accepted URLs (HTTP ${res.status}). Crawlers dispatched.`);
    } else {
      console.warn(`⚠️ IndexNow responded with HTTP ${res.status}: ${await res.text()}`);
    }
  } catch (error) {
    console.error("❌ Failed to submit to IndexNow API:", error);
  }
}

submitIndexNow();
