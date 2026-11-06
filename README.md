# New York Air Conditioners — website redesign

Static multi-page site (plain HTML/CSS/JS — no build step).

| URL | File |
|---|---|
| `/` | `index.html` |
| `/air-conditioning` | `air-conditioning.html` |
| `/heating` | `heating.html` |
| `/refrigeration` | `refrigeration.html` |
| `/ventilation` | `ventilation.html` |

- `assets/site.js` — live NYC time in the banner, exit-intent offer + countdown (touch devices: shows once after 30 s)
- `assets/logo/` — transparent logo (SVG + PNG)
- `vercel.json` — clean URLs + basic headers
- `design/` — original Claude Design canvas artboards (reference only, not served)

## Deploy (Vercel)
Import this repo → Framework Preset **Other** → leave Build Command and Output Directory empty → Deploy.

## Before launch
- Remove `<meta name="robots" content="noindex, nofollow">` from the 5 pages (it keeps the preview out of Google).
- Confirm the yellow **CLIENT TO CONFIRM** guarantee placeholders, offer terms for code `NYC15`, and replace the three `[Paste a real Google review]` cards.
- Add the licence number if wanted; point the domain at Vercel.
