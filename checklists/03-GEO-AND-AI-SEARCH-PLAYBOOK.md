# 🤖 03 — Generative Engine Optimization (GEO) & AI Search Playbook

Search is no longer just ten blue links. Today, a massive share of searchers read **Google Search AI Mode / AI Overviews**, **ChatGPT Search**, **Perplexity AI**, and **Claude**.

This guide details the architecture that improves your chances of being cited as a definitive source in AI Overviews, and helps prevent AI engines from confusing you with someone else. (Citations are at each engine's discretion — nothing is guaranteed.)

---

## 1. How AI Search Engines (MUM, Gemini, Perplexity) Retrieve Information

Modern AI engines do not merely match keywords; they perform **Entity Extraction** and **Retrieval-Augmented Generation (RAG)**:

```
Search Query ("Who is [Name]?" / "Best [Role] for [Skill]")
                    │
                    ▼
       1. Entity Disambiguation Check
       Does Google know which exact person/company this is?
                    │
                    ▼
       2. Grounding & Triangulation
       Matches: JSON-LD Graph ⟷ Visible SSR HTML ⟷ Verified Profiles (sameAs) ⟷ llms.txt
                    │
                    ▼
       3. AI Overview Synthesis & Citation Generation
       Synthesizes summary and awards clickable source cards [1] [2]!
```

If your entity information is ambiguous, the AI will either hallucinate or merge your profile with another person who shares a similar name.

---

## 2. The Entity Disambiguation Formula

When someone shares your name (or a name phonetically identical, like "Varma" vs "Verma"), AI models often blend both people into one messy answer.

To prevent this, you must implement **The 4-Point Disambiguation Triangulation**:

### Point 1: JSON-LD `disambiguatingDescription`
In `app/layout.tsx` and `lib/entity.ts`, provide an explicit, unambiguous statement:
```json
{
  "@type": "Person",
  "name": "Sehaj Varma",
  "disambiguatingDescription": "AI Automation Engineer based in India. Known on GitHub as @mrsehajofficial. Not to be confused with Sehaj Verma (Senior Software Engineer at Motive), Sehaj Verma (Social Media Influencer @official_sehaj_verma), or Sahaj Verma (Cricketer)."
}
```

### Point 2: The `sameAs` Authority Web
AI engines cross-verify identities across multiple authoritative platforms. Always link your primary canonical profiles:
- GitHub profile (and public repositories)
- LinkedIn personal profile
- Twitter / X profile
- Personal project live domains

### Point 3: Dual LLM Context Files (`/llms.txt` and `/llms-full.txt`)
AI crawlers (like `GPTBot`, `ClaudeBot`, `PerplexityBot`, and `Google-Extended`) look for standard text files in the root:
- `/llms.txt`: A concise markdown summary (< 2,000 tokens) with your identity, key facts, and deep links.
- `/llms-full.txt`: A full context document including your complete professional biography, project case studies, and disambiguation notes.

### Point 4: Explicit On-Page Visible Copy
Do not hide your specialization. Make sure your visible `<h1>`, hero subtitle, and About copy clearly declare:
- Your exact name and role
- Your primary flagship project name
- Your location / remote status
- Your verified handles

---

## 3. Formatting Content for Maximum AI Citations

AI search engines love citing sources that structure information into factual, high-density blocks:

1. **Use Definition Sentences First:**
   Start pages and sections with a direct definition:
   > *"[Name] is a [Profession] specializing in [Core Competency], best known for developing [Project Name]."*
2. **Use Markdown / Semantic Tables:**
   AI bots parse HTML `<table>` elements and markdown tables with near-perfect recall. Include structured tables for tech stacks, project specs, and metrics.
3. **Use Q&A Formatting (FAQ):**
   When searchers ask conversational questions, AI models extract the exact answer from pages containing `Question` and `Answer` blocks.
4. **Link Directly to Verifiable Proof:**
   Whenever mentioning a project, link directly to its live URL and open-source GitHub repository. AI engines reward verifiable claims with higher confidence scores and citation badges.

---

## 4. How to Test Your AI Grounding

To test how search engines perceive your entity:

1. **Google Search AI Mode:** Search your exact name or brand name. Check the generated AI summary and see if your site is listed in source bubble `[1]`.
2. **Perplexity AI:** Ask: *"Who is [Your Name] and what do they build?"*
   - Verify that the answer points to your canonical domain.
   - Verify that your GitHub and projects are correctly attributed.
3. **ChatGPT Search / Copilot:** Ask: *"Summarize the work and background of [Your Name] from [yourdomain.com]"*.
