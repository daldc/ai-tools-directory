/**
 * Gumroad Store Configuration
 * Centralized config for The AI Marketing Stack store
 */

export const GUMROAD_CONFIG = {
  // Store Details
  username: "dallasc",
  storeUrl: "https://dallasc.gumroad.com",
  storeName: "The AI Marketing Stack",
  
  // Products
  products: {
    cheatsheet: {
      id: "ai-tools-cheatsheet",
      name: "Marketing AI Tools Cheat Sheet",
      price: "Free",
      url: "https://dallasc.gumroad.com/l/ai-tools-cheatsheet",
      overlayUrl: "https://gumroad.com/l/ai-tools-cheatsheet",
      description: "50+ AI tools ranked & reviewed for marketing professionals",
      type: "lead-magnet" as const,
    },
    
    utmBuilder: {
      id: "utm-builder",
      name: "UTM Builder & Campaign Naming Convention Template",
      price: "$19",
      url: "https://dallasc.gumroad.com/l/utm-builder",
      overlayUrl: "https://gumroad.com/l/utm-builder",
      description: "Professional Google Sheets template with auto-generating UTM URLs and GA4 alignment",
      type: "template" as const,
    }
  },
  
  // Branding
  branding: {
    primaryColor: "#14B8A6", // brand-teal
    secondaryColor: "#F59E0B", // brand-amber
    accentColor: "#EF4444", // brand-coral
    backgroundColor: "#0A0A0A", // surface-950
  },
  
  // Analytics & Tracking
  tracking: {
    utmSource: "ai_marketing_stack",
    utmMedium: "website",
    defaultCampaign: "gumroad_store",
  },
  
  // Features
  features: {
    overlayCheckout: true,
    collectEmails: true,
    customReceipts: true,
    affiliateProgram: true,
  }
} as const;

/**
 * Generate tracking URLs for Gumroad products
 */
export function getGumroadUrl(
  productId: keyof typeof GUMROAD_CONFIG.products,
  options: {
    utm_campaign?: string;
    utm_content?: string;
    overlay?: boolean;
  } = {}
): string {
  const product = GUMROAD_CONFIG.products[productId];
  if (!product) {
    throw new Error(`Product not found: ${productId}`);
  }
  
  const baseUrl = options.overlay ? product.overlayUrl : product.url;
  const params = new URLSearchParams();
  
  // Add UTM parameters
  params.set("utm_source", GUMROAD_CONFIG.tracking.utmSource);
  params.set("utm_medium", GUMROAD_CONFIG.tracking.utmMedium);
  params.set("utm_campaign", options.utm_campaign || GUMROAD_CONFIG.tracking.defaultCampaign);
  
  if (options.utm_content) {
    params.set("utm_content", options.utm_content);
  }
  
  return `${baseUrl}?${params.toString()}`;
}

/**
 * Gumroad product metadata helper
 */
export function getProductInfo(productId: keyof typeof GUMROAD_CONFIG.products) {
  return GUMROAD_CONFIG.products[productId];
}

/**
 * Check if Gumroad overlay is enabled
 */
export function isOverlayEnabled(): boolean {
  return GUMROAD_CONFIG.features.overlayCheckout;
}