# 🚀 01 — Pre-Launch & Launch Day SEO Checklist

This checklist helps your site launch on a solid technical foundation — clean canonicals, valid schema, and the setup search engines and AI crawlers expect. No ranking position is guaranteed, but these are the pre-launch basics that matter most.

---

## Part 1: Technical & Canonical Foundation

- [ ] **Enforce HTTPS Everywhere:** Ensure SSL is active and HTTP permanently redirects (301) to HTTPS.
- [ ] **Single Canonical Host:** Choose `www` or non-`www` and stick to it. Redirect the alternate to your canonical host.
- [ ] **Zero Canonical Drift:** Ensure every page emits an `<link rel="canonical" href="...">` tag derived from the single canonical origin constant (`SITE_URL`).
- [ ] **Trailing Slash Uniformity:** Never mix trailing slashes. All internal links and sitemap entries should follow the canonical format.
- [ ] **No `noindex` Left Behind:** Verify no `meta name="robots" content="noindex"` tags remain from development/staging.
- [ ] **Dynamic `sitemap.xml`:** Ensure `/sitemap.xml` returns valid XML, lists all canonical URLs, and uses a synchronized `lastModified` date.
- [ ] **Production `robots.txt`:** Ensure `/robots.txt` allows search crawlers and AI search bots (`GPTBot`, `ClaudeBot`, `PerplexityBot`), points to `sitemap.xml`, and blocks private paths.

---

## Part 2: Entity & Semantic Schema Markup

- [ ] **Root JSON-LD Knowledge Graph:** Homepage includes `WebSite` and `Person` (or `Organization`) schemas.
- [ ] **Consistent `@id` Linking:** All schemas reference the same canonical URI (e.g. `https://yourdomain.com/#main-entity`).
- [ ] **`sameAs` Verified Profiles:** Connect your social media URLs (GitHub, LinkedIn, Twitter/X, Instagram, YouTube) to cement entity ownership.
- [ ] **`disambiguatingDescription`:** Include a clear disambiguation statement identifying who you are and separating you from similar names.
- [ ] **Rich Snippet Schemas:**
  - `FAQPage` on FAQ sections (powers SERP dropdown accordions).
  - `ProfilePage` on About/Bio pages.
  - `SoftwareApplication` / `CreativeWork` on portfolios and projects.
  - `BreadcrumbList` on deep internal pages.
- [ ] **Google Rich Results Test:** Test your live URLs on [Google Rich Results Test](https://search.google.com/test/rich-results) and confirm zero schema errors.

---

## Part 3: Generative Engine Optimization (GEO) & AI Discovery

- [ ] **Deploy `/llms.txt`:** Place in `/public` so AI crawlers have an instant index of your identity, projects, and contact info.
- [ ] **Deploy `/llms-full.txt`:** Provide full, grounded markdown context for RAG ingestion by ChatGPT, Claude, and Perplexity.
- [ ] **Robots.txt AI Directives:** Allow AI crawlers to fetch `/llms.txt` and `/llms-full.txt`.

---

## Part 4: OpenGraph & Asset Cache Busting

- [ ] **Raster PNG OpenGraph Banner:** 1200×630 PNG card (SVG is ignored by Twitter, Facebook, and LinkedIn!).
- [ ] **Favicon Multi-Format Container:** High-res SVG, 180×180 Apple touch icon, 192×192 & 512×512 PWA icons, and `favicon.ico`.
- [ ] **Versioned Asset Filenames:** Use `og-image-v1.png` and `favicon-v1.ico` instead of unversioned names so Google never serves outdated cached visuals.

---

## Part 5: Search Console Setup & Launch Day Submission

- [ ] **Verify Google Search Console (GSC):**
  - Verify via DNS TXT record or HTML verification tag.
- [ ] **Submit Sitemap:**
  - In GSC, navigate to **Sitemaps** -> Submit `sitemap.xml`.
- [ ] **Inspect & Request Indexing for Root URL:**
  - In GSC, paste your homepage into the **URL Inspection** tool.
  - Click **"Test Live URL"** to confirm Googlebot renders clean HTML.
  - Click **"Request Indexing"**.
- [ ] **Inspect Key Secondary Pages:**
  - Repeat URL Inspection & Request Indexing for `/work`, `/about`, and `/faq`.
- [ ] **Set Up Bing Webmaster Tools:**
  - Import your GSC property into Bing Webmaster Tools.
  - Run `node scripts/indexnow-submit.mjs` to trigger instant IndexNow crawling on Bing, Yandex, and Seznam.
