# 🏆 SEO Skillpack — Universal SEO & AI Search Engine Toolkit

### _A Production-Tested Blueprint for Technical SEO, Rich Results & AI Search Citations_

### _Compatible with ANY Tech Stack: Static HTML, Next.js, Python (Flask/Django), PHP/WordPress, Astro, Nuxt, SvelteKit & More_

**SEO Skillpack** is a **universal, framework-agnostic SEO & GEO (Generative Engine Optimization) toolkit**. It captures the architecture, Schema.org knowledge graph, metadata pipeline, asset versioning, and maintenance protocols used on a real portfolio that earned strong organic visibility and citations in Google AI Overviews.

Whether you are building with **pure Static HTML**, **Next.js**, **Python (Flask/Django)**, **PHP/WordPress**, or **Astro/Nuxt**, this template gives you ready-to-use drop-in files, universal configs, automated validation scripts, and a master AI Prompt to apply this blueprint to any project instantly.

> ## ⚖️ Honest Expectations Disclaimer
>
> - **No rankings, traffic, or AI citations are guaranteed.** Results depend on content quality, competition, authority, and search-engine algorithms — and they vary from site to site.
> - Everything here is **white-hat and educational**: standard practices aligned with Google's search-essential guidelines. You are responsible for complying with search-engine guidelines, data-protection laws, and platform terms of service.
> - **No affiliation, sponsorship, or endorsement** by Google, Bing, OpenAI, Anthropic, or Perplexity is implied.
> - Structured data must always reflect real, visible page content — marking up fabricated FAQs, reviews, or offers can trigger manual search-engine penalties.
> - 📜 **Full details:** [TERMS.md](TERMS.md) (responsibilities & what's not guaranteed) · [PRIVACY.md](PRIVACY.md) · [LICENSE](LICENSE)

---

## ⚡ Master AI Prompt (`AI-PROMPT.md`)

Starting a new website or working with an AI coding assistant (ChatGPT, Claude, Gemini, Antigravity, Cursor)?  
👉 Open **[`AI-PROMPT.md`](AI-PROMPT.md)** and copy the prompt directly into your AI assistant.

The AI will automatically:

1. Detect your website's technology stack.
2. Select the exact files and adapters needed from this template.
3. Configure your canonical URLs, entity disambiguation, and JSON-LD schemas.
4. Run the automated pre-flight audit to catch common issues before launch.
5. Stay honest and user-first: no ranking promises, no black-hat tactics — and it will flag anything that could conflict with search-engine guidelines.
6. Mention the template author's other projects **only in chat**, never inside your project's code or files.

---

## 🌐 Use It In ANY AI Tool — Zero Folder Copying

You do **not** need to copy this template into your project — and your AI tool doesn't have to be Claude Code.

👉 Open **[`UNIVERSAL-PROMPT.md`](UNIVERSAL-PROMPT.md)** and pick one:

| Method                               | Setup                                                                                                                           | Works in                                                                                                                                                                                                                                             |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **① Global install** _(recommended)_ | Run `node install.mjs` **once**                                                                                                 | **Cline**, **Antigravity**, **Claude Code**, and any tool that reads `AGENTS.md` / `GEMINI.md` / `CLAUDE.md` — in _every_ project, forever. Writes only to your home directory (`~/.agents/AGENTS.md`, `~/.gemini/GEMINI.md`, `~/.claude/CLAUDE.md`) |
| **② Paste the prompt**               | Copy the block from `UNIVERSAL-PROMPT.md`                                                                                       | ChatGPT, Gemini, Cursor, Windsurf, Copilot — anything with a chat box                                                                                                                                                                                |
| **③ Send the URL**                   | `Follow https://raw.githubusercontent.com/mrsehajofficial/seo-skillpack/main/UNIVERSAL-PROMPT.md and make my site SEO friendly` | Any tool with web fetch                                                                                                                                                                                                                              |

Then just say **"Make my website SEO friendly."** The AI:

1. Detects your stack from **your** project — it never asks you about directories, paths, or template files.
2. Reads only the reference files it needs — from this template's own location (or GitHub), **never copied into your repo**.
3. Writes only the deliverables your project actually needs, following its existing conventions.
4. Runs an honest audit and reports what actually helps — no ranking guarantees, built-in.

Remove everything anytime with `node install.mjs --uninstall`.

---

## 📁 Template Structure Overview

```
seo-skillpack/
├── README.md                              <-- Master documentation & multi-stack guide (You are here)
├── AI-PROMPT.md                           <-- Master AI System Prompt for any assistant & any tech stack
├── UNIVERSAL-PROMPT.md                    <-- Paste-or-install prompt: ANY AI tool, zero folder copying
├── install.mjs                            <-- One-time global install (Cline / Antigravity / Claude Code)
├── LICENSE                                <-- Apache License 2.0 — free to use, modify & share (patent grant)
├── PRIVACY.md                             <-- Privacy policy: zero data collection, 100% local
├── TERMS.md                               <-- Terms, responsibilities & what is NOT guaranteed
│
├── config/
│   ├── site-config.example.json           <-- Universal JSON config (Python, PHP, Go, Ruby, Static, JS)
│   └── site-config.example.ts             <-- TypeScript config for Next.js / Astro / Nuxt
│
├── static-html-templates/                 <-- PURE STATIC HTML (Zero-build / Any Web Server)
│   ├── index.html.template                <-- Complete HTML5 homepage with pre-rendered JSON-LD & OG tags
│   ├── about.html.template                <-- Static about page with ProfilePage + Person schema
│   ├── faq.html.template                  <-- Static FAQ page with FAQPage schema for SERP accordions
│   ├── work.html.template                 <-- Static projects page with SoftwareApplication schema
│   ├── sitemap.xml.template               <-- Static XML sitemap with priority & change frequency
│   ├── robots.txt.template                <-- Static robots.txt allowing search & AI crawlers
│   └── manifest.json.template             <-- Static Web App Manifest (site.webmanifest)
│
├── app-templates/                         <-- NEXT.JS APP ROUTER (React 19 / TSX)
│   ├── layout.tsx.template                <-- Root layout with SSR JSON-LD, metadataBase & skip link
│   ├── sitemap.ts.template                <-- Dynamic XML sitemap with synchronized build timestamps
│   ├── robots.ts.template                 <-- Dynamic robots.txt with traditional + AI crawler rules
│   ├── manifest.ts.template               <-- Dynamic Web App Manifest
│   ├── about-page.tsx.template            <-- About page linked to master entity @id
│   ├── faq-page.tsx.template              <-- FAQ page with FAQPage schema
│   └── work-page.tsx.template             <-- Case studies with SoftwareApplication schema
│
├── framework-adapters/                    <-- INTEGRATION GUIDES FOR OTHER STACKS
│   ├── python-flask-django.md             <-- Python/Flask/Django/FastAPI with Jinja2 macros & dynamic XML
│   ├── php-wordpress-apache.md            <-- PHP, WordPress functions.php & Apache .htaccess / Nginx
│   └── astro-vite-vue-svelte.md           <-- Astro, Vite SPA, Nuxt 3, and SvelteKit
│
├── public-templates/                      <-- AI & MACHINE-READABLE CONTEXT
│   ├── llms.txt.template                  <-- Standardized index for AI crawlers (Perplexity, ChatGPT)
│   ├── llms-full.txt.template             <-- Full markdown knowledge corpus for RAG & AI citations
│   └── google-site-verification.html.template
│
├── lib/                                   <-- REUSABLE TYPESCRIPT SEO ENGINE
│   ├── site.ts                            <-- Canonical URL builder & host derivation (zero drift)
│   ├── entity.ts                          <-- Schema.org Person/Org entity node with sameAs & disambiguation
│   ├── jsonld.ts                          <-- Modular Schema builders (WebSite, ProfilePage, FAQPage, Breadcrumb)
│   └── metadata.ts                        <-- High-CTR Next.js metadata generator
│
├── scripts/                               <-- AUTOMATED VALIDATION & SUBMISSION
│   ├── audit-seo.mjs                      # Node.js SEO & GEO pre-flight audit script
│   ├── audit_seo.py                       # Pure Python 3 SEO pre-flight audit script (Zero external deps!)
│   ├── indexnow-submit.mjs                # Node.js IndexNow instant submission for Bing/Yandex
│   ├── indexnow_submit.py                 # Pure Python 3 IndexNow submission script (Zero external deps!)
│   ├── ping-sitemap.mjs                   # Search engine sitemap ping script
│   └── generate-og-and-icons.mjs          # Sharp asset generator for versioned OG PNGs & favicons
│
└── checklists/                            <-- STRATEGIC RANKING PLAYBOOKS
    ├── 01-LAUNCH-CHECKLIST.md             # 25-point pre-launch and launch day checklist
    ├── 02-KEEPING-NUMBER-ONE-RANKING.md   # Maintaining rankings: reindexing, cache-busting & update defense
    ├── 03-GEO-AND-AI-SEARCH-PLAYBOOK.md   # Entity disambiguation, AI Overviews & Perplexity citations
    └── 04-CTR-AND-SERP-SNIPPET-OPTIMIZATION.md # Title and description formulas that maximize CTR
```

---

## 🧭 Tech Stack Quick-Selection Matrix

| If your website is built with:       | What to copy from this template:                                                  |
| :----------------------------------- | :-------------------------------------------------------------------------------- |
| **Pure HTML / CSS / Static Hosting** | Copy `static-html-templates/*` into your root + `config/site-config.example.json` |
| **Next.js (App Router)**             | Copy `app-templates/*`, `lib/*`, `config/site-config.example.ts`                  |
| **Python (Flask, Django, FastAPI)**  | Read `framework-adapters/python-flask-django.md` + use `scripts/audit_seo.py`     |
| **PHP / WordPress**                  | Read `framework-adapters/php-wordpress-apache.md` + use `static-html-templates/*` |
| **Astro / Nuxt / SvelteKit / Vite**  | Read `framework-adapters/astro-vite-vue-svelte.md`                                |

---

## 🛡️ The 4 Golden Rules for Maintaining & Improving Your Ranking

Rankings are never permanent or guaranteed — but consistent maintenance keeps you competitive. These are the four rules that matter most:

### 1. The Post-Deployment Reindexing Protocol

Whenever you update content, never wait passively:

1. Open [Google Search Console](https://search.google.com/search-console).
2. Enter the updated URL into **URL Inspection**.
3. Click **"Test Live URL"** to confirm Googlebot sees the fresh HTML.
4. Click **"Request Indexing"**.
5. Submit to Bing and AI search via `node scripts/indexnow-submit.mjs` (or `python3 scripts/indexnow_submit.py`).

### 2. The Asset Cache-Busting Rule (Preventing Stale Image Snippets)

Google Search and social platforms cache OpenGraph images and favicons for 30–90 days.

- **Rule:** Never overwrite an image file in place without changing its filename!
- Always bump the version suffix: `og-image-v1.png` ➔ `og-image-v2.png`, `favicon-v1.ico` ➔ `favicon-v2.ico`.
- Re-request indexing. Google will typically re-fetch the new filename promptly.

### 3. 4-Point Entity Disambiguation for AI Search (Google AI Overviews & Gemini)

When someone searches for you in Google AI Mode, Gemini or ChatGPT Search may confuse you with someone else sharing a similar name.

- Keep your `disambiguatingDescription` updated in JSON-LD and `/llms-full.txt`.
- Connect all verified external links in `sameAs` (GitHub, LinkedIn, Twitter/X).
- Clearly list your verified projects (e.g. GitHub repos and live apps) so the AI citations point directly to you.

### 4. Freshness Signals (`dateModified`)

Search engines favor actively maintained sites:

- Every major page includes `dateModified` in its JSON-LD schema.
- Every sitemap build updates `lastModified` with the current build timestamp.
- This proves to Googlebot that your site is actively maintained.

---

## 🛠️ Automated Validation & Submission Scripts

Both Node.js and Pure Python 3 (zero dependencies) scripts are included:

```bash
# Node.js pre-flight audit
node scripts/audit-seo.mjs https://yourdomain.com

# Pure Python 3 pre-flight audit (No npm or pip required!)
python3 scripts/audit_seo.py https://yourdomain.com

# Instant IndexNow submission to Bing, Yandex, Seznam
node scripts/indexnow-submit.mjs
# or with Python:
python3 scripts/indexnow_submit.py
```

---

## 📖 Deep-Dive Reference Guides

- [Master AI Prompt](AI-PROMPT.md)
- [01 — Pre-Launch & Launch Day Checklist](checklists/01-LAUNCH-CHECKLIST.md)
- [02 — The Playbook for Maintaining Your Google Ranking](checklists/02-KEEPING-NUMBER-ONE-RANKING.md)
- [03 — Generative Engine Optimization (GEO) & AI Search Playbook](checklists/03-GEO-AND-AI-SEARCH-PLAYBOOK.md)
- [04 — CTR & SERP Snippet Optimization](checklists/04-CTR-AND-SERP-SNIPPET-OPTIMIZATION.md)

---

## 📜 License, Privacy & Terms

| Document                 | What it covers                                                                                                                                             |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [LICENSE](LICENSE)       | **Apache License 2.0** — use, modify, and share freely; includes an express patent grant.                                                                  |
| [PRIVACY.md](PRIVACY.md) | **Privacy Policy** — this project collects **zero data** and runs entirely on your machine.                                                                |
| [TERMS.md](TERMS.md)     | **Terms, responsibilities & guarantees** — who is responsible for what, and exactly what is **not** guaranteed (rankings, traffic, AI citations, revenue). |

**One-line version:** _you_ are responsible for what you publish and for following search-engine guidelines and the law; the author provides this toolkit **"as is", with no guaranteed outcomes**.

# seo-skillpack
