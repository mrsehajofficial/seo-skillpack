# 🛡️ 02 — The Playbook for Maintaining & Improving Your Google Ranking

Earning a top position is only half the battle. Keeping it requires proactive maintenance, cache management, freshness signals, and monitoring. Follow this operational playbook to protect the visibility you have earned — noting that no ranking position is ever guaranteed.

---

## 1. The Post-Deployment Reindexing Protocol

Whenever you update your website (new case study, updated bio, revised keywords, new design):

### Step A: Push to Production
Deploy your changes to your hosting provider (Vercel, Netlify, Wasmer, Render, VPS).

### Step B: Inspect & Request Indexing in Google Search Console
Search engine bots do not instantly re-crawl every website on the internet every day. If you wait passively, Google may take 2 to 4 weeks to notice your updates.
1. Open [Google Search Console](https://search.google.com/search-console).
2. Paste the modified URL into the top search bar (**URL Inspection**).
3. Click **"Test Live URL"** (takes ~30-45 seconds; verifies Googlebot sees the new content).
4. Click **"Request Indexing"**.
5. Repeat for any other specific URLs you changed (e.g., `/about` or `/work`).
> 💡 *Note: You don't need to re-request all pages if only one page changed. Requesting the root URL and the specific modified page is optimal.*

### Step C: Trigger IndexNow for Instant Bing / AI Search Updates
Run the automated submission script:
```bash
node scripts/indexnow-submit.mjs
```
Bing and participating AI crawlers typically pick up the changes within hours.

---

## 2. The Google Asset Cache-Busting Rule (Never Get Stuck With Old Images)

### The Problem:
Google Search, social media platforms (X/Twitter, LinkedIn, Facebook, WhatsApp), and CDNs cache OpenGraph preview images and favicons very aggressively — often for **30 to 90 days**!
If you replace `og-image.png` with a new design but keep the exact same filename, Google will continue displaying your old image in search cards.

### The Solution: The Versioned Asset Protocol
Never overwrite an asset in place without updating its filename:
1. Change `og-image-v1.png` ➔ `og-image-v2.png`.
2. Change `favicon-v1.ico` ➔ `favicon-v2.ico`.
3. Change `apple-touch-icon-v1.png` ➔ `apple-touch-icon-v2.png`.
4. Update the references in `app/layout.tsx`, `app/manifest.ts`, and `lib/entity.ts`.
5. Deploy and submit URL Inspection in Google Search Console.

Because Googlebot sees a brand-new filename URL, it will usually fetch and render the new image promptly.

---

## 3. Freshness Signals & Schema `dateModified`

Google heavily favors content that demonstrates active maintenance:
- In your JSON-LD schemas (`ProfilePage`, `AboutPage`, `WebPage`), always include or update `dateModified`:
  ```typescript
  dateModified: new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  ```
- In your dynamic `sitemap.ts`, ensure `lastModified` uses a synchronized build timestamp (`const BUILD_TIME = new Date()`).
- Add a visible "Last updated: [Month, Year]" or release date on project case studies.

---

## 4. Staying Resilient Through Google Core Updates

Google releases Core Algorithm Updates and Helpful Content Updates several times per year. Sites that drop usually suffer from one of three issues:

1. **Thin or Generic Content:**
   Avoid generic buzzwords ("passionate developer building innovative solutions"). Use specific, concrete, verifiable facts ("Built asynchronous Python bot handling 50k events with sliding-window anti-flood").
2. **Entity Ambiguity:**
   Keep your `disambiguatingDescription` and `sameAs` links active. If Google gets confused about who you are, your Knowledge Panel will flicker or merge with someone else.
3. **Broken Links & Redirect Chains:**
   Run an internal link check every quarter. Fix any 404 errors immediately or add clean 301 redirects.

---

## 5. Click-Through Rate (CTR) Defense

Search engines observe how searchers interact with results. A listing that earns more clicks than expected for its position tends to hold or improve that position, while a dropping CTR can lead to position fluctuations. Engagement is one of many ranking signals — nothing is guaranteed.

### How to maintain high CTR:
- **Title under 60 characters:** Never let your main keyword get cut off by an ellipsis (`...`).
- **Description between 130 and 160 characters:** Include a direct value proposition and call to action.
- **Maintain Rich Snippets:** Keep your `FAQPage` schema active so your listing occupies more vertical space on search screens.

---

## 6. Regular Maintenance Cadence

| Frequency | Action Item |
| :--- | :--- |
| **Weekly** | Check Google Search Console **Performance** tab for queries, clicks, impressions, and average position. |
| **Monthly** | Run `node scripts/audit-seo.mjs` to ensure no metadata or canonical regressions were introduced. |
| **Quarterly** | Update `/llms.txt` and `/llms-full.txt` with latest projects, metrics, and achievements. |
| **On Changes** | Bump asset version (v1 ➔ v2), deploy, and run GSC URL Inspection Request Indexing. |
