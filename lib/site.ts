import { SITE_CONFIG } from "../config/site-config.example";

/**
 * ============================================================================
 * SINGLE SOURCE OF TRUTH: CANONICAL ORIGIN & HOST UTILITIES
 * ============================================================================
 *
 * Why this matters for rankings:
 * Search engines consolidate duplicate content. If some of your pages use
 * "https://yoursite.com" and others use "https://yoursite.com/" or
 * "http://yoursite.com", Google may split ranking signals across multiple URLs!
 *
 * By importing these constants everywhere (layout, sitemap, robots, JSON-LD,
 * canonical links), your site NEVER suffers from canonical drift.
 */

/** Master canonical URL ensuring trailing slash consistency */
export const SITE_URL: string = SITE_CONFIG.siteUrl.endsWith("/")
  ? SITE_CONFIG.siteUrl
  : `${SITE_CONFIG.siteUrl}/`;

/** Clean bare hostname (e.g. "yourdomain.com") for robots.txt and sitemaps */
export const SITE_HOST: string = SITE_URL.replace(/^https?:\/\//, "").replace(
  /\/$/,
  ""
);

/** Google Search Result Site Name (concise, unique) */
export const SITE_NAME: string = SITE_CONFIG.siteName;

/**
 * Helper: Builds an absolute canonical URL safely without double slashes.
 * @param path Relative path, e.g. "/about" or "work"
 * @returns Absolute URL, e.g. "https://yourdomain.com/about"
 */
export function absoluteUrl(path: string = ""): string {
  if (!path || path === "/") return SITE_URL;
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${SITE_URL}${cleanPath}`;
}
