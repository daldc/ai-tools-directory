# Beehiiv Newsletter Setup Guide — AI Tools Directory

## Publication Details

- **Publication Name:** The AI Marketing Stack
- **Tagline:** Honest reviews & hidden gems for marketers navigating the AI tool explosion
- **URL slug:** `theaimarketingstack` → theaimarketingstack.beehiiv.com
- **Sender name:** Dallas @ The AI Marketing Stack
- **Reply-to:** dallas@theaimarketingstack.com (or configure custom domain later)

## Branding

### Colors
- **Primary:** `#6C3CE1` (vibrant purple — stands out from the typical blue/green SaaS look)
- **Secondary:** `#1A1A2E` (dark navy, near-black for text/headers)
- **Accent:** `#00D4AA` (teal-green for CTAs and highlights)
- **Background:** `#FAFAFA` (off-white)
- **Rating stars/badges:** `#FFB800` (gold)

### Typography
- **Headers:** Inter Bold (clean, modern, professional)
- **Body:** Inter Regular, 16px line-height 1.6
- **Monospace (for tool names inline):** JetBrains Mono or similar

### Logo Direction
- Text-based logo: "The AI Marketing Stack" with a small layered-squares icon (representing a "stack")
- Keep it simple — black on white, reversible to white on dark
- Canva or Figma template to create

### Email Header
- Full-width banner, dark navy (`#1A1A2E`) background
- Logo in white/teal
- Below banner: one-line tagline in lighter gray

## Beehiiv Configuration Steps

### 1. Create Account
1. Go to [beehiiv.com](https://beehiiv.com) and sign up (free tier — up to 2,500 subscribers)
2. Publication name: **The AI Marketing Stack**
3. Choose subdomain: `theaimarketingstack`

### 2. Settings → Publication
- **Name:** The AI Marketing Stack
- **Description:** Weekly newsletter covering the best AI tools for marketers — honest reviews, hidden gems, and practical recommendations from someone who actually uses them.
- **Website URL:** (link to AI Tools Directory site once live)
- **Social links:** Twitter/X, LinkedIn (Dallas's profiles)

### 3. Settings → Design
- Upload logo (text-based, see above)
- Set brand colors (Primary: #6C3CE1, Accent: #00D4AA)
- Email template: choose "Classic" layout, customize with brand colors
- Footer: include unsubscribe + "Curated by a marketing analytics professional, not a bot farm"

### 4. Settings → Domain (Phase 2)
- Custom domain: `newsletter.aimarketingstack.com` (after domain purchase)
- Add CNAME records per Beehiiv instructions

### 5. Growth → Recommendations
- Enable Beehiiv Recommendations Network
- Add complementary newsletters (MarTech, AI-focused newsletters)

### 6. Monetization (Phase 2)
- Enable Beehiiv Ad Network once at 1,000+ subscribers
- Set up Boost (get paid when other newsletters recommend you)

## Signup Form / Embed Code

### Simple Embed (for directory site)
```html
<div id="newsletter-signup" style="max-width: 480px; margin: 0 auto; padding: 24px;">
  <h3 style="font-family: Inter, sans-serif; color: #1A1A2E; margin-bottom: 8px;">
    🔍 Get the best AI marketing tools in your inbox
  </h3>
  <p style="font-family: Inter, sans-serif; color: #666; font-size: 14px; margin-bottom: 16px;">
    Weekly reviews, hidden gems, and honest takes. No hype, no spam.
  </p>
  <iframe 
    src="https://embeds.beehiiv.com/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" 
    data-test-id="beehiiv-embed" 
    width="100%" 
    height="52" 
    frameborder="0" 
    scrolling="no" 
    style="border-radius: 8px; margin: 0; background-color: transparent;">
  </iframe>
</div>
```
> **Note:** Replace the iframe `src` with the actual embed URL from Beehiiv → Growth → Forms after account creation.

### Alternative: Custom Form (POST to Beehiiv API)
```html
<form action="https://api.beehiiv.com/v2/publications/YOUR_PUB_ID/subscriptions" method="POST">
  <input type="email" name="email" placeholder="you@company.com" required 
    style="padding: 12px 16px; border: 2px solid #E0E0E0; border-radius: 8px; font-size: 16px; width: 260px;" />
  <button type="submit" 
    style="padding: 12px 24px; background: #6C3CE1; color: white; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; margin-left: 8px;">
    Subscribe
  </button>
</form>
```

### Placement on Directory Site
1. **Hero section** — primary CTA above the fold
2. **After every 10 tools** in the directory listing — inline signup
3. **Exit intent popup** — Beehiiv has this built-in, enable in Growth settings
4. **Footer** — persistent signup form
5. **Individual tool review pages** — "Get tools like this in your inbox weekly"

## Cadence & Schedule

- **Frequency:** Weekly
- **Send day:** Tuesday, 9:00 AM ET (good engagement for B2B/marketing audience)
- **Beehiiv setting:** Schedule → set default send time

## Segments to Create

1. **All subscribers** (default)
2. **Engaged** — opened 3+ of last 5 emails
3. **Marketing leaders** — self-tagged on signup (add custom field)
4. **Tool category interest** — tag by which tool pages they clicked from

## Gumroad Email Sync (Phase 2)

- Use Zapier: "New Gumroad Sale" → "Add Subscriber to Beehiiv"
- Tag with `customer` and product name
- Separate segment for buyers vs. free subscribers
