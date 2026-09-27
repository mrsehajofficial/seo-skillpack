#!/usr/bin/env python3
"""
=============================================================================
PRE-FLIGHT SEO AUDIT SCRIPT (Pure Python 3 — Zero External Dependencies)
=============================================================================

Runs automated checks against your site to verify title length, meta description,
canonical links, OpenGraph tags, JSON-LD validity, and AI discovery files.

Works on ANY system with standard Python 3. No npm, pip, or node required.

Usage:
    python3 scripts/audit_seo.py https://yourdomain.com
    python3 scripts/audit_seo.py http://localhost:8000
"""

import sys
import re
import json
import urllib.request
from pathlib import Path

target_url = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3000"
routes_to_test = ["/", "/about", "/work", "/faq"]

print("\n" + "=" * 55)
print(f"🚀 RUNNING SEO & GEO PRE-FLIGHT AUDIT: {target_url}")
print("=" * 55 + "\n")

warnings = 0
errors = 0

def report_pass(msg):
    print(f"  ✅ PASS: {msg}")

def report_warn(msg):
    global warnings
    print(f"  ⚠️  WARN: {msg}")
    warnings += 1

def report_fail(msg):
    global errors
    print(f"  ❌ FAIL: {msg}")
    errors += 1

# 1. Check local static discovery files if running in project directory
print("📁 1. Checking Static Discovery & AI Context Files...")
current_dir = Path(__file__).resolve().parent
project_root = current_dir.parent.parent if (current_dir.parent.parent / "public").exists() else current_dir.parent

required_files = ["public/robots.txt", "public/llms.txt", "public/llms-full.txt"]
for rel_path in required_files:
    full_path = project_root / rel_path
    app_path = project_root / rel_path.replace("public/", "app/").replace(".txt", ".ts")
    if full_path.exists() or app_path.exists():
        report_pass(f"Found {rel_path} (or dynamic equivalent)")
    else:
        report_warn(f"Missing {rel_path} — AI search engines (Perplexity/ChatGPT) rely on this!")

# 2. Test live pages
print("\n🌐 2. Testing Live Page Headers & Metadata...")

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

def audit_page(route):
    url = f"{target_url.rstrip('/')}{route}"
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as response:
            html = response.read().decode("utf-8", errors="ignore")
    except Exception as e:
        report_warn(f"Could not fetch {url}: {e}")
        return

    # Check Title
    title_match = re.search(r"<title[^>]*>(.*?)</title>", html, re.IGNORECASE | re.DOTALL)
    if not title_match:
        report_fail(f"[{route}] Missing <title> tag!")
    else:
        title = title_match.group(1).strip()
        if len(title) > 60:
            report_warn(f"[{route}] Title is {len(title)} chars (Google truncates > 60 chars): \"{title[:45]}...\"")
        else:
            report_pass(f"[{route}] Title ({len(title)} chars): \"{title}\"")

    # Check Description
    desc_match = re.search(r'<meta[^>]*name=["\']description["\'][^>]*content=["\'](.*?)["\']', html, re.IGNORECASE)
    if not desc_match:
        report_fail(f"[{route}] Missing meta description!")
    else:
        desc = desc_match.group(1).strip()
        if len(desc) < 100 or len(desc) > 165:
            report_warn(f"[{route}] Description is {len(desc)} chars (Optimal is 130-160 chars for CTR): \"{desc[:40]}...\"")
        else:
            report_pass(f"[{route}] Description optimal ({len(desc)} chars)")

    # Check Canonical
    canon_match = re.search(r'<link[^>]*rel=["\']canonical["\'][^>]*href=["\'](.*?)["\']', html, re.IGNORECASE)
    if not canon_match:
        report_fail(f"[{route}] Missing canonical link tag!")
    else:
        report_pass(f"[{route}] Canonical set: {canon_match.group(1)}")

    # Check OpenGraph Image
    og_match = re.search(r'<meta[^>]*property=["\']og:image["\'][^>]*content=["\'](.*?)["\']', html, re.IGNORECASE)
    if not og_match:
        report_warn(f"[{route}] Missing og:image tag (social shares will appear blank)")
    else:
        report_pass(f"[{route}] og:image found: {og_match.group(1)}")

    # Check JSON-LD
    json_ld_matches = re.findall(r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', html, re.IGNORECASE | re.DOTALL)
    if not json_ld_matches:
        report_warn(f"[{route}] No JSON-LD structured data detected!")
    else:
        valid_schemas = 0
        for block in json_ld_matches:
            try:
                json.loads(block.strip())
                valid_schemas += 1
            except Exception:
                report_fail(f"[{route}] Malformed JSON-LD script block!")
        report_pass(f"[{route}] Found {valid_schemas} valid JSON-LD schema block(s)")

for route in routes_to_test:
    print(f"\nChecking route: {route}")
    audit_page(route)

print("\n" + "=" * 55)
if errors == 0 and warnings == 0:
    print("🎉 AUDIT PASSED 100%! Technical SEO checks passed — launch-ready. (No ranking is guaranteed.)")
elif errors == 0:
    print(f"⚡ AUDIT PASSED WITH {warnings} WARNING(S). Review recommendations above.")
else:
    print(f"🛑 AUDIT FAILED WITH {errors} ERROR(S) AND {warnings} WARNING(S). Fix errors before deployment!")
print("=" * 55 + "\n")
