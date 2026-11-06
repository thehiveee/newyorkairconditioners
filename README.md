# New York Air Conditioners — website redesign

Static multi-page site (plain HTML/CSS/JS — no build step).

| URL | File |
|---|---|
| `/` | `index.html` |
| `/air-conditioning` | `air-conditioning.html` |
| `/heating` | `heating.html` |
| `/refrigeration` | `refrigeration.html` |
| `/ventilation` | `ventilation.html` |

- Hero **Request a call back** form on every page (name, phone, service, optional message). Submits via [FormSubmit](https://formsubmit.co) to the address in the form's `action` attribute (currently `contact@nyc-airconditioner.com`); includes validation, spam honeypot, success/failure messages.
- `assets/site.js` — form handling, live NYC time in the banner, exit-intent offer + countdown (touch devices: shows once after 30 s)
- `assets/logo/` — transparent logo (SVG + PNG)
- `vercel.json` — clean URLs + basic headers
- `design/` — original Claude Design canvas artboards (reference only, not served)

## Deploy (Vercel)
Import this repo → Framework Preset **Other** → leave Build Command and Output Directory empty → Deploy.

## Before launch
- **Activate the form:** the first submission makes FormSubmit email a one-time confirmation link to the recipient address — click it, then leads flow. To change the recipient, edit the `action="https://formsubmit.co/…"` on the form in each page.
- Remove `<meta name="robots" content="noindex, nofollow">` from the 5 pages (it keeps the preview out of Google).
- Confirm the yellow **CLIENT TO CONFIRM** guarantee placeholders, offer terms for code `NYC15`, and replace the three `[Paste a real Google review]` cards.
- Add the licence number if wanted; point the domain at Vercel.
