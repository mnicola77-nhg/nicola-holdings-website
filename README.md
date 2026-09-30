# Nicola Holdings Group

Official website repository for Nicola Holdings Group, LLC.

**Website:** NICOLAHOLDINGSGROUP.COM
**Hosting:** GitHub Pages (static site — no build step, no backend)

## Structure

```
/
  index.html                 Single-page site (all sections)
  404.html                   Not-found page
  favicon.ico, site.webmanifest, robots.txt, sitemap.xml, .nojekyll
  assets/
    css/styles.css           All styles; brand palette tokens at the top
    js/main.js               Nav, scroll effects, capability-statement check, contact form
    images/
      brand/                 Web-optimized logos (transparent PNG + WebP)
        nhg-logo-primary.*     Primary logo — dark backgrounds (footer)
        nhg-logo-horizontal.*  Secondary logo — light backgrounds (header)
        nhg-mark.*             NH submark
        source/                Original brand files as delivered (do not edit)
      favicon-*.png, apple-touch-icon.png, icon-*.png, og-image.jpg
  files/
    capability-statement.pdf (add when finalized)
```

## Brand

Charcoal `#1A1A1A` · Beige `#D9C9B1` · Cream `#F6F1EA` · Gold `#C9A96A` · Stone `#8A8A8A`
Display type: Cormorant Garamond · Body/labels: Jost (Google Fonts).
Logos are used as delivered — only cropped, resized, and given transparent backgrounds.

## Placeholders still requiring verified information

Every unverified value in `index.html` is marked with `data-placeholder="..."`.
Search for `data-placeholder` to find them all:

| Item | Where |
|---|---|
| UEI | Credential bar, footer |
| CAGE Code | Credential bar, footer |
| Ownership status (e.g., woman-owned; SBA certification only once awarded) | Credential bar |
| Primary NAICS | Credential bar |
| SAM.gov registration status | NAICS section |
| Certifications | NAICS section |
| NAICS/PSC status — all currently "Target"; change `status--target` → `status--confirmed` once on SAM | NAICS table |
| Marina Nicola's title | About |
| Headquarters city/state | About |
| Affiliated real estate brokerage name | Real Estate / REO |
| Business email, phone, mailing address | Contact |
| Contact form inbox — set `CONTACT_EMAIL` in `assets/js/main.js` | Contact |

## Capability Statement

Upload the final PDF as `files/capability-statement.pdf`. The site detects it automatically
and turns every "Capability Statement" button into a live download — no code changes.

## Custom domain (when ready)

In the repo: **Settings → Pages → Custom domain** → enter `nicolaholdingsgroup.com`, then
add the DNS records GitHub shows at your domain registrar. Enable **Enforce HTTPS** once it's available.
