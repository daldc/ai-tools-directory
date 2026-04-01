# Gumroad Store Setup Guide

> **Time estimate:** ~15 minutes  
> **Prerequisites:** Email address, payment method  
> **Status:** Manual steps required (account creation needs human login)

## 1. Create Your Gumroad Account

1. Go to [gumroad.com](https://gumroad.com) and click **Start selling**
2. Sign up with your email (use the same email as your other AI Tools Directory accounts)
3. Verify your email address

## 2. Set Up Your Profile

1. Go to **Settings → Profile**
2. Fill in:
   - **Name:** AI Tools Directory (or "ToolsDir")
   - **Bio:** "Curated AI tool guides, cheat sheets, and resources for marketing professionals."
   - **Profile URL:** `gumroad.com/aitoolsdir` (or similar — claim this early)
   - **Profile picture:** Use the AI/teal gradient logo from the site
   - **Cover image:** 1280×720px banner with brand colors (teal/amber gradient, dark bg)

## 3. Connect Payment

1. Go to **Settings → Payments**
2. Connect your **Stripe account** (Gumroad uses Stripe for processing)
   - If you don't have Stripe, Gumroad will walk you through creating one
3. Set your payout schedule (weekly recommended to start)
4. Add your bank account for payouts

## 4. Configure Store Settings

1. **Settings → General:**
   - Currency: USD
   - Enable "Discover" (Gumroad's marketplace) for extra visibility
2. **Settings → Emails:**
   - Customize the purchase receipt email
   - Add your brand colors/logo
3. **Settings → Third-party analytics:**
   - Add Google Analytics tracking ID (if you have one)
   - Add Facebook Pixel (optional, for future paid promotion)

## 5. Create Your First Product (Lead Magnet)

The cheat sheet PDF already exists at `lead-magnets/marketing-ai-cheat-sheet.pdf`.

1. Click **New Product**
2. Product type: **Digital product**
3. Fill in:
   - **Name:** "Marketing AI Cheat Sheet — 50+ Tools Ranked & Reviewed"
   - **Price:** $0+ (Name Your Price — lets people pay $0 or tip)
   - **Description:**
     ```
     The ultimate quick-reference guide for marketing professionals exploring AI tools.
     
     ✅ 50+ tools across 11 categories
     ✅ Pricing tiers at a glance
     ✅ Best-for-use-case recommendations  
     ✅ Updated for 2026
     
     Free download — if you find it valuable, consider supporting us!
     ```
   - **Cover image:** Use a mockup of the cheat sheet (1280×720px)
   - **File:** Upload `marketing-ai-cheat-sheet.pdf`
4. Under **Checkout:**
   - Enable "Collect email addresses" ← **Critical for list building**
   - Enable "Ask for name" (optional but helpful)
5. Click **Publish**

## 6. Create a Paid Product Placeholder (Week 2+)

You don't need to publish this yet, but set up the draft:

1. Click **New Product** → **Digital product**
2. **Name:** "AI Tools Playbook for Marketers — Complete Guide"
3. **Price:** $19 (can adjust later)
4. **Description:** (draft — refine later)
   ```
   Go beyond the cheat sheet. Deep-dive guides on implementing AI tools
   in your marketing workflow, with real examples and ROI frameworks.
   ```
5. Save as **Draft** — don't publish yet

## 7. Get Your Embed/Link URLs

After publishing the free product:

1. Go to the product page
2. Click **Share** → copy the **direct link**: `https://YOURUSERNAME.gumroad.com/l/PRODUCT_SHORT_URL`
3. For the overlay embed, you'll use: `https://gumroad.com/l/PRODUCT_SHORT_URL`
4. Note the product short URL — you'll need it for the buy button components

**Copy these values into your `.env` or config:**
```
GUMROAD_USERNAME=aitoolsdir
GUMROAD_PRODUCT_CHEATSHEET=xxxxxx    # the short product code
GUMROAD_STORE_URL=https://aitoolsdir.gumroad.com
```

## 8. Branding Checklist

- [ ] Profile picture uploaded (matches site logo)
- [ ] Cover image uploaded (brand colors)
- [ ] Bio written
- [ ] Custom URL claimed
- [ ] Payment connected
- [ ] First product published (free cheat sheet)
- [ ] Email collection enabled on product
- [ ] Receipt email customized

---

## Integration with the Site

See `src/components/GumroadButton.astro` for the ready-to-use buy button component.  
See `src/components/GumroadOverlay.astro` for the overlay checkout component.  
The Gumroad JS is loaded in the Layout when a Gumroad component is present on the page.

**Next steps after account setup:**
1. Replace placeholder product URLs in components with real ones
2. Test the purchase flow end-to-end
3. Set up Gumroad → Beehiiv integration (via Zapier or webhook) to auto-add purchasers to newsletter
