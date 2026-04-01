# Monetization & Newsletter — Quick Start

> **Goal:** Get Gumroad + Beehiiv live in ~15 minutes of manual work.  
> All code and components are already in place. You just need to create accounts and plug in credentials.

## Step 1: Gumroad (~8 min)

1. **Create account** → [gumroad.com](https://gumroad.com) → Start selling
2. **Set up profile** → Claim URL `aitoolsdir`, add bio & logo
3. **Connect Stripe** → Settings → Payments → follow prompts
4. **Create free product:**
   - Upload `lead-magnets/marketing-ai-cheat-sheet.pdf`
   - Price: $0+ (Name Your Price)
   - ✅ Enable "Collect email addresses"
   - Publish it
5. **Copy your product short code** from the product URL (the part after `/l/`)

→ Full details: [docs/gumroad-setup-guide.md](./gumroad-setup-guide.md)

## Step 2: Beehiiv (~7 min)

1. **Create account** → [beehiiv.com](https://www.beehiiv.com) → Start for free (Launch plan)
2. **Configure publication** → Name, description, logo, primary color `#2DD4BF`
3. **Create welcome automation** → Automations → New → trigger: New subscriber → send welcome email (template in setup guide)
4. **Create embedded form** → Grow → Forms → Embedded → copy the embed URL
5. **Generate API key** → Settings → API (optional, for custom form)

→ Full details: [docs/beehiiv-setup-guide.md](./beehiiv-setup-guide.md)

## Step 3: Connect to Site (~2 min)

1. Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   cp .env.example .env
   ```
2. Update component props where you use them:
   - `<GumroadOverlay productCode="YOUR_CODE" />` 
   - `<NewsletterSignup embedUrl="YOUR_BEEHIIV_EMBED_URL" />`
3. Test locally: `npm run dev`

## Components Available

| Component | File | Purpose |
|-----------|------|---------|
| `GumroadButton` | `src/components/GumroadButton.astro` | Simple buy/download link button |
| `GumroadOverlay` | `src/components/GumroadOverlay.astro` | In-page overlay checkout (stays on site) |
| `NewsletterSignup` | `src/components/NewsletterSignup.astro` | Email signup (iframe or custom form) |
| `LeadMagnetCTA` | `src/components/LeadMagnetCTA.astro` | Combined download + features hero section |

## Step 4: Connect Gumroad → Beehiiv (Week 2)

Use Zapier (free tier works):
- **Trigger:** New Gumroad Sale
- **Action:** Create Beehiiv Subscription (with tag `gumroad_customer`)

This auto-adds every Gumroad customer to your newsletter.

---

**After setup, the flow is:**
1. Visitor lands on site → sees cheat sheet CTA
2. Clicks download → Gumroad overlay collects email + delivers PDF
3. Email gets added to Beehiiv (via Zapier) → welcome email fires
4. Subscriber gets weekly newsletter → drives repeat visits → more downloads
