# DNS Migration to Vercel Nameservers

This guide walks through migrating **marketingstackai.com** DNS to Vercel's
nameservers so the custom domain works fully (apex + www, automatic SSL, etc.).

## Why Migrate?

Using Vercel's nameservers gives you:
- **Automatic SSL** certificates for all domains/subdomains
- **Apex domain support** (`marketingstackai.com` without `www`)
- **Automatic `www` → apex redirect** (or vice versa)
- **Faster DNS propagation** for Vercel deployments
- **Zero-downtime deployments** with instant domain switching

## Prerequisites

- Access to your domain registrar (where you bought `marketingstackai.com`)
- Access to the Vercel project dashboard

## Step 1: Add the Domain in Vercel

1. Go to the [Vercel Dashboard](https://vercel.com/dashboard)
2. Select the **ai-tools-directory** project
3. Go to **Settings → Domains**
4. Add `marketingstackai.com` (if not already added)
5. Also add `www.marketingstackai.com`
6. Vercel will show you the required nameservers — they look like:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```

## Step 2: Update Nameservers at Your Registrar

1. Log in to your domain registrar
2. Find the DNS / Nameserver settings for `marketingstackai.com`
3. **Replace** the existing nameservers with Vercel's:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
4. Save the changes

> **Note:** Remove any old nameservers — you should *only* have Vercel's
> nameservers listed. Mixing nameservers from different providers causes issues.

## Step 3: Wait for Propagation

DNS propagation typically takes **15 minutes to 48 hours**, though it's usually
fast (under 1 hour).

You can check propagation status:
- [whatsmydns.net](https://www.whatsmydns.net/) — search for `marketingstackai.com` NS records
- `dig marketingstackai.com NS` in terminal

## Step 4: Verify in Vercel

1. Go back to **Settings → Domains** in Vercel
2. Both `marketingstackai.com` and `www.marketingstackai.com` should show
   a green checkmark ✅
3. SSL certificate will be auto-provisioned

## Step 5: Configure Domain Redirect

In Vercel domain settings, decide on your canonical URL:
- **Recommended:** `marketingstackai.com` as primary, `www` redirects to it
- Set `www.marketingstackai.com` to redirect → `marketingstackai.com`

## Step 6: Verify Everything Works

Test these URLs:
- [ ] `https://marketingstackai.com` — should load the site
- [ ] `https://www.marketingstackai.com` — should redirect to apex
- [ ] `http://marketingstackai.com` — should redirect to HTTPS
- [ ] `https://marketingstackai.com/browse` — should work
- [ ] `https://marketingstackai.com/api/subscribe` — newsletter API should work
- [ ] Newsletter signup form on the site — should submit successfully

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Domain shows "Pending" in Vercel | Nameservers haven't propagated yet. Wait up to 48h. |
| SSL error / insecure warning | Wait for Vercel to provision the certificate (auto, usually < 10 min after NS propagation). |
| API calls failing (CORS) | The codebase has been updated to allow `marketingstackai.com` and `www.marketingstackai.com` origins. |
| Old Vercel URL still showing | Clear browser cache or use incognito window. |

## What Changed in the Codebase

This migration included the following code changes:

1. **Newsletter API calls** — Switched from hardcoded Vercel preview URL
   (`ai-tools-directory-nine-ashy.vercel.app`) to a relative path (`/api/subscribe`).
   This works regardless of which domain serves the site.

2. **CORS allowlist** — Updated `api/subscribe.js` to allow requests from
   `marketingstackai.com` and `www.marketingstackai.com` (removed the old
   Vercel preview URL).

3. **Site config** — Already correctly set to `https://marketingstackai.com`
   in `astro.config.mjs` and `src/config/site.ts`.

## Email / MX Records

If you have email set up on this domain (Google Workspace, etc.), you'll need to
re-add MX records in Vercel's DNS settings after migration:

1. Go to Vercel Dashboard → your project → **Settings → Domains**
2. Click the domain → **DNS Records**
3. Add your MX records (get these from your email provider)

> **Important:** Write down your current MX, TXT (SPF/DKIM), and any other
> DNS records *before* switching nameservers, since they won't transfer
> automatically.
