# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for Langwieser IT-Services e.U., an Austrian IT consulting business specializing in Nintex K2, Power Platform, and digitalization services for enterprises and small businesses.

## Architecture

**Static HTML site** - No build system, bundler, or package manager. Uses external CSS and JavaScript files shared across all pages.

### Files
- `index.html` - Main landing page with hero, services, about preview, and contact form
- `about.html` - Detailed about/profile page with skills grid and values section
- `impressum.html` - Legal notice (German legal requirement)
- `datenschutz.html` - Privacy policy (German legal requirement)
- `styles.css` - **Shared stylesheet** for all pages (includes page-specific styles)
- `script.js` - **Shared JavaScript** for theme, language, navigation, and form handling
- `favicon.svg` - SVG favicon
- `profile.jpg` - Profile photo

### Shared Patterns

- **External CSS**: `styles.css` contains all styling including CSS variables, theming, page-specific styles, and accessibility focus styles
- **External JavaScript**: `script.js` handles theme toggle, language switching, navigation, scroll effects, form submission, and ARIA attribute management
- **Inline translations**: Each HTML file contains a `translations` object with `en`/`de` keys for i18n
- **CSS variables** in `:root` and `[data-theme="dark"]` for theming (defined in styles.css)
- **i18n system** using `data-i18n` attributes and page-specific `translations` objects

### Key Features
- **Dark/light mode**: Toggle via `.theme-toggle` button, persisted to `localStorage`
- **Bilingual (EN/DE)**: Language toggle via `.lang-toggle`, persisted to `localStorage`, auto-detects browser language
- **Responsive design**: Mobile navigation with hamburger menu, CSS media queries
- **Accessibility**: WCAG-compliant with skip links, ARIA attributes, keyboard navigation, and focus management

### Design System
Google-inspired color palette defined as CSS variables:
- `--google-blue: #4285f4`
- `--google-red: #ea4335`
- `--google-yellow: #fbbc05`
- `--google-green: #34a853`

Typography:
- Display font: `Instrument Serif`
- Body font: `DM Sans`

### Accessibility Features

The site follows WCAG 2.1 AA standards with the following implementations:

**Keyboard Navigation:**
- Skip to main content link (`.skip-link`) - appears on focus, jumps to `#main-content`
- Enhanced focus-visible styles on all interactive elements using Google Blue with 2px outline
- Escape key closes mobile menu and returns focus to menu toggle

**ARIA Attributes:**
- `aria-hidden="true"` on decorative elements (shapes, icons)
- `aria-pressed` on language toggle buttons (dynamically updated)
- `aria-expanded` on mobile menu toggle (dynamically updated)
- `aria-controls` linking menu button to nav links
- `aria-label` on buttons (theme toggle, menu toggle)
- `role="group"` with `aria-label` on language selection

**Screen Reader Support:**
- `.visually-hidden` class for screen-reader-only text
- Semantic HTML structure with proper heading hierarchy
- Form labels and error handling

**Content Readability:**
- Increased max-width to 1400px for better readability
- WCAG AA compliant color contrast ratios (4.5:1 minimum for normal text)
- Accessible text color variants (`--google-*-text`) for Google brand colors used as text
- Proper contrast in contact section with dark background
- H1 appears first in DOM structure before other content (visual order maintained with flexbox)
- Smooth scroll behavior with `scroll-behavior: smooth`

## Development

Open any `.html` file directly in a browser. No server required for basic viewing.

For testing with proper localhost behavior (e.g., localStorage):
```bash
python -m http.server 8000
# or
npx serve .
```

## Contact Form

The contact form on `index.html` uses [Formspree](https://formspree.io) for handling submissions. The form ID is configured in the form's `action` attribute. Submissions are sent to the email associated with the Formspree account.

## Editing Guidelines

### Styles and Scripts
- **Styles**: Edit `styles.css` to update styling across all pages. Page-specific styles are included with appropriate class scoping.
- **JavaScript**: Edit `script.js` to update functionality across all pages (theme, language, navigation, form handling, ARIA management).
- **No duplication needed**: Changes to CSS/JS automatically apply to all pages.
- **Accessibility**: When adding new interactive elements, ensure proper ARIA attributes, keyboard navigation, and focus styles are included.

### Translations
- **Page-specific**: Each HTML file has its own inline `<script>` block with a `translations` object.
- When adding translations, add keys to both `en` and `de` objects in the relevant page's `translations` constant.

### Page-Specific Styles in styles.css
- **Index page**: Uses `.hero`, `.services`, `.contact`, etc.
- **About page**: Uses `.about-header`, `.skills-grid`, `.skill-card`, `.values-section`, `.cta-section`
- **Legal pages** (impressum, datenschutz): Use `main`, `.info-block`, `.highlight-box`, `.back-link`
- **Footer**: Light footer by default, dark footer for index.html (`.contact + footer`)
