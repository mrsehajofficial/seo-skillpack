import { SITE_CONFIG } from "../config/site-config.example";
import { SITE_URL, absoluteUrl } from "./site";

/**
 * ============================================================================
 * ENTITY KNOWLEDGE GRAPH (The Foundation for Entity Clarity & AI Overviews)
 * ============================================================================
 *
 * Why this is crucial for ranking:
 * Modern search engines (Google RankBrain, MUM, and Google AI Overviews) are
 * entity-first engines. They don't just index keywords; they construct a
 * knowledge graph of real-world Entities (People, Organizations, Brands).
 *
 * Search engines unify documents into ONE identity by matching `@id` values:
 * 1. Every page MUST reference `${SITE_URL}#entity` — never create multiple
 *    conflicting Person or Organization identities.
 * 2. `sameAs` connects your website to your verified external authority profiles
 *    (GitHub, LinkedIn, Twitter/X, Crunchbase, Wikipedia).
 * 3. `disambiguatingDescription` instructs LLM crawlers (Gemini, ChatGPT Search,
 *    Perplexity) to differentiate you from others with similar names.
 */

// Unique URI representing the primary entity across the entire website
export const ENTITY_ID = `${SITE_URL}#main-entity`;

// Array of all external authority links
export const SAME_AS_LINKS: string[] = [
  SITE_CONFIG.social.github,
  SITE_CONFIG.social.linkedin,
  SITE_CONFIG.social.twitter,
  SITE_CONFIG.social.instagram,
  SITE_CONFIG.social.youtube,
  SITE_CONFIG.social.facebook,
  ...(SITE_CONFIG.social.personalProjects || []),
].filter(Boolean) as string[];

/**
 * Returns the primary Schema.org Entity Node (Person or Organization).
 * Spread this into any page's JSON-LD `@graph`.
 */
export function getPrimaryEntityNode(overrides: Record<string, unknown> = {}) {
  const { entity, ogImage } = SITE_CONFIG;

  if (entity.type === "Person") {
    return {
      "@type": "Person",
      "@id": ENTITY_ID,
      name: entity.name,
      givenName: entity.givenName,
      familyName: entity.familyName,
      alternateName: entity.alternateName || entity.givenName,
      identifier: entity.handle,
      url: SITE_URL,
      image: absoluteUrl(ogImage.url),
      jobTitle: entity.jobTitle,
      email: `mailto:${entity.email}`,
      description: entity.bio,
      disambiguatingDescription: entity.disambiguation,
      address: {
        "@type": "PostalAddress",
        addressCountry: entity.country,
      },
      sameAs: SAME_AS_LINKS,
      knowsAbout: entity.skillsAndTopics,
      ...overrides,
    };
  }

  // Organization Entity
  return {
    "@type": "Organization",
    "@id": ENTITY_ID,
    name: entity.name,
    legalName: entity.legalName || entity.name,
    url: SITE_URL,
    logo: absoluteUrl(entity.logoUrl || ogImage.url),
    image: absoluteUrl(ogImage.url),
    email: `mailto:${entity.email}`,
    description: entity.description,
    disambiguatingDescription: entity.disambiguation,
    address: {
      "@type": "PostalAddress",
      addressCountry: entity.country,
    },
    sameAs: SAME_AS_LINKS,
    knowsAbout: entity.industryTopics,
    ...overrides,
  };
}
