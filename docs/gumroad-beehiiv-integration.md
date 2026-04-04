# Gumroad + Beehiiv Integration Guide

## Overview

The AI Marketing Stack brand is integrated across:
- **Website**: marketingstackai.com (AI Tools Directory)
- **Gumroad Store**: dallasc.gumroad.com (Products & Templates)  
- **Beehiiv Newsletter**: "The AI Marketing Stack" (Weekly insights)

This document explains how these three components work together to create a unified customer journey.

## Components Built

### 1. Dedicated Store Page (`/store`)
- **Location**: `src/pages/store.astro`
- **Purpose**: Showcase both free and paid resources
- **Features**: 
  - Product cards with enhanced CTAs
  - Newsletter signup integration
  - FAQ section
  - Value proposition messaging

### 2. Enhanced Gumroad Integration
- **Config**: `src/config/gumroad.ts` - Centralized store configuration
- **Component**: `src/components/GumroadButton.astro` - Smart product buttons
- **Features**: 
  - Automatic UTM tracking
  - Product ID-based URLs
  - Multiple button variants (primary, coral, amber, outline)
  - Overlay checkout enabled

### 3. Beehiiv Configuration
- **Config**: `src/config/beehiiv.ts` - Newsletter settings
- **Publication**: "The AI Marketing Stack" (`pub_2b74f984-deaa-4e23-899c-cab1936fb1e7`)
- **Features**: 
  - Automatic subscriber segmentation
  - UTM tracking for attribution
  - Welcome email sequence

### 4. Integrated Landing Component
- **Component**: `src/components/GumroadBeehiivIntegration.astro`
- **Purpose**: Connect newsletter signup with product promotion
- **Variants**: Home page, store page, compact
- **Strategy**: Free → Email → Paid funnel

## Customer Journey Flow

```
1. Discover Tools (Browse/Categories)
   ↓
2. Get Free Cheat Sheet (Gumroad → Email Collection)
   ↓  
3. Newsletter Signup (Beehiiv → Weekly Insights)
   ↓
4. Premium Template Purchase (UTM Builder → $19)
   ↓
5. Advanced Resources (Future products)
```

## Technical Implementation

### Gumroad Products

**Free Lead Magnet:**
- Product: AI Tools Cheat Sheet  
- Price: Free (name your price)
- URL: `dallasc.gumroad.com/l/ai-tools-cheatsheet`
- Purpose: Email collection + value demonstration

**Paid Template:**
- Product: UTM Builder & Campaign Naming Convention
- Price: $19
- URL: `dallasc.gumroad.com/l/utm-builder`  
- Purpose: Revenue + customer qualification

### Newsletter Integration

**Publication Details:**
- Name: "The AI Marketing Stack"
- ID: `pub_2b74f984-deaa-4e23-899c-cab1936fb1e7`
- Frequency: Weekly
- Content: Tool reviews, templates, marketing insights

**Subscriber Segmentation:**
- `general_audience` - Regular newsletter subscribers
- `gumroad_purchasers` - Anyone who bought a product
- `utm_template_buyers` - UTM template customers specifically  
- `cheatsheet_subscribers` - Free cheat sheet downloads
- `store_newsletter_signups` - Store page signups

### UTM Tracking Strategy

**Default Parameters:**
- `utm_source`: `ai_marketing_stack`
- `utm_medium`: `website`  
- `utm_campaign`: Varies by context

**Campaign Examples:**
- `homepage_cheatsheet_download`
- `store_utm_purchase`
- `newsletter_signup_homepage`
- `integrated_cta_bottom`

## Pages Updated

1. **Home Page** (`src/pages/index.astro`)
   - Replaced basic newsletter section with integrated component
   - Enhanced product CTAs with tracking
   - Added store navigation link

2. **Store Page** (`src/pages/store.astro`) [NEW]
   - Dedicated product showcase
   - Newsletter integration
   - FAQ section
   - Value propositions

3. **Navigation** (`src/layouts/Layout.astro`)
   - Added "Store" link to main navigation
   - Gumroad overlay JS included globally

## Configuration Files

**Gumroad Config** (`src/config/gumroad.ts`):
```typescript
export const GUMROAD_CONFIG = {
  username: "dallasc",
  storeUrl: "https://dallasc.gumroad.com",
  products: {
    cheatsheet: { /* free lead magnet */ },
    utmBuilder: { /* $19 template */ }
  }
}
```

**Beehiiv Config** (`src/config/beehiiv.ts`):
```typescript  
export const BEEHIIV_CONFIG = {
  publicationId: "pub_2b74f984-deaa-4e23-899c-cab1936fb1e7",
  publicationName: "The AI Marketing Stack",
  segments: { /* subscriber categories */ }
}
```

## Environment Variables

Required in `.env`:
```env
# Beehiiv
BEEHIIV_API_KEY=bh_xxxxxxxxxxxxxxxx
BEEHIIV_PUBLICATION_ID=pub_2b74f984-deaa-4e23-899c-cab1936fb1e7

# Gumroad  
GUMROAD_USERNAME=dallasc
GUMROAD_STORE_URL=https://dallasc.gumroad.com
GUMROAD_PRODUCT_CHEATSHEET=ai-tools-cheatsheet
GUMROAD_PRODUCT_UTM_BUILDER=utm-builder
```

## Next Steps

1. **Manual Gumroad Setup**: Follow `docs/gumroad-setup-guide.md`
2. **Beehiiv Welcome Series**: Set up automated email sequence
3. **Analytics**: Connect Google Analytics to track funnel conversion
4. **A/B Testing**: Test different CTA copy and positioning
5. **Product Expansion**: Add more templates based on customer feedback

## Success Metrics

**Newsletter Growth:**
- Weekly signup rate from website
- Conversion rate: free download → newsletter subscriber
- Newsletter open/click rates

**Revenue Tracking:**  
- Free → Paid conversion rate
- Average order value
- Customer lifetime value

**Attribution:**
- UTM parameter tracking in GA4
- Gumroad referral analytics
- Beehiiv subscriber source tracking

---

## Files Created/Modified

**New Files:**
- `src/pages/store.astro` - Dedicated store page
- `src/config/gumroad.ts` - Gumroad configuration
- `src/config/beehiiv.ts` - Newsletter configuration  
- `src/components/GumroadBeehiivIntegration.astro` - Integrated landing component
- `docs/gumroad-beehiiv-integration.md` - This documentation

**Modified Files:**
- `src/components/GumroadButton.astro` - Enhanced with config system
- `src/pages/index.astro` - Integrated CTAs and store links
- `src/layouts/Layout.astro` - Added store navigation
- `api/subscribe.js` - Updated with correct publication ID
- `.env.example` - Added new environment variables