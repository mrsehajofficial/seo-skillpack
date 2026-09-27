# 🐘 PHP / WordPress / Apache / Nginx Implementation Guide

This guide details how to implement the High-Ranking SEO architecture on traditional PHP sites, WordPress themes, Apache servers, and Nginx.

---

## 1. Vanilla PHP Header Helper (`seo-head.php`)

```php
<?php
// Load universal configuration
$configJson = file_get_contents(__DIR__ . '/config/site-config.example.json');
$site = json_decode($configJson, true);

$pageTitle = $pageTitle ?? $site['siteTitle'];
$pageDescription = $pageDescription ?? $site['siteDescription'];
$pageCanonical = $pageCanonical ?? $site['siteUrl'];
$pageOgImage = $site['siteUrl'] . ltrim($site['ogImage']['url'], '/');
?>
<!-- Primary Metadata -->
<title><?= htmlspecialchars($pageTitle) ?></title>
<meta name="description" content="<?= htmlspecialchars($pageDescription) ?>">
<link rel="canonical" href="<?= htmlspecialchars($pageCanonical) ?>">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="<?= htmlspecialchars($site['siteName']) ?>">
<meta property="og:url" content="<?= htmlspecialchars($pageCanonical) ?>">
<meta property="og:title" content="<?= htmlspecialchars($pageTitle) ?>">
<meta property="og:description" content="<?= htmlspecialchars($pageDescription) ?>">
<meta property="og:image" content="<?= htmlspecialchars($pageOgImage) ?>">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="<?= htmlspecialchars($pageTitle) ?>">
<meta name="twitter:description" content="<?= htmlspecialchars($pageDescription) ?>">
<meta name="twitter:image" content="<?= htmlspecialchars($pageOgImage) ?>">

<!-- Favicons with Versioning (Busts Google Favicon Cache) -->
<link rel="icon" href="/favicon-v1.ico" sizes="any">
<link rel="apple-touch-icon" href="/apple-touch-icon-v1.png" sizes="180x180">
<link rel="manifest" href="/site.webmanifest">

<!-- JSON-LD Entity Graph -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "<?= $site['siteUrl'] ?>#website",
      "url": "<?= $site['siteUrl'] ?>",
      "name": "<?= addslashes($site['siteName']) ?>"
    },
    {
      "@type": "Person",
      "@id": "<?= $site['siteUrl'] ?>#main-entity",
      "name": "<?= addslashes($site['entity']['name']) ?>",
      "jobTitle": "<?= addslashes($site['entity']['jobTitle']) ?>",
      "disambiguatingDescription": "<?= addslashes($site['entity']['disambiguation']) ?>",
      "sameAs": <?= json_encode(array_values(array_filter($site['social']))) ?>
    }
  ]
}
</script>
```

---

## 2. WordPress Integration (`functions.php`)

Add this snippet to your WordPress active theme's `functions.php` to inject the unified Knowledge Graph:

```php
add_action('wp_head', function() {
    if (is_front_page()) {
        $schema = [
            '@context' => 'https://schema.org',
            '@graph' => [
                [
                    '@type' => 'WebSite',
                    '@id' => home_url('/#website'),
                    'url' => home_url('/'),
                    'name' => get_bloginfo('name'),
                    'publisher' => ['@id' => home_url('/#main-entity')]
                ],
                [
                    '@type' => 'Person',
                    '@id' => home_url('/#main-entity'),
                    'name' => 'Your Full Name',
                    'jobTitle' => 'Your Role',
                    'disambiguatingDescription' => 'Your clear disambiguation statement here',
                    'sameAs' => [
                        'https://github.com/yourusername',
                        'https://linkedin.com/in/yourusername'
                    ]
                ]
            ]
        ];
        echo '<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
    }
}, 1);
```

---

## 3. Apache `.htaccess` (Enforcing HTTPS & Canonical Non-WWW)

Add to your root `.htaccess` file:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On

  # 1. Force HTTPS
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  # 2. Force Non-WWW (Or WWW if preferred) to prevent canonical split
  RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
  RewriteRule ^(.*)$ https://%1/$1 [R=301,L]

  # 3. Allow clean access to /llms.txt and /llms-full.txt
  RewriteRule ^llms\.txt$ public/llms.txt [L]
  RewriteRule ^llms-full\.txt$ public/llms-full.txt [L]
</IfModule>
```

---

## 4. Nginx Server Block Configuration

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://yourdomain.com$request_uri;
}

server {
    listen 443 ssl http2;
    server_name www.yourdomain.com;
    return 301 https://yourdomain.com$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;
    root /var/www/yourdomain/public;

    # Serve llms.txt and llms-full.txt directly
    location = /llms.txt {
        try_files /llms.txt =404;
    }
    location = /llms-full.txt {
        try_files /llms-full.txt =404;
    }
}
```
