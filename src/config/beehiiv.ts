/**
 * Beehiiv Newsletter Configuration  
 * The AI Marketing Stack newsletter settings
 */

export const BEEHIIV_CONFIG = {
  // Publication Details
  publicationId: "pub_2b74f984-deaa-4e23-899c-cab1936fb1e7",
  publicationName: "The AI Marketing Stack",
  
  // URLs & Embeds
  urls: {
    subscribe: "https://marketingstackai.beehiiv.com/subscribe",
    manage: "https://marketingstackai.beehiiv.com/",
    archive: "https://marketingstackai.beehiiv.com/archive",
    embed: "https://embeds.beehiiv.com/2b74f984-deaa-4e23-899c-cab1936fb1e7",
  },
  
  // Content & Branding
  branding: {
    tagline: "Weekly AI tool reviews and marketing insights",
    description: "Get weekly updates on the best new AI tools, exclusive templates, and marketing insights delivered to your inbox.",
    frequency: "Weekly",
    format: "HTML + Text",
  },
  
  // Segments & Tags
  segments: {
    general: "general_audience",
    gumroad_customers: "gumroad_purchasers", 
    utm_builder_buyers: "utm_template_buyers",
    cheatsheet_downloads: "cheatsheet_subscribers",
    store_signups: "store_newsletter_signups",
  },
  
  // UTM Tracking Defaults
  defaultTracking: {
    utm_source: "ai_tools_directory",
    utm_medium: "website", 
    utm_campaign: "newsletter_signup",
  },
  
  // API Configuration (for server-side)
  api: {
    endpoint: "https://api.beehiiv.com/v2",
    rateLimit: {
      requests: 100,
      windowMs: 60000, // 1 minute
    },
  },
  
  // Features
  features: {
    welcomeEmail: true,
    reactivateExisting: true,
    collectName: false, // Keep it simple - email only
    doubleOptIn: false, // Single opt-in for better UX
    referralProgram: false,
  }
} as const;

/**
 * Generate subscribe URL with tracking
 */
export function getSubscribeUrl(tracking: {
  utm_source?: string;
  utm_campaign?: string;
  utm_content?: string;
  [key: string]: string | undefined;
} = {}): string {
  const params = new URLSearchParams();
  
  // Set default tracking
  params.set("utm_source", tracking.utm_source || BEEHIIV_CONFIG.defaultTracking.utm_source);
  params.set("utm_medium", tracking.utm_medium || BEEHIIV_CONFIG.defaultTracking.utm_medium);
  params.set("utm_campaign", tracking.utm_campaign || BEEHIIV_CONFIG.defaultTracking.utm_campaign);
  
  // Add additional tracking parameters
  Object.entries(tracking).forEach(([key, value]) => {
    if (value && key !== "utm_source" && key !== "utm_medium" && key !== "utm_campaign") {
      params.set(key, value);
    }
  });
  
  return `${BEEHIIV_CONFIG.urls.subscribe}?${params.toString()}`;
}

/**
 * Generate embed URL for iframe
 */
export function getEmbedUrl(options: {
  style?: "default" | "minimal" | "custom";
  width?: number;
  height?: number;
} = {}): string {
  const params = new URLSearchParams();
  
  if (options.style && options.style !== "default") {
    params.set("style", options.style);
  }
  
  if (options.width) {
    params.set("width", options.width.toString());
  }
  
  if (options.height) {
    params.set("height", options.height.toString());
  }
  
  const queryString = params.toString();
  return queryString ? `${BEEHIIV_CONFIG.urls.embed}?${queryString}` : BEEHIIV_CONFIG.urls.embed;
}

/**
 * Newsletter subscription payload for API
 */
export interface SubscriptionPayload {
  email: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  reactivate_existing?: boolean;
  send_welcome_email?: boolean;
  custom_fields?: Record<string, any>;
}

/**
 * Create subscription payload with defaults
 */
export function createSubscriptionPayload(
  email: string,
  tracking: Partial<SubscriptionPayload> = {}
): SubscriptionPayload {
  return {
    email: email.trim().toLowerCase(),
    utm_source: tracking.utm_source || BEEHIIV_CONFIG.defaultTracking.utm_source,
    utm_medium: tracking.utm_medium || BEEHIIV_CONFIG.defaultTracking.utm_medium,
    utm_campaign: tracking.utm_campaign || BEEHIIV_CONFIG.defaultTracking.utm_campaign,
    reactivate_existing: tracking.reactivate_existing ?? BEEHIIV_CONFIG.features.reactivateExisting,
    send_welcome_email: tracking.send_welcome_email ?? BEEHIIV_CONFIG.features.welcomeEmail,
    ...tracking,
  };
}