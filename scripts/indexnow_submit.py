#!/usr/bin/env python3
"""
=============================================================================
INDEXNOW INSTANT SUBMISSION SCRIPT (Pure Python 3 — Zero External Dependencies)
=============================================================================

Notifies Microsoft Bing, Yandex, Seznam, and Naver of updated or deployed URLs
so crawlers index changes immediately without waiting weeks.

Usage:
    python3 scripts/indexnow_submit.py
"""

import os
import json
import urllib.request

HOST = os.environ.get("SITE_HOST", "yourdomain.com")
KEY = os.environ.get("INDEXNOW_KEY", "YOUR_INDEXNOW_KEY_HERE")
KEY_LOCATION = f"https://{HOST}/{KEY}.txt"

URL_LIST = [
    f"https://{HOST}/",
    f"https://{HOST}/about",
    f"https://{HOST}/work",
    f"https://{HOST}/stack",
    f"https://{HOST}/faq",
]

def submit_indexnow():
    print(f"📡 Submitting {len(URL_LIST)} URLs to IndexNow (Bing/Yandex/Seznam)...")
    payload = {
        "host": HOST,
        "key": KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": URL_LIST,
    }
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        "https://api.indexnow.org/indexnow",
        data=data,
        headers={"Content-Type": "application/json; charset=utf-8"}
    )
    try:
        with urllib.request.urlopen(req) as response:
            status = response.getcode()
            if status in (200, 202):
                print(f"✅ Success! IndexNow accepted URLs (HTTP {status}). Crawlers dispatched.")
            else:
                print(f"⚠️ IndexNow responded with HTTP {status}")
    except urllib.error.HTTPError as e:
        print(f"⚠️ IndexNow HTTPError {e.code}: {e.read().decode('utf-8')}")
    except Exception as e:
        print(f"❌ Failed to submit to IndexNow API: {e}")

if __name__ == "__main__":
    submit_indexnow()
