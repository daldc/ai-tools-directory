# Beehiiv Publication Configuration & Branding Guide

> **Publication:** The AI Marketing Stack  
> **Purpose:** Step-by-step reference for configuring Beehiiv's UI to match the AI Tools Directory brand.  
> **Last updated:** 2026-04-02

---

## Table of Contents

1. [Publication Settings](#1-publication-settings)
2. [Color Palette](#2-color-palette)
3. [Typography](#3-typography)
4. [Logo & Favicon Specs](#4-logo--favicon-specs)
5. [Email Header Template](#5-email-header-template)
6. [Email Footer Template](#6-email-footer-template)
7. [Sender Configuration](#7-sender-configuration)
8. [Subscribe Page Branding](#8-subscribe-page-branding)
9. [Custom Domain Setup](#9-custom-domain-setup)
10. [Beehiiv UI Walkthrough](#10-beehiiv-ui-walkthrough)

---

## 1. Publication Settings

Configure in **Settings → General** in the Beehiiv dashboard.

| Setting | Value |
|---------|-------|
| **Publication name** | The AI Marketing Stack |
| **Description** | Honest AI tool reviews, pricing breakdowns, and templates for marketing teams. One email per week. |
| **Website URL** | `https://aitoolsdirectory.com` |
| **Publication handle** | `ai-marketing-stack` (for `ai-marketing-stack.beehiiv.com`) |
| **Send day** | Tuesday |
| **Send time** | 8:00 AM MT / 10:00 AM ET |

---

## 2. Color Palette

### Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Brand Teal** | `#0ff0e0` | `15, 240, 224` | Primary accent — buttons, links, CTAs, highlights |
| **Surface Dark** | `#09090b` | `9, 9, 11` | Email background (dark mode), footer background |

### Secondary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Teal Dark** | `#0cc8b8` | `12, 200, 184` | Hover states, secondary links, borders |
| **Amber** | `#f5a623` | `245, 166, 35` | Callouts, star ratings, featured badges |
| **Amber Light** | `#ffd580` | `255, 213, 128` | Subtle highlights, background accents |
| **Coral** | `#ff6b6b` | `255, 107, 107` | Warnings, "overhyped" labels, alerts |

### Surface Colors (Email-Safe)

| Name | Hex | Usage |
|------|-----|-------|
| **Surface 950** | `#09090b` | Darkest background |
| **Surface 900** | `#18181b` | Primary email body background |
| **Surface 850** | `#1e1e22` | Card/section backgrounds |
| **Surface 800** | `#27272a` | Borders, dividers |
| **Surface 700** | `#3f3f46` | Muted text |
| **Surface 600** | `#52525b` | Secondary text |
| **White** | `#fafafa` | Primary body text |

### Beehiiv-Specific Settings

In **Settings → Design → Colors**:
- **Primary color:** `#0ff0e0` (Brand Teal)
- **Background color:** `#18181b` (Surface 900) — *if dark mode is supported, otherwise use `#ffffff`*
- **Text color:** `#fafafa` — *for dark background; use `#09090b` if on light background*
- **Link color:** `#0ff0e0` (Brand Teal)
- **Button color:** `#0ff0e0` (Brand Teal)
- **Button text color:** `#09090b` (Surface Dark — dark text on teal button)

> ⚠️ **Email client compatibility:** Many email clients strip dark backgrounds. Design emails to look good on **both** light and dark. Use the teal accent as the primary brand signal rather than relying on dark backgrounds.

---

## 3. Typography

### Font Selections

| Context | Primary | Fallback (email-safe) |
|---------|---------|----------------------|
| **Headlines** | Clash Display | Arial Black, Trebuchet MS, sans-serif |
| **Body text** | General Sans | -apple-system, Segoe UI, Roboto, Arial, sans-serif |

### Beehiiv Font Settings

In **Settings → Design → Typography**:
- **Heading font:** Select the closest available sans-serif (likely **Inter** or **Helvetica**). Beehiiv's font library is limited — don't fight it.
- **Body font:** **System default** or **Inter** — both render cleanly across email clients.
- **Font size:** 16px body / 24-32px headings

### Text Styling Guidelines

- **Headlines:** Bold, sentence case (not ALL CAPS)
- **Body:** Regular weight, 1.6 line height
- **Links:** Teal (`#0ff0e0`), no underline by default, underline on hover
- **Emphasis:** Bold for tool names, italic sparingly
- **Emojis:** Use selectively in subject lines and section headers (📬 🔦 💰 🛠️) — they boost open rates but overuse cheapens the brand

---

## 4. Logo & Favicon Specs

### Logo Requirements

| Spec | Value |
|------|-------|
| **Format** | PNG with transparent background (SVG source recommended) |
| **Primary logo size** | 600×120px (horizontal lockup for email header) |
| **Square logo** | 400×400px (for Beehiiv profile, social sharing) |
| **Min width** | 200px (for mobile email rendering) |
| **Color version** | Teal (`#0ff0e0`) mark + white text on dark bg |
| **Light background version** | Teal mark + dark (`#09090b`) text |

### Favicon

| Spec | Value |
|------|-------|
| **Format** | PNG or ICO |
| **Size** | 256×256px (Beehiiv will resize) |
| **Design** | Simplified logo mark — teal icon on transparent background |

### Logo Design Direction

The logo should communicate:
- **Tech-forward** — clean geometry, not clipart
- **Marketing credibility** — professional, not startup-bro
- **The "Stack" concept** — layered/stacked visual element works well

**Suggested approach:** A simple geometric mark (stacked bars, layered cards, or circuit-inspired motif) in brand teal, with "The AI Marketing Stack" in Clash Display or Inter Bold beside it.

### Where to Upload in Beehiiv

1. **Settings → General → Logo** — Upload the 600×120px horizontal version
2. **Settings → General → Favicon** — Upload the 256×256px icon
3. **Settings → Design → Header** — Same horizontal logo will be used in emails

> 📝 **Action item:** Create these logo assets. Use Figma, Canva, or commission a designer. The site doesn't have a finalized logo yet — this is a good time to establish one that works across web + email.

---

## 5. Email Header Template

### Structure

```
┌─────────────────────────────────────────────┐
│  [Logo: The AI Marketing Stack]             │
│                                             │
│  ─────────── teal divider line ───────────  │
│                                             │
│  📬 Issue #XX — [Issue Title]               │
│  [Short tagline or featured hook]           │
└─────────────────────────────────────────────┘
```

### HTML/Inline-CSS Template (Email Header)

```html
<!-- Email Header -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;margin:0 auto;">
  <tr>
    <td style="padding:24px 20px 16px 20px;text-align:center;">
      <!-- Logo -->
      <!-- Replace with your hosted logo URL -->
      <img src="YOUR_LOGO_URL" alt="The AI Marketing Stack" 
           width="280" style="max-width:280px;height:auto;" />
    </td>
  </tr>
  <tr>
    <td style="padding:0 20px;">
      <!-- Teal divider -->
      <div style="border-top:2px solid #0ff0e0;margin:0;"></div>
    </td>
  </tr>
  <tr>
    <td style="padding:16px 20px 8px 20px;text-align:center;">
      <!-- Issue label -->
      <span style="font-size:13px;color:#52525b;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;">
        Issue #XX · Month DD, YYYY
      </span>
    </td>
  </tr>
</table>
```

### Beehiiv Implementation

In Beehiiv's editor, you can customize the header under **Settings → Design → Header**:
1. **Logo:** Upload horizontal logo
2. **Alignment:** Center
3. **Background:** Transparent (inherits email background)
4. Beehiiv automatically adds the logo to every email — the divider and issue number go in the email body's first block

---

## 6. Email Footer Template

### Structure

```
┌─────────────────────────────────────────────┐
│  ─────────── teal divider line ───────────  │
│                                             │
│  📍 The AI Marketing Stack                  │
│  Honest AI tool reviews for marketing teams │
│                                             │
│  [Browse Directory] · [Free Cheat Sheet]    │
│                                             │
│  Was this forwarded to you?                 │
│  → Subscribe here                           │
│                                             │
│  ─────────────────────────────────────────  │
│  You're receiving this because you signed   │
│  up at theaimarketingstack.com              │
│  Unsubscribe · Manage preferences           │
│                                             │
│  © 2026 The AI Marketing Stack              │
└─────────────────────────────────────────────┘
```

### HTML/Inline-CSS Template (Email Footer)

```html
<!-- Email Footer -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;margin:0 auto;">
  <tr>
    <td style="padding:24px 20px 0 20px;">
      <div style="border-top:2px solid #0ff0e0;margin:0;"></div>
    </td>
  </tr>
  <tr>
    <td style="padding:20px 20px 8px 20px;text-align:center;">
      <p style="margin:0;font-size:15px;font-weight:bold;color:#fafafa;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;">
        📍 The AI Marketing Stack
      </p>
      <p style="margin:4px 0 0 0;font-size:13px;color:#52525b;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;">
        Honest AI tool reviews for marketing teams
      </p>
    </td>
  </tr>
  <tr>
    <td style="padding:12px 20px;text-align:center;">
      <a href="https://aitoolsdirectory.com/browse" style="color:#0ff0e0;text-decoration:none;font-size:13px;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;">
        Browse Directory
      </a>
      <span style="color:#3f3f46;margin:0 8px;">·</span>
      <a href="https://dallasc.gumroad.com/l/ai-tools-cheatsheet" style="color:#0ff0e0;text-decoration:none;font-size:13px;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;">
        Free Cheat Sheet
      </a>
    </td>
  </tr>
  <tr>
    <td style="padding:8px 20px 16px 20px;text-align:center;">
      <p style="margin:0;font-size:13px;color:#52525b;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;">
        Was this forwarded to you? 
        <a href="https://aitoolsdirectory.com/subscribe" style="color:#0ff0e0;text-decoration:none;">Subscribe here →</a>
      </p>
    </td>
  </tr>
  <tr>
    <td style="padding:16px 20px;text-align:center;">
      <div style="border-top:1px solid #27272a;margin:0 0 12px 0;"></div>
      <p style="margin:0;font-size:11px;color:#3f3f46;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;">
        You're receiving this because you signed up at theaimarketingstack.com<br/>
        <a href="{{unsubscribe_url}}" style="color:#a1a1aa;text-decoration:underline;">Unsubscribe</a> · 
        <a href="{{manage_subscription_url}}" style="color:#a1a1aa;text-decoration:underline;">Manage preferences</a>
      </p>
      <p style="margin:8px 0 0 0;font-size:11px;color:#3f3f46;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;">
        © 2026 The AI Marketing Stack
      </p>
    </td>
  </tr>
</table>
```

### Beehiiv Implementation

Configure in **Settings → Design → Footer**:
1. Beehiiv auto-includes unsubscribe/preferences links (CAN-SPAM required)
2. Add the custom footer content (description, directory links, forward CTA) as a **reusable content block** you paste at the end of each issue
3. Or use Beehiiv's footer customization to add the links and tagline

---

## 7. Sender Configuration

### Recommended Settings

| Setting | Value | Notes |
|---------|-------|-------|
| **From name** | Dallas | First name only — personal, trustworthy, higher open rates |
| **From email** | `dallas@theaimarketingstack.com` | Requires custom domain; fallback: `@mail.beehiiv.com` |
| **Reply-to email** | Dallas's personal/work email | So replies actually reach him |
| **Reply-to name** | Dallas | Matches sender |

### Why "Dallas" Not "The AI Marketing Stack"

- Personal sender names get **20-30% higher open rates** than brand names
- Matches the voice of the existing welcome sequence (written in first person)
- Readers feel like they're hearing from a person, not a newsletter factory
- The publication name is in the subject/header — the sender name doesn't need to repeat it

### Alternate Options (If Preferred)

| Option | Example | Tradeoff |
|--------|---------|----------|
| First name only | `Dallas` | Most personal, highest engagement |
| Name + brand | `Dallas from The AI Marketing Stack` | Clear who + what, slightly lower open rate |
| Brand only | `The AI Marketing Stack` | Professional but less personal |

**Recommendation:** Start with `Dallas`. Switch to `Dallas from The AI Marketing Stack` only if deliverability data suggests brand recognition helps.

### Configure in Beehiiv

1. **Settings → Sending → From name:** `Dallas`
2. **Settings → Sending → Reply-to:** Your actual email address
3. **Settings → Domain** (for custom sender email — see Section 9)

---

## 8. Subscribe Page Branding

Beehiiv hosts a subscribe page at `ai-marketing-stack.beehiiv.com/subscribe`.

### Configure in Settings → Subscribe Page

| Element | Value |
|---------|-------|
| **Headline** | The AI Marketing Stack |
| **Subheadline** | Honest AI tool reviews, pricing breakdowns, and templates for marketing teams. Every Tuesday. |
| **CTA button text** | Subscribe — it's free |
| **CTA button color** | `#0ff0e0` (Brand Teal) |
| **CTA button text color** | `#09090b` (Dark) |
| **Background** | `#09090b` or `#18181b` |
| **Text color** | `#fafafa` |
| **Social proof** | Enable subscriber count once past 100 |

### Recommended Trust Signals

Add these as bullet points below the form:
- 📬 One email per week (Tuesdays)
- 🔦 Honest reviews — not sponsored content
- 💰 Pricing breakdowns included
- 🛠️ Free templates and resources
- 🚫 No spam, unsubscribe anytime

---

## 9. Custom Domain Setup

### Recommended Domains

| Type | Domain | Purpose |
|------|--------|---------|
| **Newsletter subdomain** | `newsletter.theaimarketingstack.com` | Email links and web version |
| **Sender domain** | `theaimarketingstack.com` | Custom from-address |

### DNS Records Required

Beehiiv will provide exact values, but expect to add:

1. **CNAME** for `newsletter.theaimarketingstack.com` → Beehiiv's domain
2. **SPF** record (TXT) — authorizes Beehiiv to send on your behalf
3. **DKIM** records (CNAME × 2-3) — email authentication
4. **DMARC** record (TXT) — email policy (`v=DMARC1; p=none;` to start)

### Setup Steps in Beehiiv

1. **Settings → Domain → Custom domain**
2. Enter `newsletter.theaimarketingstack.com`
3. Beehiiv generates the required DNS records
4. Add records to your DNS provider (Vercel, Cloudflare, Namecheap, etc.)
5. Wait for propagation (usually 15-60 min, sometimes up to 48 hours)
6. Verify in Beehiiv dashboard
7. Enable custom sender address: `dallas@theaimarketingstack.com`

> ⚠️ **Plan requirement:** Custom domains may require the **Scale** plan ($39/mo) or higher. Verify current Beehiiv pricing.

---

## 10. Beehiiv UI Walkthrough

### Complete Setup Checklist

Use this as a step-by-step walkthrough when configuring Beehiiv:

#### Phase 1: Account & Publication (5 min)
- [ ] Create Beehiiv account at [beehiiv.com](https://www.beehiiv.com)
- [ ] Set publication name: **The AI Marketing Stack**
- [ ] Set handle: `ai-marketing-stack`
- [ ] Set description: "Honest AI tool reviews, pricing breakdowns, and templates for marketing teams. Every Tuesday."

#### Phase 2: Branding & Design (10 min)
- [ ] Upload logo (horizontal, 600×120px) in **Settings → General → Logo**
- [ ] Upload favicon (256×256px) in **Settings → General → Favicon**
- [ ] Set primary color to `#0ff0e0` in **Settings → Design → Colors**
- [ ] Set link color to `#0ff0e0`
- [ ] Set button color to `#0ff0e0`, button text to `#09090b`
- [ ] Choose body font: Inter or system default
- [ ] Configure header: centered logo, clean layout

#### Phase 3: Sender Settings (5 min)
- [ ] Set from name: `Dallas` in **Settings → Sending**
- [ ] Set reply-to email: Dallas's preferred email
- [ ] (Optional) Set up custom domain for custom sender address

#### Phase 4: Subscribe Page (5 min)
- [ ] Customize subscribe page headline and description
- [ ] Set CTA button: "Subscribe — it's free" in teal
- [ ] Add trust signals (bullet points about frequency, no spam, etc.)

#### Phase 5: Footer & Recurring Elements (5 min)
- [ ] Create reusable footer block with directory link, cheat sheet link, and forward CTA
- [ ] Verify unsubscribe/preferences links are present (Beehiiv auto-includes)

#### Phase 6: Integrations (5 min)
- [ ] Generate API key: **Settings → API**
- [ ] Save publication ID and embed URL
- [ ] Create embed form: **Grow → Forms → Embedded**
- [ ] Copy embed code to site config

#### Phase 7: Test (5 min)
- [ ] Send test email to yourself
- [ ] Verify logo renders correctly in Gmail, Apple Mail, Outlook
- [ ] Verify subscribe page looks correct
- [ ] Test embed form on the site (if integrated)
- [ ] Check mobile rendering

---

## Quick Reference Card

Copy this for easy access when configuring:

```
Publication:  The AI Marketing Stack
Handle:       ai-marketing-stack
Sender:       Dallas
Primary:      #0ff0e0 (teal)
Dark:         #09090b
Surface:      #18181b
Accent:       #f5a623 (amber)
Alert:        #ff6b6b (coral)
Button:       bg #0ff0e0, text #09090b
Font:         Inter / system sans-serif
Send day:     Tuesday 8:00 AM MT
```

---

*See also: [beehiiv-setup-guide.md](./beehiiv-setup-guide.md) for technical integration details and API setup.*
