# Publishing a Newsletter Issue via Beehiiv

Step-by-step guide for importing and sending newsletter issues.

## Prerequisites

- Beehiiv account with "The AI Marketing Stack" publication
- Newsletter content in `templates/newsletter/issue-XXX-*.md` (copy reference)
- HTML version in `templates/newsletter/issue-XXX-*.html` (for import)

## Steps

### 1. Create a New Post in Beehiiv

1. Log in to [app.beehiiv.com](https://app.beehiiv.com)
2. Navigate to **Posts** → **New Post**
3. Choose **Web Builder** (not the visual editor) for HTML import

### 2. Import the HTML Content

1. In the post editor, click the **</>** (code/HTML) toggle
2. Copy the full contents of the `.html` file (e.g., `issue-001-launch.html`)
3. Paste into the HTML editor
4. Switch back to the visual preview to verify rendering

### 3. Set Email Metadata

| Field | Issue #1 Value |
|-------|---------------|
| **Subject Line** | The AI tools your marketing team actually needs |
| **Preview Text** | 103 tools reviewed. Zero affiliate links. Just what works. |
| **From Name** | Dallas (or "The AI Marketing Stack") |
| **Tags** | `issue-1`, `launch` |

### 4. Preview & Test

1. Click **Preview** to check desktop + mobile rendering
2. Send a **test email** to yourself
3. Verify:
   - All links work (directory, Gumroad UTM builder, cheat sheet)
   - CTA buttons render correctly on mobile
   - Dark background displays properly across email clients
   - Unsubscribe link is present (Beehiiv auto-replaces `{{unsubscribe_url}}`)

### 5. Schedule or Send

- **To schedule:** Set date/time and click **Schedule**
- **To send immediately:** Click **Send Now**
- Target audience: All subscribers (no segment filtering needed for issue #1)

### 6. Post-Send

1. Check Beehiiv analytics after 1 hour for open rates
2. Monitor for bounces or spam complaints in the first 24 hours
3. Update the issue checkbox in GitHub issue #31

## File Reference

```
templates/newsletter/
├── email-template.html          # Reusable brand template ({{CONTENT}} placeholder)
├── issue-001-launch.md          # Issue #1 copy (markdown reference)
├── issue-001-launch.html        # Issue #1 ready-to-import HTML
└── welcome-sequence.md          # Welcome email sequence
```

## Notes

- Beehiiv API post creation is **Enterprise-only** — manual import is required
- The HTML uses inline styles and table layouts for email client compatibility
- `{{unsubscribe_url}}` is a Beehiiv merge tag — it auto-populates on send
- Brand colors: Teal `#0ff0e0`, Amber `#f5a623`, Dark `#09090b`
