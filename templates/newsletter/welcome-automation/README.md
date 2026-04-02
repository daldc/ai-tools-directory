# Beehiiv Welcome Automation Sequence

A 3-email automated welcome sequence for new subscribers to **The AI Marketing Stack** newsletter. Configured as a Beehiiv automation triggered on new subscription.

## Sequence Overview

| Email | Trigger | Subject | Goal |
|-------|---------|---------|------|
| 1 | Immediate | Welcome + here's your free cheat sheet | Deliver lead magnet, set expectations |
| 2 | Day 2 | 3 AI tools your competitors are sleeping on | Showcase directory value, drive traffic |
| 3 | Day 5 | The $19 template that saves 30 min per campaign | Introduce UTM Builder, convert to paid |

## Beehiiv Setup Instructions

1. Go to **Automations** → **Create New Automation**
2. Trigger: **New Subscriber** (all subscribers)
3. Add each email as a step in the sequence with the specified delays
4. Enable **Smart Send** if available (respects subscriber timezone)
5. Set sequence to **Active** after review

## File Structure

- `email-1-welcome.md` — Immediate: Welcome + lead magnet download
- `email-2-tool-spotlight.md` — Day 2: Featured AI tools + directory link
- `email-3-utm-builder.md` — Day 5: UTM Builder product intro + case study

## Notes

- All links should use UTM parameters for tracking (provided in templates)
- Lead magnet link points to Gumroad free download
- UTM Builder link points to Gumroad $19 product
- Directory link points to the live Vercel deployment
- Update placeholder URLs before going live if domains change
