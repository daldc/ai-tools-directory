/**
 * Gumroad store configuration.
 *
 * Centralizes product definitions, branding, and Beehiiv newsletter settings
 * so components and pages can reference them without hardcoding URLs.
 */

// ---------------------------------------------------------------------------
// Gumroad
// ---------------------------------------------------------------------------

export const GUMROAD_USERNAME = "dallasc";
export const GUMROAD_STORE_URL = `https://${GUMROAD_USERNAME}.gumroad.com`;

export interface Product {
  name: string;
  slug: string;
  /** Short code used in gumroad.com/l/<code> */
  code: string;
  description: string;
  price: string;
  format: string;
  badge: "free" | "paid";
  features: string[];
}

export const products: Product[] = [
  {
    name: "Marketing AI Tools Cheat Sheet",
    slug: "ai-tools-cheatsheet",
    code: "ai-tools-cheatsheet",
    description:
      "15 essential AI tools every marketer should know — with pricing, use cases, and honest recommendations across 6 categories.",
    price: "Free",
    format: "PDF Download",
    badge: "free",
    features: [
      "50+ tools reviewed",
      "11 categories",
      "Updated for 2026",
      "PDF download",
    ],
  },
  {
    name: "UTM Builder & Campaign Tracker",
    slug: "utm-builder",
    code: "utm-builder",
    description:
      "6-tab Excel template to build, organize, and track UTM parameters across every marketing channel. Includes bulk URL builder and naming conventions.",
    price: "From $10",
    format: "Excel Template",
    badge: "paid",
    features: [
      "6 organized tabs",
      "Bulk URL builder",
      "Naming conventions guide",
      "Works in Excel & Sheets",
    ],
  },
];

export function getProductUrl(code: string): string {
  return `${GUMROAD_STORE_URL}/l/${code}`;
}

// ---------------------------------------------------------------------------
// Beehiiv Newsletter
// ---------------------------------------------------------------------------

export const BEEHIIV_PUBLICATION_ID = "pub_2b74f984-deaa-4e23-899c-cab1936fb1e7";

/**
 * Beehiiv embed URL for iframe-based signup.
 * Replace with actual embed ID from Beehiiv → Publication → Settings → Embeds.
 */
export const BEEHIIV_EMBED_URL =
  "https://embeds.beehiiv.com/ceb3d171-75d0-43db-8060-7dde4f498498";

// ---------------------------------------------------------------------------
// Brand
// ---------------------------------------------------------------------------

export const STORE_BRAND = {
  name: "The AI Marketing Stack",
  tagline: "Tools, templates, and tactics for modern marketers",
  description:
    "Battle-tested resources built by a marketing analytics practitioner with 11+ years of experience.",
} as const;
