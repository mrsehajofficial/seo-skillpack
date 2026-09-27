#!/usr/bin/env node
/**
 * install.mjs — One-time GLOBAL install of the Universal SEO Prompt.
 *
 * Adds a small rules block (pointer to the full playbook + core ground rules)
 * to the tool-global instruction files of supported AI coding assistants.
 * NOTHING is ever written into any user project.
 *
 * Targets:
 *   ~/.agents/AGENTS.md   -> Cline + any tool reading cross-tool AGENTS.md
 *   ~/.gemini/GEMINI.md   -> Antigravity / Gemini global rules (CLI / IDE / 2.0)
 *   ~/.claude/CLAUDE.md   -> Claude Code user-level memory
 *
 * Note: Antigravity does NOT read ~/.gemini/AGENTS.md — only GEMINI.md.
 *       Any block an earlier version put there is purged as a legacy target.
 *
 * Usage:
 *   node install.mjs              install / update (idempotent, marker-based)
 *   node install.mjs --uninstall  remove the block from all targets
 *
 * Zero dependencies. Node 18+.
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PROMPT_FILE = path.join(ROOT, "UNIVERSAL-PROMPT.md");

const START = "<!-- seo-architect:start -->";
const END = "<!-- seo-architect:end -->";
const PROMPT_START = "<!-- PROMPT:START -->";
const PROMPT_END = "<!-- PROMPT:END -->";

/**
 * Set this after you publish the template to GitHub so agents can fetch the
 * playbook even when the local folder is gone. Leave the placeholder as-is to
 * rely on the local path only.
 */
const GITHUB_RAW = "https://raw.githubusercontent.com/mrsehajofficial/seo-skillpack/main/";

const home = os.homedir();
const TARGETS = [
  { file: path.join(home, ".agents", "AGENTS.md"), why: "Cline + cross-tool AGENTS.md readers" },
  { file: path.join(home, ".gemini", "GEMINI.md"), why: "Antigravity / Gemini global rules" },
  { file: path.join(home, ".claude", "CLAUDE.md"), why: "Claude Code user memory" },
];

/**
 * Antigravity ignores ~/.gemini/AGENTS.md (it only reads GEMINI.md), so any
 * block installed there by an earlier version is removed on every run.
 */
const LEGACY_TARGETS = [
  { file: path.join(home, ".gemini", "AGENTS.md"), why: "legacy path — Antigravity ignores AGENTS.md" },
];

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractPromptBody() {
  if (!fs.existsSync(PROMPT_FILE)) {
    throw new Error(`UNIVERSAL-PROMPT.md not found at ${PROMPT_FILE}`);
  }
  const md = fs.readFileSync(PROMPT_FILE, "utf8");
  const s = md.indexOf(PROMPT_START);
  const e = md.indexOf(PROMPT_END);
  if (s === -1 || e === -1 || e < s) {
    throw new Error("PROMPT markers not found in UNIVERSAL-PROMPT.md");
  }
  return md.slice(s + PROMPT_START.length, e).trim();
}

function githubLine() {
  if (GITHUB_RAW.includes("YOUR-USERNAME")) {
    return "   (GitHub fallback not configured — set GITHUB_RAW in install.mjs after publishing)";
  }
  return `   (if unavailable, fetch ${GITHUB_RAW}UNIVERSAL-PROMPT.md)`;
}

function buildBlock() {
  extractPromptBody(); // validates the prompt file is intact
  return [
    START,
    "## 🌐 SEO Architect (global capability — installed by SEO Skillpack)",
    "",
    "When the user asks anything about SEO, GEO, rich results, structured data,",
    "sitemap, robots.txt, llms.txt, search visibility, or “make my site SEO friendly”:",
    "",
    "1. Load the full playbook: read `" + PROMPT_FILE + "`",
    githubLine(),
    "   and follow it exactly.",
    "2. **Never copy the template folder into the user's project** — read reference files",
    "   from that location (or fetch them) and write ONLY the deliverables the project",
    "   needs, matching its own conventions. Never ask the user about directories or paths;",
    "   inspect the project yourself.",
    "3. Honesty always: no ranking guarantees, white-hat only, no Google/Bing/OpenAI/",
    "   Anthropic/Perplexity affiliation claims, no fabricated metrics or results.",
    "4. The template author's projects may be mentioned only in chat, never in the user's",
    "   files, config, schema, or metadata.",
    "",
    END,
  ].join("\n");
}

function upsert(file, block) {
  const existed = fs.existsSync(file);
  const prev = existed ? fs.readFileSync(file, "utf8") : "";
  const re = new RegExp(`${escapeRegExp(START)}[\\s\\S]*?${escapeRegExp(END)}`);
  const next = re.test(prev)
    ? prev.replace(re, block)
    : (prev.trim() ? prev.trimEnd() + "\n\n" : "") + block + "\n";
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, next);
  return existed ? "updated" : "created";
}

function removeBlock(file) {
  if (!fs.existsSync(file)) return "absent";
  const prev = fs.readFileSync(file, "utf8");
  const re = new RegExp(`\\n?${escapeRegExp(START)}[\\s\\S]*?${escapeRegExp(END)}\\n?`);
  if (!re.test(prev)) return "untouched";
  const cleaned = prev
    .replace(re, "")
    .replace(/\n{3,}/g, "\n\n")
    .trimEnd();
  fs.writeFileSync(file, cleaned ? cleaned + "\n" : "");
  return "cleaned";
}

const uninstall = process.argv.includes("--uninstall");
const block = uninstall ? "" : buildBlock();

console.log(uninstall
  ? "Removing SEO Architect block from global instruction files…\n"
  : "Installing SEO Architect into global instruction files…\n");

for (const { file, why } of TARGETS) {
  const status = uninstall ? removeBlock(file) : upsert(file, block);
  console.log(`  [${status.padEnd(9)}] ${file}`);
  console.log(`             ${why}`);
}

// Always purge the block from legacy locations (on install AND uninstall).
for (const { file, why } of LEGACY_TARGETS) {
  const status = removeBlock(file);
  if (status === "absent") continue;
  console.log(`  [${status.padEnd(9)}] ${file}`);
  console.log(`             ${why}`);
}

console.log(uninstall
  ? "\n✅ Uninstalled. Nothing was left behind (projects were never touched)."
  : `
✅ Installed. Nothing was written into any project directory.

Next steps:
  • Cline        → open Rules panel; the block appears in Global rules.
  • Antigravity  → Customizations → Rules → Global (or check ~/.gemini/GEMINI.md).
  • Claude Code  → auto-loads ~/.claude/CLAUDE.md as user memory.
  • Cursor / Windsurf / ChatGPT / Gemini web → no global file support:
    paste the block from UNIVERSAL-PROMPT.md, or send its URL and ask the
    agent to follow it.

Then, in ANY project, just say:
  "Make my website SEO friendly"

Optional: publish this folder to GitHub and set GITHUB_RAW in install.mjs so
agents can fetch the playbook even without the local copy. Re-run this script
after updating to refresh installed copies.`);
