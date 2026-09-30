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
    capability-statement.pdf  Published capability statement
  source/capability-statement/  Editable capability statement source, fonts, build script
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
| NAICS 339950 and PSC 9905 remain "Target" (not on SAM profile). 236118 and 561790 are shown as Confirmed while being added to SAM — verify they appear on the SBA profile before launch | NAICS table |
| Email inquiry form — hidden until `CONTACT_EMAIL` is set in `assets/js/main.js`; phone 727-729-0204 is the primary contact | Contact |

## Capability Statement

- Published PDF: `files/capability-statement.pdf` (linked from the header, credential bar, and contact section).
- Editable source: `source/capability-statement/capability-statement.html` (same fonts, palette, and logo files as the site).
- Rebuild after edits: `python source/capability-statement/build.py`. This writes the site PDF, a named copy
  (`Nicola-Holdings-Group-Capability-Statement.pdf`), and a 300 dpi preview PNG, and fails if content overflows one page.
- WOSB: shows the same "Preview" tag as the website. When SBA certification is awarded, set
  `WOSB_CERTIFIED: true` in `assets/js/main.js` **and** rebuild the PDF with `--final`.

## Custom domain (when ready)

In the repo: **Settings → Pages → Custom domain** → enter `nicolaholdingsgroup.com`, then
add the DNS records GitHub shows at your domain registrar. Enable **Enforce HTTPS** once it's available.
