import type { Metadata } from "next";
import { SITE_CONFIG } from "../config/site-config.example";
import { SITE_URL, SITE_NAME, absoluteUrl } from "./site";

/**
 * ============================================================================
 * BULLETPROOF NEXT.JS METADATA GENERATOR
 * ============================================================================
 *
 * Generates standards-compliant, high-CTR metadata objects for Next.js App Router.
 * Ensures consistent canonical links, social preview cards, and Googlebot crawl rules.
 */

export interface PageMetadataOptions {
  title: string;
  description: string;
  path?: string; // Relative path, e.g. "/about" (defaults to homepage)
  ogImage?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  };
  keywords?: string[];
  noIndex?: boolean; // For private/staging pages
  type?: "website" | "article" | "profile";
}

/**
 * Helper to construct robust, high-ranking Next.js Metadata objects.
 */
export function buildPageMetadata(options: PageMetadataOptions): Metadata {
  const {
    title,
    description,
    path = "/",
    ogImage = SITE_CONFIG.ogImage,
    keywords = SITE_CONFIG.defaultKeywords,
    noIndex = false,
    type = "website",
  } = options;

  const canonicalUrl = absoluteUrl(path);
  const imageUrl = absoluteUrl(ogImage.url);
  const imageWidth = ogImage.width || 1200;
  const imageHeight = ogImage.height || 630;
  const imageAlt = ogImage.alt || `${title} banner`;

  // Full title formatted with site brand if not already present
  const formattedTitle = title.includes(SITE_CONFIG.shortName)
    ? title
    : `${title} — ${SITE_CONFIG.shortName}`;

  return {
    title: formattedTitle,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      type,
      locale: "en_US",
      url: canonicalUrl,
      siteName: SITE_NAME,
      title: formattedTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: imageWidth,
          height: imageHeight,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: formattedTitle,
      description,
      images: [imageUrl],
      creator: SITE_CONFIG.social.twitter
        ? `@${SITE_CONFIG.social.twitter.replace(/.*twitter\.com\/|.*x\.com\//, "")}`
        : undefined,
    },
  };
}
