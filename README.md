# ADI WEBDEVELOPER website

A responsive, dark premium-style independent web developer website built with HTML, CSS, and vanilla JavaScript.

## Project structure

- `index.html` — main page and Netlify Forms inquiry form
- `style.css` — visual design, responsive layouts, and reduced-motion support
- `script.js` — mobile navigation, WhatsApp link generation, social-link configuration, scroll states, reveals, and form validation
- `thank-you.html` — form destination after Netlify accepts a submission
- `assets/favicon.svg` — editable SVG favicon
- `netlify.toml` — Netlify publish directory and basic response headers
- `robots.txt` / `sitemap.xml` — SEO crawl guidance (update the placeholder domain)

## Run locally

For a quick visual preview, open `index.html` in a browser. For a more realistic local server, use VS Code's Live Server extension or run `python -m http.server 8000` in this folder and visit `http://localhost:8000`.

**Note:** Netlify Forms will not process submissions when the page is opened as a local file or served by a basic local server. Deploy to Netlify and submit a test form after deployment.

## Deploy on Netlify

1. Extract the ZIP.
2. Create a new site in Netlify and deploy the folder containing `index.html` (or connect a Git repository containing these files).
3. The publish directory is `.` as set in `netlify.toml`.
4. Netlify detects the static form because `index.html` includes `data-netlify="true"` and a hidden `form-name` field. Keep the form in the HTML at build time; do not create it only with JavaScript.
5. After the first deploy, open Netlify **Forms** and check that `website-inquiry` is detected. If the form is not detected, trigger a new deploy after confirming form detection is enabled in site settings.
6. Submit a test inquiry on the live site and confirm the submission appears in Netlify Forms. Configure notification emails in Netlify's form settings if you want submissions forwarded to an inbox.
7. Check spam protection. The included honeypot is a basic measure; consider enabling Netlify's supported spam filtering/captcha if spam becomes a problem.

The thank-you page is shown after the browser submits the form to Netlify. It is not a JavaScript-only fake success state.

## Update WhatsApp and contact details

Open `script.js` and edit the `SITE_CONFIG` object at the top. WhatsApp is currently set to `917780078796` (India country code 91 plus the supplied number). The email shown on the page is `rajadigupta251@gmail.com`; update the mail links in `index.html` too if it changes.

## Add Instagram or LinkedIn

In `script.js`, replace the empty `instagramUrl` and `linkedinUrl` strings with the actual verified full HTTPS profile URLs. The floating LinkedIn button is hidden unless a valid LinkedIn URL is configured. The current page does not invent social profiles. If you want Instagram displayed in the contact section/footer, add an anchor there after supplying the verified URL; the configuration is ready for use.

## Update pricing and service details

Prices are intentionally not fabricated. Edit the three `.price-card` blocks in `index.html` after you decide what each package includes and costs. Update the `data-wa-message` text if you change the package names or inquiry wording.

## SEO launch tasks

Before going live:
- Replace `YOUR-DOMAIN.example` in canonical and Open Graph tags in `index.html`.
- Replace the domain in `robots.txt` and `sitemap.xml`.
- Add a real social preview image at `assets/social-preview.png` or update `og:image` to an image that exists.
- Confirm the final page title and meta description.
- Connect the custom domain in Netlify and configure HTTPS.
- If you use a custom favicon, replace `assets/favicon.svg`.
- Add Google Search Console after the domain is live and submit the sitemap.

## Custom domain

In Netlify, open **Domain management** → **Add a domain** and follow the DNS instructions for your registrar. Wait for DNS and HTTPS provisioning to complete, then update the canonical URL, Open Graph URL/image, `robots.txt`, and `sitemap.xml`.

## Pre-launch checklist

- [ ] Deploy to Netlify and confirm the site loads over HTTPS.
- [ ] Confirm `website-inquiry` appears under Netlify Forms.
- [ ] Submit a real test inquiry and confirm it appears in Netlify.
- [ ] Configure form notification emails.
- [ ] Test WhatsApp links on a phone with WhatsApp installed.
- [ ] Add verified Instagram / LinkedIn profile URLs, or leave them hidden.
- [ ] Replace domain placeholders and add a real social preview image.
- [ ] Test the menu, keyboard focus, FAQ accordions, and form validation.
- [ ] Check 320px, 360px, 375px, 390px, 430px, 768px, 1024px, and desktop widths.
- [ ] Test reduced-motion settings and at least one Android device.
- [ ] Run Lighthouse after deployment; no scores are claimed before testing.
