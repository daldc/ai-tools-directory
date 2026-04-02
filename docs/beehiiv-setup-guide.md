# Beehiiv Newsletter Setup Guide

> **Time estimate:** ~15 minutes  
> **Prerequisites:** Email address  
> **Status:** Manual steps required (account creation needs human login)  
> **Branding:** See [beehiiv-branding-config.md](./beehiiv-branding-config.md) for full color palette, logo specs, and email templates

## 1. Create Your Beehiiv Account

1. Go to [beehiiv.com](https://www.beehiiv.com) and click **Start for free**
2. Sign up with your email
3. Choose the **Launch** plan (free — up to 2,500 subscribers, more than enough to start)
4. Publication name: **The AI Marketing Stack**

## 2. Configure Publication Settings

1. **Settings → General:**
   - Publication name: "The AI Marketing Stack"
   - Description: "Honest AI tool reviews, pricing breakdowns, and templates for marketing teams. Every Tuesday."
   - Website URL: Your AI Tools Directory URL
   - Logo: Upload the site logo
   - Favicon: Upload matching favicon
   
2. **Settings → Publication Details:**
   - From name: "Dallas" (personal = higher open rates, see branding doc for rationale)
   - Reply-to email: your email
   - Sender email: Will be `@mail.beehiiv.com` on free plan (custom domain available on paid)

3. **Settings → Design:**
   - Primary color: `#0ff0e0` (brand-teal — see [branding config](./beehiiv-branding-config.md) for full palette)
   - Background: Dark theme if available, or keep default
   - Font: Clean sans-serif (Inter or similar)

## 3. Set Up Custom Domain (Optional, Recommended Later)

When ready to upgrade:
1. **Settings → Domain**
2. Add: `newsletter.yourdomain.com`
3. Add the DNS records Beehiiv provides (CNAME)
4. This makes emails come from your domain instead of beehiiv.com

## 4. Create Welcome Email (Automation)

1. Go to **Automations → New Automation**
2. Trigger: **New subscriber**
3. Add action: **Send email**
4. Subject line: `Welcome to AI Tools Directory — here's your first recommendation 🎯`
5. Email body (use the template below):

### Welcome Email Template

```
Hey {first_name|there}! 👋

Thanks for subscribing to the AI Tools Directory newsletter.

Here's what you'll get:

📬 **Weekly roundups** — The best new AI tools for marketers, curated and reviewed
🎯 **Quick tips** — Practical ways to use AI in your marketing workflow  
📊 **Exclusive guides** — Deep dives that don't get published on the site

To kick things off, here are 3 tools worth checking out right now:

1. **ChatGPT** — Still the Swiss Army knife. Great for copy, brainstorming, and analysis.
2. **Midjourney** — AI image generation that actually looks professional.
3. **Jasper** — Purpose-built for marketing teams. Worth the investment if you're scaling content.

Browse the full directory anytime: [AI Tools Directory](YOUR_SITE_URL)

Talk soon,
Dallas

P.S. Got a tool you think should be in the directory? Just reply to this email.
```

6. Set delay: **Send immediately** after signup
7. Activate the automation

## 5. Create Signup Form

1. Go to **Grow → Forms**
2. Click **New Form** → **Embedded**
3. Configure:
   - Collect: Email (required), First name (optional)
   - Button text: "Subscribe"
   - Success message: "You're in! Check your inbox for a welcome email."
4. Copy the embed code — it'll look something like:
   ```html
   <iframe src="https://embeds.beehiiv.com/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
     data-test-id="beehiiv-embed" 
     width="100%" height="320" frameborder="0"
     scrolling="no" style="border-radius: 4px; margin: 0; background-color: transparent;">
   </iframe>
   ```
5. **Save the publication ID** — you'll need it for the site component

**Copy these values into your config:**
```
BEEHIIV_PUBLICATION_ID=pub_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
BEEHIIV_EMBED_URL=https://embeds.beehiiv.com/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

## 6. Create Landing Page (Optional)

Beehiiv includes a hosted subscribe page:
1. Go to **Grow → Subscribe Page**
2. Customize with your branding
3. URL will be: `https://aitoolsdir.beehiiv.com/subscribe`
4. Useful as a fallback link for social media bios

## 7. Set Up Segments (For Future Use)

1. Go to **Audience → Segments**
2. Create these segments for later:
   - **"Gumroad Customers"** — tag: `gumroad_customer` (for people who come via product purchase)
   - **"Website Signups"** — tag: `website_signup`
   - **"Power Users"** — engagement: opened 3+ of last 5 emails

## 8. API Key (For Programmatic Signups)

If you want the site's newsletter form to submit directly (no iframe):
1. Go to **Settings → API**
2. Generate an API key
3. API endpoint: `POST https://api.beehiiv.com/v2/publications/{pub_id}/subscriptions`
4. Save the API key securely (environment variable, not in code)

**Note:** The API approach is better UX (no iframe jank) but requires a serverless function or API route to proxy the request (to keep the API key secret). The iframe embed works immediately with zero backend.

## 9. Setup Checklist

- [ ] Account created
- [ ] Publication name and description set
- [ ] Logo and branding configured
- [ ] Welcome email automation created and activated
- [ ] Embedded signup form created
- [ ] Embed URL/publication ID copied to site config
- [ ] Test: subscribe with a test email → verify welcome email arrives
- [ ] (Optional) Custom domain configured
- [ ] (Optional) API key generated for direct form submission

---

## Integration with the Site

See `src/components/NewsletterSignup.astro` for the updated signup component.  
Two modes are available:
1. **Iframe embed** (default) — zero config, works immediately after pasting embed URL
2. **Custom form + API** — better UX, requires API key and serverless function

**Next steps after account setup:**
1. Replace the placeholder embed URL in `NewsletterSignup.astro`
2. Test signup flow end-to-end
3. Connect Gumroad → Beehiiv (Zapier: "New Gumroad Sale" → "Add Beehiiv Subscriber" with `gumroad_customer` tag)
