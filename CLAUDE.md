# CLAUDE.md

Guidance for working with this repository (Langwieser IT-Services e.U.).

## Project Overview

Static website for Langwieser IT-Services e.U. (Steyr, Austria): B2B IT consulting (Nintex K2, Microsoft Power Platform / Power BI, SQL) plus Privatkunden IT-Hilfe with transparent prices (inkl. 20 % USt).

## Architecture

**Static one-page site** — no build system, bundler, or package manager. Shared CSS/JS across pages.

### Files
- `index.html` — Full-bleed one-page: Hero, Leistungen Unternehmen, Leistungen Privatkunden (Preise), Über mich (`#ueber-mich`), Kontakt
- `about.html` — Redirect only → `index.html#ueber-mich` (keeps old links working)
- `impress.html` — Impressum (Austrian legal requirement; keep this filename)
- `datenschutz.html` — Datenschutz
- `base.css` — Design tokens, resets, shared layout primitives
- `styles.css` — Page/component styles (one-page + legal pages)
- `script.js` — Theme, i18n (`data-i18n` + central `translations`), nav, form, SEO meta updates
- `robots.txt`, `sitemap.xml`, `favicon.svg`, `profile.jpg`

### Shared Patterns
- **Theme**: `data-theme` (`light`/`dark`), `localStorage.theme`, blocking script in `<head>` to avoid flash; falls back to `prefers-color-scheme`
- **i18n**: Single system — `data-i18n` attributes + `translations` in `script.js`; `localStorage.lang` (default DE); Siezen throughout
- **CSS**: Variables in `base.css` / `styles.css`; full-bleed sections on the one-page
- **Forms**: Formspree on Kontakt (`index.html`)

### Key Features
- Dark/light mode toggle
- Bilingual DE/EN
- Responsive nav (dropdown Leistungen → B2B / Privat)
- Accessibility: skip link, ARIA, keyboard focus
- SEO: meta, OG/Twitter, JSON-LD ProfessionalService, sitemap, hreflang

### Domain
All URLs use `https://langwieser-its.at/`.

## Development

```bash
python3 -m http.server 8080
# open http://localhost:8080/
```

Or open HTML files directly in a browser.

## Editing Guidelines
- Styles: `base.css` (tokens) + `styles.css` (components)
- Behavior/i18n: `script.js` — add keys to both `de` and `en` in `translations`
- Do not restore a separate long `about.html`; content lives in `#ueber-mich` on the one-page
- Leave `.github/workflows` as-is unless deploy pipeline changes are intentional
