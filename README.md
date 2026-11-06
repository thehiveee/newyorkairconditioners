# New York Air Conditioners — website redesign

Static multi-page site (plain HTML/CSS/JS — no build step).

| URL | File |
|---|---|
| `/` | `index.html` |
| `/air-conditioning` | `air-conditioning.html` |
| `/heating` | `heating.html` |
| `/refrigeration` | `refrigeration.html` |
| `/ventilation` | `ventilation.html` |
| `/privacy` | `privacy.html` (draft) |
| `/terms` | `terms.html` (draft) |
| any missing URL | `404.html` |

- Hero **Request a call back** form on every page (name, phone, service, optional message). Submits via [FormSubmit](https://formsubmit.co) to the address in the form's `action` attribute (currently `contact@nyc-airconditioner.com`); includes validation, spam honeypot, success/failure messages.
- `assets/site.js` — form handling, live NYC time in the banner, exit-intent offer + countdown (touch devices: shows once after 30 s)
- `assets/logo/` — transparent logo (SVG + PNG)
- `vercel.json` — clean URLs + basic headers
- `design/` — original Claude Design canvas artboards (reference only, not served)

## Deploy (Vercel)
Import this repo → Framework Preset **Other** → leave Build Command and Output Directory empty → Deploy.

## Launch checklist status

| # | Item | Status |
|---|---|---|
| 1 | Privacy policy | ✅ `/privacy` — **draft, needs owner/legal review** |
| 2 | Terms & conditions | ✅ `/terms` — **draft, needs owner/legal review** |
| 3 | Secrets off the frontend | ✅ none in code (form endpoint is a public email only) |
| 4 | Force HTTPS | ✅ Vercel redirects HTTP→HTTPS; HSTS header in `vercel.json` |
| 5 | Cookie consent | ✅ No cookies by default (Vercel Analytics is cookieless). If a GA4 ID is added, a consent banner gates it |
| 6 | Meta titles + descriptions | ✅ unique per page |
| 7 | Social preview image | ✅ `assets/og-image.png` (1200×630) + Open Graph/Twitter tags |
| 8 | Favicon | ✅ `.ico`, PNG, SVG, Apple touch icon, web manifest |
| 9 | Sitemap + robots.txt | ✅ `sitemap.xml`, `robots.txt` |
| 10 | Alt text | ✅ all images; decorative SVGs hidden from screen readers |
| 11 | Compress images | ✅ logos are SVG; PNGs optimised (largest 74 KB) |
| 12 | Page speed | ✅ Lighthouse performance 98–100 mobile, 100 desktop; CLS 0 |
| 13 | Colour contrast | ✅ axe-core: 0 violations on all pages, mobile + desktop (WCAG 2 AA) |
| 14 | Mobile friendly | ✅ responsive, 390px tested, no horizontal scroll, tap targets ≥24px |
| 15 | Custom 404 | ✅ `404.html` |
| 16 | Broken links | ✅ crawler: 0 broken internal links/anchors |
| 17 | Form validation | ✅ name/phone/service checks, length limits, clear errors |
| 18 | Spam protection | ✅ honeypot + 3-second time trap |
| 19 | Analytics | ✅ Vercel Web Analytics wired + call-click / form-submit events — **enable it in the Vercel dashboard** |
| 20 | One clear CTA | ✅ "Call now" is the single primary action; form is secondary; email links removed |

## Before launch
- Remove `<meta name="robots" content="noindex, nofollow">` from the 7 indexable pages (keeps the preview out of Google; Lighthouse SEO goes from 69 → ~100 once removed).
- Point the domain `nyc-airconditioner.com` at Vercel (social image, canonical and sitemap URLs use it).
- Vercel → project → **Analytics** → Enable. (Custom events like "Call click" need a Pro plan; page views work on all plans.)
- Form: the first submission emails a one-time FormSubmit activation link to `contact@nyc-airconditioner.com` — click it.
- Owner to review: privacy & terms drafts, **CLIENT TO CONFIRM** guarantees, `NYC15` offer terms, the three review placeholders.
- Optional: add a GA4 ID in `<meta name="ga4-id" content="">` on each page to turn on Google Analytics with consent.
