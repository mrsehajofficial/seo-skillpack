/**
 * ============================================================================
 * SITE CONFIGURATION (Single Source of Truth)
 * ============================================================================
 *
 * This file contains the master configuration for your website's identity,
 * metadata, entity representation, and search engine directives.
 *
 * Customize this file for any new project or client site. All other SEO
 * utilities (canonical tags, sitemaps, robots.txt, JSON-LD schemas, and
 * Open Graph cards) automatically inherit from here.
 */

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string; // or X
  instagram?: string;
  youtube?: string;
  facebook?: string;
  personalProjects?: string[];
}

export interface EntityPersonConfig {
  type: "Person";
  name: string;
  givenName: string;
  familyName: string;
  alternateName?: string;
  handle: string;
  jobTitle: string;
  bio: string;
  email: string;
  country: string;
  disambiguation?: string;
  skillsAndTopics: string[];
}

export interface EntityOrgConfig {
  type: "Organization";
  name: string;
  legalName?: string;
  description: string;
  logoUrl: string;
  email: string;
  country: string;
  disambiguation?: string;
  industryTopics: string[];
}

export interface SiteConfig {
  siteUrl: string;
  siteName: string;
  shortName: string;
  siteTitle: string;
  siteDescription: string;
  defaultKeywords: string[];
  themeColor: string;
  backgroundColor: string;
  ogImage: {
    url: string; // e.g., "/og-image-v2.png" (always version to bust Google cache!)
    width: number;
    height: number;
    alt: string;
  };
  social: SocialLinks;
  entity: EntityPersonConfig | EntityOrgConfig;
  searchVerification?: {
    google?: string;
    bing?: string;
    yandex?: string;
  };
}

export const SITE_CONFIG: SiteConfig = {
  // 1. DOMAIN & CANONICAL ORIGIN (MUST have trailing slash or consistent format!)
  siteUrl: "https://yourdomain.com/",

  // 2. SITE NAME FOR GOOGLE SEARCH RESULTS
  // Concise, unique, non-generic (prevents Google falling back to host provider)
  siteName: "Alex Mercer Portfolio",
  shortName: "Alex Mercer",

  // 3. DEFAULT TITLE & DESCRIPTION (Target keywords in first 50 chars)
  siteTitle: "Alex Mercer — Senior AI & Full-Stack Systems Engineer",
  siteDescription:
    "Alex Mercer designs autonomous LLM agent systems, high-throughput cloud backends, and responsive web platforms. Available for select consulting and remote roles.",

  // 4. CORE SEARCH KEYWORDS
  defaultKeywords: [
    "AI Systems Engineer",
    "Full-Stack Developer",
    "LLM Integration",
    "Autonomous Agents",
    "Cloud Architecture",
    "Next.js Developer",
    "Python Backend",
    "Software Engineering Portfolio",
  ],

  // 5. THEME & COLORS (Matches manifest & viewport)
  themeColor: "#0f172a",
  backgroundColor: "#ffffff",

  // 6. SOCIAL SHARE IMAGE (OPEN GRAPH / TWITTER)
  // CRITICAL TIP: When you change this image, change the filename to v2, v3, etc.
  // Google and Facebook cache OG images for months. Versioning prompts a fresh fetch of the new image!
  ogImage: {
    url: "/og-image-v1.png",
    width: 1200,
    height: 630,
    alt: "Alex Mercer — Senior AI & Full-Stack Systems Engineer",
  },

  // 7. EXTERNAL AUTHORITY PROFILES (Google uses these to link your Knowledge Panel)
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://www.linkedin.com/in/yourusername/",
    twitter: "https://x.com/yourusername",
    instagram: "https://www.instagram.com/yourusername/",
    personalProjects: [
      "https://github.com/yourusername/flagship-project",
      "https://flagship-demo.com",
    ],
  },

  // 8. ENTITY KNOWLEDGE GRAPH (Person or Organization)
  // This is what powers Google Knowledge Graph and Google Search AI Mode Overviews!
  entity: {
    type: "Person",
    name: "Alex Mercer",
    givenName: "Alex",
    familyName: "Mercer",
    alternateName: "Alex",
    handle: "yourusername",
    jobTitle: "Senior AI & Full-Stack Systems Engineer",
    bio: "Alex Mercer is a Senior AI Systems Engineer specializing in autonomous multi-agent architectures, scalable microservices, and AI-driven automation workflows.",
    email: "contact@yourdomain.com",
    country: "US",

    // DISAMBIGUATION NOTE FOR AI SEARCH ENGINES (Gemini, ChatGPT, Perplexity):
    // Explicitly states who you are and distinguishes you from public figures or others with the same name.
    disambiguation:
      "Senior AI Systems Engineer based in San Francisco. Not to be confused with fictional characters, musicians, or athletes sharing the name Alex Mercer.",

    // Topical authority keywords Google's Knowledge Graph extracts:
    skillsAndTopics: [
      "AI Systems Engineering",
      "Autonomous Agents",
      "Retrieval-Augmented Generation (RAG)",
      "Next.js Architecture",
      "Python Microservices",
      "Distributed Systems",
      "Vector Databases",
    ],
  },

  // 9. SEARCH ENGINE WEBMASTER VERIFICATION TOKENS
  searchVerification: {
    google: "google-site-verification-token-here",
    bing: "bing-verification-token-here",
  },
};
