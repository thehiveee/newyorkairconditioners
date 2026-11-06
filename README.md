# New York Air Conditioners — website redesign

Multi-page redesign of nyc-airconditioner.com.

## Pages (`design/`)
- `Main.dc.html` — Home
- `AirConditioning.dc.html`, `Heating.dc.html`, `Refrigeration.dc.html`, `Ventilation.dc.html` — one page per service
- `canvas.json` — artboard layout index

These are Design-canvas artboards (`.dc.html`), authored in the Claude Design artifact. They reference the logo via an artifact-hosted `/_blob/…` URL; the same files are in `assets/logo/` (SVG + transparent PNG).

## Features
- Call-first CTAs (pulsing call button; "Get a quote" demoted to a text link)
- Sticky bottom banner with live NYC time, urgency copy and Call now button
- Exit-intent 15% off pop-up (code `NYC15`); on touch devices it appears once after 30 s
- Motion graphics and scroll/hover animations (respects `prefers-reduced-motion`)
- Palette from the logo: blue `#3539B5`, orange `#F44817`, snow blue `#0F82C7`

## To confirm with the client
Guarantee placeholders (satisfaction guarantee, upfront pricing, [X]-year labor warranty), offer terms, real Google reviews, licence number.
