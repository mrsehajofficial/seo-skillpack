# 🔒 Privacy Policy — SEO Skillpack

**Effective date:** 27 September 2026

> ### TL;DR
> **This project collects nothing and phones home nowhere.** There is no server, no account, no analytics, and no way for the author to see what you do with it. Everything runs on your own machine.

---

## 1. Scope

This policy covers everything in the **SEO Skillpack** repository: templates, prompts (`AI-PROMPT.md`, `UNIVERSAL-PROMPT.md`), scripts (`scripts/`), the installer (`install.mjs`), checklists, and configuration examples.

## 2. What we collect: nothing

The author operates no backend, service, or dashboard for this project. The project does **not** collect:

- personal data (names, emails, addresses, identifiers)
- usage statistics, telemetry, crash reports, or diagnostics
- cookies, tracking pixels, fingerprints, or device data
- IP addresses or browsing behavior (there is no server to receive them)

We do not sell, share, rent, or analyze data — because none exists.

## 3. What actually runs when you use it (all on your machine)

| Component | What it does | Network traffic |
|---|---|---|
| `install.mjs` | Writes or removes a small text block in `~/.agents/AGENTS.md`, `~/.gemini/GEMINI.md`, `~/.claude/CLAUDE.md` (and purges any legacy block left in `~/.gemini/AGENTS.md` by older versions) | **None** — local file I/O only |
| `scripts/audit-seo.mjs` · `scripts/audit_seo.py` | Read local project files and fetch pages for SEO checks | **Only** the site URL *you* pass in (your site or `localhost`); output printed to your terminal |
| `scripts/indexnow-submit.*` · `scripts/ping-sitemap.*` | Submit your site's URLs to search engines | Sends your **site URLs** (not personal data) to IndexNow (Bing/Yandex/Seznam) / search engines — **only when you run them, on purpose** |
| The AI prompt | Instructs the AI tool *you* chose to inspect your project | Your project content goes to **that AI provider** under their privacy policy — never to us |

## 4. Templates you deploy to your own site

The templates contain **no analytics, trackers, cookies, or third-party embeds** — only metadata, `link` tags, and Schema.org JSON-LD. Two notes:

- **Structured data publishes what you configure.** The `Person`/`Organization` JSON-LD exposes fields from `config/site-config.*` — keep private information out of it.
- **If you add trackers later** (Google Analytics, ad pixels, external fonts, cookie banners), *you* become the data controller: you must disclose them in **your site's** privacy notice and obtain consent where your law (GDPR, ePrivacy, CCPA, …) requires it.

## 5. Third-party services & links

This project points to third parties — GitHub, Google Search Console, Bing Webmaster Tools, IndexNow endpoints, AI vendors. When *you* choose to use them, their own privacy policies apply. Downloading this repository from GitHub involves GitHub's standard server logs, governed by [GitHub's Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement).

## 6. Children

This is a technical developer toolkit and is not directed at children. Since no data is collected at all, we cannot and do not knowingly collect anyone's data.

## 7. Changes

Any future change to this policy will be committed to the repository with an updated effective date at the top of this file.

## 8. Contact

Questions? Open an issue: [github.com/mrsehajofficial/seo-skillpack/issues](https://github.com/mrsehajofficial/seo-skillpack/issues)
