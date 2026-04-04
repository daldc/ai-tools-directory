# UTM Builder & Campaign Naming Convention Template

## What's Inside

This template helps you build consistent, trackable UTM-tagged URLs and standardize your campaign naming conventions across every channel.

### 📊 5 Tabs Included

| Tab | What It Does |
|-----|-------------|
| **UTM Builder** | Build tagged URLs with auto-generated links. Fill in source, medium, campaign, content, and term — the tagged URL creates itself. Includes dropdown menus for common values. |
| **Naming Convention** | A complete framework for naming campaigns consistently. Includes rules, the naming formula, and 14 channel-specific examples. |
| **GA4 Channel Mapping** | Reference guide showing exactly which `utm_medium` values map to each GA4 default channel group. No more traffic landing in "Other." |
| **Bulk URL Builder** | Launch campaigns across 10+ channels at once. Enter your base URL once, fill in the parameters, and get all tagged URLs instantly. |
| **Quick Start Guide** | Step-by-step instructions to get started in under 5 minutes. |

---

## Getting Started

### Step 1: Open in Google Sheets or Excel

- **Google Sheets:** Upload to Google Drive → Open with Google Sheets
- **Excel:** Open directly (Excel 2016 or later recommended)

### Step 2: Go to the "UTM Builder" Tab

1. Enter your **Base URL** in column A (e.g., `https://yoursite.com/landing-page`)
2. Select or type your **utm_source** in column B (e.g., `google`, `facebook`)
3. Select or type your **utm_medium** in column C (e.g., `cpc`, `email`)
4. Enter your **utm_campaign** in column D (e.g., `spring-sale-2026`)
5. Optionally add **utm_content** (column E) and **utm_term** (column F)
6. Your **Tagged URL** appears automatically in column G ✨

### Step 3: Copy and Use

Copy the tagged URL from column G and paste it into your:
- Ad platform destination URLs
- Email campaign links
- Social media posts
- Any marketing link you want to track

---

## Campaign Naming Convention

### The Formula

```
[Year]_[Quarter/Month]_[Source]_[Medium]_[Campaign-Name]
```

### Examples

| Channel | Campaign Name |
|---------|--------------|
| Google Ads | `2026_q2_google_cpc_spring-sale` |
| Facebook Ads | `2026_q2_facebook_paid-social_retargeting` |
| Email Newsletter | `2026_q2_newsletter_email_april-digest` |
| LinkedIn Organic | `2026_ongoing_linkedin_organic-social_thought-leadership` |

### Rules

- ✅ Always lowercase
- ✅ Use hyphens for spaces (`spring-sale` not `spring sale`)
- ✅ No special characters
- ✅ Be specific and descriptive
- ✅ Include timeframe (year + quarter)
- ✅ Match GA4 channel groupings

---

## GA4 Channel Alignment

Using the wrong `utm_medium` is why your traffic shows up as "Other" in GA4. The **GA4 Channel Mapping** tab shows exactly which values to use:

| GA4 Channel | Use This utm_medium |
|-------------|-------------------|
| Paid Search | `cpc`, `ppc` |
| Paid Social | `paid-social` |
| Organic Social | `organic-social`, `social` |
| Email | `email` |
| Display | `display`, `cpm` |
| Video | `video` |
| Affiliate | `affiliate` |

---

## Link Shortener Integration

Long UTM-tagged URLs can look messy in social media posts, emails, and ads. Use a link shortener to create clean, branded links while preserving full UTM tracking.

### Recommended Link Shorteners

| Service | Free Tier | Best For | UTM Preservation |
|---------|-----------|----------|-----------------|
| **Bitly** | 10 links/month | General use, most popular | Full pass-through |
| **Rebrandly** | 25 links/month | Branded domains (e.g., go.yourco.com) | Full pass-through |
| **Short.io** | 1,000 links | Teams, custom domains | Full pass-through + built-in UTM builder |
| **YOURLS** | Unlimited (self-hosted) | Full data ownership | Full pass-through |
| **TinyURL** | Unlimited | Quick, no-signup links | Full pass-through |

### Best Practices for Shortened UTM Links

1. **Always test first** — Shorten a tagged URL, click it, and verify all UTM parameters appear in GA4 Realtime
2. **Use custom back-halves** — Instead of `bit.ly/3xR7kq`, use `bit.ly/spring-sale-2026` for readability
3. **Keep a log** — Record both the full tagged URL and the shortened version in this spreadsheet (add a column if needed)
4. **Use branded domains** — `go.yourcompany.com/spring-sale` builds trust and improves click-through rates
5. **Don't double-shorten** — Never run a shortened URL through a second shortener; it can break redirect chains

### How to Shorten

1. Build your tagged URL in the **UTM Builder** tab
2. Copy the tagged URL from column G
3. Paste into your link shortener of choice
4. Replace the long URL in your campaign with the shortened version
5. UTM parameters are preserved through the redirect — GA4 will see them normally

---

## Tips for Teams

1. **Share this template** with your entire marketing team
2. **Agree on conventions** before launching campaigns
3. **Use the Naming Convention tab** as your single source of truth
4. **Review tagged URLs** before going live — one typo breaks tracking
5. **Keep a master copy** and create duplicates for individual campaigns

---

## Support

Questions? Visit [aitoolsdirectory.com](https://aitoolsdirectory.com) for more marketing templates and tools.

---

*Built by AI Tools Directory — helping marketers work smarter.*
