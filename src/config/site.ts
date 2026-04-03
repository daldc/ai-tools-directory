/**
 * Centralized site configuration.
 *
 * All references to the site URL should use SITE_URL from this module
 * instead of hardcoding Vercel preview or production URLs.
 *
 * Set the SITE_URL environment variable to override (e.g., for staging/preview).
 * Falls back to the canonical production URL defined in astro.config.mjs.
 */
export const SITE_URL =
  import.meta.env.SITE_URL ||
  import.meta.env.PUBLIC_SITE_URL ||
  "https://marketingstackai.com";

/** Browse page URL (for use in templates and emails) */
export const BROWSE_URL = `${SITE_URL}/browse`;
