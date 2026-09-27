import { SITE_CONFIG } from "../config/site-config.example";
import { SITE_URL, SITE_NAME, absoluteUrl } from "./site";
import { ENTITY_ID, getPrimaryEntityNode } from "./entity";

/**
 * ============================================================================
 * MODULAR JSON-LD SCHEMA BUILDERS (Schema.org / Google Rich Results)
 * ============================================================================
 *
 * Rich results (FAQ accordions, breadcrumbs, sitelinks searchboxes, author
 * cards, software specs) significantly increase Click-Through Rate (CTR).
 * Higher CTR signals to Google that your result is the best answer,
 * which can improve visibility and click-through rates.
 */

/**
 * 1. WebSite Schema (Homepage)
 * Enables Google Sitelinks and Brand Association.
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: SITE_NAME,
    alternateName: SITE_CONFIG.shortName,
    description: SITE_CONFIG.siteDescription,
    publisher: { "@id": ENTITY_ID },
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * 2. ProfilePage Schema (About / Author / Founder page)
 * High-signal identity anchoring for Google's E-E-A-T system.
 */
export function getProfilePageSchema(path: string = "/about") {
  const pageUrl = absoluteUrl(path);
  return {
    "@type": "ProfilePage",
    "@id": `${pageUrl}#profilepage`,
    url: pageUrl,
    name: `${SITE_CONFIG.entity.name} — Profile & Background`,
    isPartOf: { "@id": `${SITE_URL}#website` },
    primaryImageOfPage: absoluteUrl(SITE_CONFIG.ogImage.url),
    dateModified: new Date().toISOString().slice(0, 10),
    mainEntity: { "@id": ENTITY_ID },
  };
}

/**
 * 3. FAQPage Schema
 * Powers Google FAQ Rich Results in SERPs.
 * @param faqs Array of question/answer objects
 */
export interface FAQItem {
  question: string;
  answer: string;
}

export function getFAQSchema(faqs: FAQItem[], pagePath: string = "/faq") {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: absoluteUrl(pagePath),
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * 4. BreadcrumbList Schema
 * Formats your search result URL into clean breadcrumb trails:
 * e.g., yoursite.com > Work > Aegis Bot instead of messy URL strings.
 */
export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/**
 * 5. Speakable Specification
 * Informs Google Assistant, voice search, and AI tools which sections
 * of the page contain concise, spoken answers.
 */
export function getSpeakableSchema(cssSelectors: string[] = ["h1", ".lead", ".about-summary"]) {
  return {
    "@type": "SpeakableSpecification",
    cssSelector: cssSelectors,
  };
}

/**
 * 6. SoftwareApplication / CreativeWork Schema
 * Perfect for open-source repositories, SaaS tools, apps, and portfolios.
 */
export interface SoftwareProject {
  name: string;
  description: string;
  applicationCategory?: string;
  operatingSystem?: string;
  codeRepository?: string;
  url?: string;
  programmingLanguage?: string[];
}

export function getSoftwareApplicationSchema(project: SoftwareProject) {
  return {
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.description,
    applicationCategory: project.applicationCategory || "DeveloperApplication",
    operatingSystem: project.operatingSystem || "Cross-platform",
    url: project.url ? absoluteUrl(project.url) : SITE_URL,
    codeRepository: project.codeRepository,
    author: { "@id": ENTITY_ID },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

/**
 * 7. Unified Graph Builder Helper
 * Packages multiple schemas into a clean, interconnected JSON-LD `@graph`.
 */
export function buildJsonLdGraph(nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      getPrimaryEntityNode(),
      ...nodes,
    ],
  };
}
