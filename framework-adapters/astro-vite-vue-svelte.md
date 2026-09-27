# 🚀 Astro / Vite / Nuxt / SvelteKit Implementation Guide

This guide explains how to adapt the **High-Ranking SEO Template** into modern JavaScript & static site generators beyond Next.js.

---

## 1. Astro (`src/layouts/BaseLayout.astro`)

Astro produces zero-JS static HTML by default, making it exceptionally fast for Google Core Web Vitals.

```astro
---
// src/layouts/BaseLayout.astro
import siteConfig from '../../config/site-config.example.json';

interface Props {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogImage?: string;
}

const {
  title = siteConfig.siteTitle,
  description = siteConfig.siteDescription,
  canonicalPath = '',
  ogImage = siteConfig.ogImage.url,
} = Astro.props;

const canonicalUrl = new URL(canonicalPath, siteConfig.siteUrl).toString();
const fullOgImageUrl = new URL(ogImage, siteConfig.siteUrl).toString();

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteConfig.siteUrl}#website`,
      "url": siteConfig.siteUrl,
      "name": siteConfig.siteName
    },
    {
      "@type": "Person",
      "@id": `${siteConfig.siteUrl}#main-entity`,
      "name": siteConfig.entity.name,
      "jobTitle": siteConfig.entity.jobTitle,
      "disambiguatingDescription": siteConfig.entity.disambiguation,
      "sameAs": Object.values(siteConfig.social).filter(Boolean)
    }
  ]
};
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalUrl} />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={siteConfig.siteName} />
    <meta property="og:url" content={canonicalUrl} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={fullOgImageUrl} />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={fullOgImageUrl} />

    <!-- Structured Data -->
    <script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />
  </head>
  <body>
    <slot />
  </body>
</html>
```

---

## 2. Nuxt 3 (Vue) (`app.vue` or `layouts/default.vue`)

In Nuxt 3, utilize `useSeoMeta()` and `useHead()`:

```vue
<script setup lang="ts">
import siteConfig from '~/config/site-config.example.json';

const route = useRoute();
const canonicalUrl = `${siteConfig.siteUrl}${route.path.replace(/^\//, '')}`;

useSeoMeta({
  title: siteConfig.siteTitle,
  description: siteConfig.siteDescription,
  ogTitle: siteConfig.siteTitle,
  ogDescription: siteConfig.siteDescription,
  ogImage: `${siteConfig.siteUrl}og-image-v1.png`,
  twitterCard: 'summary_large_image',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
});

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': `${siteConfig.siteUrl}#website`,
            url: siteConfig.siteUrl,
            name: siteConfig.siteName,
          },
          {
            '@type': 'Person',
            '@id': `${siteConfig.siteUrl}#main-entity`,
            name: siteConfig.entity.name,
            disambiguatingDescription: siteConfig.entity.disambiguation,
          },
        ],
      }),
    },
  ],
});
</script>
```

---

## 3. SvelteKit (`src/routes/+layout.svelte`)

In SvelteKit, leverage `<svelte:head>`:

```svelte
<script lang="ts">
  import siteConfig from '$lib/site-config.example.json';
  import { page } from '$app/stores';

  $: canonical = `${siteConfig.siteUrl}${$page.url.pathname.replace(/^\//, '')}`;
</script>

<svelte:head>
  <title>{siteConfig.siteTitle}</title>
  <meta name="description" content={siteConfig.siteDescription} />
  <link rel="canonical" href={canonical} />
  <meta property="og:title" content={siteConfig.siteTitle} />
  <meta property="og:image" content="{siteConfig.siteUrl}og-image-v1.png" />
  <meta name="twitter:card" content="summary_large_image" />

  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "url": "https://yourdomain.com/",
          "name": "Alex Mercer Portfolio"
        }
      ]
    }
  </script>
</svelte:head>

<slot />
```

---

## 4. Vite (Vanilla / React SPA / Vue SPA)

For Single Page Applications built with plain Vite, search bots crawling the raw HTML need to see the tags before JS hydration:
1. Place the full tags directly in your root `index.html` (refer to `static-html-templates/index.html.template`).
2. For multiple routes, consider using a static site generation (SSG) plugin such as `vite-plugin-ssr` or `vite-plugin-prerender` so that crawlers receive pre-rendered HTML on `/about`, `/work`, and `/faq`.
