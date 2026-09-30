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

Items not yet displayed or still in preview:

| Item | Where |
|---|---|
| SBA WOSB certification — displayed as a design preview with a "Preview" tag; set `WOSB_CERTIFIED: true` in `assets/js/main.js` once SBA awards it | Credential bar, NAICS section, footer |
| NAICS 236118, 339950, 561790 and PSC 9905 remain "Target" (not on SAM profile); change `status--target` → `status--confirmed` once added | NAICS table |
| Email inquiry form — hidden until `CONTACT_EMAIL` is set in `assets/js/main.js`; phone 727-729-0204 is the primary contact | Contact |

## Capability Statement

Upload the final PDF as `files/capability-statement.pdf`. The site detects it automatically
and turns every "Capability Statement" button into a live download — no code changes.

## Custom domain (when ready)

In the repo: **Settings → Pages → Custom domain** → enter `nicolaholdingsgroup.com`, then
add the DNS records GitHub shows at your domain registrar. Enable **Enforce HTTPS** once it's available.
