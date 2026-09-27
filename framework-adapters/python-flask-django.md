# 🐍 Python / Flask / Django / FastAPI Implementation Guide

This guide explains how to adapt the **High-Ranking SEO Template** into any Python web framework.

---

## 1. Load Universal Configuration (`site_config.py`)

Create a helper to load `config/site-config.example.json` or define it directly in Python:

```python
# site_config.py
import json
from pathlib import Path

CONFIG_PATH = Path(__file__).resolve().parent / "config" / "site-config.example.json"

with open(CONFIG_PATH, "r", encoding="utf-8") as f:
    SITE_CONFIG = json.load(f)

SITE_URL = SITE_CONFIG["siteUrl"].rstrip("/") + "/"
SITE_NAME = SITE_CONFIG["siteName"]

def absolute_url(path: str = "") -> str:
    if not path or path == "/":
        return SITE_URL
    return f"{SITE_URL}{path.lstrip('/')}"
```

---

## 2. Dynamic XML Sitemap in Flask

```python
# app.py (Flask)
from datetime import datetime
from flask import Flask, Response, render_template
from site_config import SITE_URL, absolute_url

app = Flask(__name__)

ROUTES = [
    {"path": "/", "changefreq": "weekly", "priority": "1.0"},
    {"path": "/about", "changefreq": "monthly", "priority": "0.9"},
    {"path": "/work", "changefreq": "monthly", "priority": "0.9"},
    {"path": "/faq", "changefreq": "monthly", "priority": "0.8"},
]

@app.route("/sitemap.xml")
def sitemap():
    today = datetime.utcnow().strftime("%Y-%m-%d")
    xml = ['<?xml version="1.0" encoding="UTF-8"?>']
    xml.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    for route in ROUTES:
        loc = absolute_url(route["path"])
        xml.append("  <url>")
        xml.append(f"    <loc>{loc}</loc>")
        xml.append(f"    <lastmod>{today}</lastmod>")
        xml.append(f"    <changefreq>{route['changefreq']}</changefreq>")
        xml.append(f"    <priority>{route['priority']}</priority>")
        xml.append("  </url>")
    xml.append("</urlset>")
    return Response("\n".join(xml), mimetype="application/xml")

@app.route("/robots.txt")
def robots():
    content = f"""User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

User-agent: GPTBot
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: ClaudeBot
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: PerplexityBot
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

Sitemap: {absolute_url('/sitemap.xml')}
"""
    return Response(content, mimetype="text/plain")
```

---

## 3. Dynamic XML Sitemap in Django

```python
# urls.py (Django)
from django.contrib.sitemaps import Sitemap
from django.contrib.sitemaps.views import sitemap
from django.urls import path
from django.urls import reverse

class StaticViewSitemap(Sitemap):
    priority = 0.9
    changefreq = "monthly"

    def items(self):
        return ["home", "about", "work", "faq"]

    def location(self, item):
        return reverse(item)

sitemaps = {"static": StaticViewSitemap}

urlpatterns = [
    path("sitemap.xml", sitemap, {"sitemaps": sitemaps}, name="django.contrib.sitemaps.views.sitemap"),
]
```

---

## 4. Reusable Jinja2 Base Template (`templates/base.html`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <title>{% block title %}{{ site.siteTitle }}{% endblock %}</title>
  <meta name="description" content="{% block description %}{{ site.siteDescription }}{% endblock %}">
  <link rel="canonical" href="{% block canonical %}{{ site.siteUrl }}{% endblock %}">
  
  <!-- Open Graph -->
  <meta property="og:type" content="{% block og_type %}website{% endblock %}">
  <meta property="og:site_name" content="{{ site.siteName }}">
  <meta property="og:url" content="{% block og_url %}{{ site.siteUrl }}{% endblock %}">
  <meta property="og:title" content="{% block og_title %}{{ site.siteTitle }}{% endblock %}">
  <meta property="og:description" content="{% block og_desc %}{{ site.siteDescription }}{% endblock %}">
  <meta property="og:image" content="{{ site.siteUrl }}{{ site.ogImage.url | replace('^/', '') }}">
  <meta property="og:image:width" content="{{ site.ogImage.width }}">
  <meta property="og:image:height" content="{{ site.ogImage.height }}">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{% block tw_title %}{{ site.siteTitle }}{% endblock %}">
  <meta name="twitter:description" content="{% block tw_desc %}{{ site.siteDescription }}{% endblock %}">
  <meta name="twitter:image" content="{{ site.siteUrl }}{{ site.ogImage.url | replace('^/', '') }}">

  <!-- Favicon Multi-format container -->
  <link rel="icon" href="/static/favicon-v1.ico" sizes="any">
  <link rel="apple-touch-icon" href="/static/apple-touch-icon-v1.png" sizes="180x180">
  <link rel="manifest" href="/static/manifest.json">

  <!-- JSON-LD Structured Data Block -->
  {% block json_ld %}
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "{{ site.siteUrl }}#website",
        "url": "{{ site.siteUrl }}",
        "name": "{{ site.siteName }}"
      },
      {
        "@type": "Person",
        "@id": "{{ site.siteUrl }}#main-entity",
        "name": "{{ site.entity.name }}",
        "jobTitle": "{{ site.entity.jobTitle }}",
        "disambiguatingDescription": "{{ site.entity.disambiguation }}",
        "sameAs": [
          "{{ site.social.github }}",
          "{{ site.social.linkedin }}",
          "{{ site.social.twitter }}"
        ]
      }
    ]
  }
  </script>
  {% endblock %}
</head>
<body>
  <a href="#main-content" style="position:absolute;left:-9999px;">Skip to content</a>
  <main id="main-content">
    {% block content %}{% endblock %}
  </main>
</body>
</html>
```

---

## 5. Serve `/llms.txt` and `/llms-full.txt`
In Flask or Django, serve these static files from your `/static` or root route handler so that AI crawlers can fetch `https://yourdomain.com/llms.txt`.
