# Marketing Report Template — Gumroad Product

**Price:** $29 | **Platform:** Gumroad | **Format:** Excel/Google Sheets (.xlsx)

## Folder Structure

```
products/marketing-report-template/
├── README.md                    ← This file (product overview)
├── gumroad-listing.md           ← Sales copy, description, tags, settings
├── deliverable/                 ← Files the customer receives
│   ├── Marketing-Report-Template.xlsx  ← The main template (6 tabs)
│   └── README.md                       ← User guide (included in download)
└── assets/                      ← Marketing/preview materials
    └── product-preview.html        ← Product preview page (for screenshots)
```

## Deliverable Contents

The `.xlsx` file contains 6 tabs:

1. **Executive Summary** — High-level overview with KPIs, period-over-period comparisons, traffic light status indicators, and narrative prompts
2. **Channel Performance** — Detailed breakdown across 8 channels (paid search, paid social, organic search, organic social, email, display/programmatic, affiliate/referral, direct) with spend, impressions, clicks, CTR, conversions, CPA, revenue, and ROAS
3. **KPI Dashboard** — At-a-glance metrics dashboard with targets vs. actuals, variance calculations, and conditional formatting for quick status reads
4. **Monthly Trends** — 12-month trend tracking with MoM and YoY comparison columns, sparkline-ready data layout, and seasonal annotations
5. **Recommendations** — Structured framework for actionable insights: observation → data evidence → recommendation → expected impact → priority level
6. **Setup & Instructions** — Configuration guide, metric definitions glossary, and customization tips

## Regenerating the Template

The `.xlsx` file is generated from code (not hand-edited). To regenerate after making changes:

```bash
cd products/marketing-report-template
npm install
node generate-template.js
```

This outputs `deliverable/Marketing-Report-Template.xlsx` with all formulas and formatting.

## Packaging for Gumroad

1. Zip the `deliverable/` folder contents together
2. Upload to Gumroad as a digital download
3. Use `gumroad-listing.md` for all copy and settings
4. Take screenshots from `product-preview.html` for listing images
5. Recommended: also screenshot the actual .xlsx opened in Google Sheets for authenticity

## Preview Page

Open `assets/product-preview.html` in a browser to see the product mockup. Use this for:
- Gumroad thumbnail (screenshot at 1280x720)
- Social media preview images
- Product page hero image

## Target Audience

- Marketing managers and directors
- Agency account managers and strategists
- Freelance marketing consultants
- Small business owners managing their own marketing
- Anyone who needs to present marketing performance data clearly and professionally
