# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal website for Deepanshu Aggarwal — Research Scientist at ParaScalr Inc. (ML for semiconductor device simulation) and PhD in condensed matter physics from IIT Delhi. Deployed via GitHub Pages directly from the `main` branch — no build step, no static site generator.

## Development

No build, lint, or test commands. Open any `.html` file in a browser to preview. Changes pushed to `main` are live immediately on GitHub Pages.

## Architecture

- **Jekyll on GitHub Pages**: Site uses Jekyll for templating — GitHub Pages builds it automatically on push. No local build step required.
- **Layout**: `_layouts/default.html` wraps all pages. Shared partials in `_includes/` (head, nav, footer, page-scripts).
- **Pages**: `index.html`, `about.html`, `publications.html`, `education.html`, `news.html`, `skiils.html`, `github.html` — each has YAML front matter (`layout`, `title`, `description`, `nav_id`) and only unique content.
- **Styling**: Single stylesheet `css/sphinx.css`. Google Fonts + Font Awesome 6.5 via CDN.
- **Nav active state**: Driven by `page.nav_id` in front matter — set in `_includes/nav.html` via Liquid conditionals.
- **Page-specific scripts**: Dispatched via `_includes/page-scripts.html` based on `page.nav_id` (publications, github, news).

## Gotchas

- **`skiils.html`** is intentionally misspelled in the filename. Do not rename it (would break existing links).
- **To add a new page**: Create an HTML file with front matter (`layout: default`, `nav_id: xxx`), add a nav entry in `_includes/nav.html`, and if it needs scripts, add a conditional in `_includes/page-scripts.html`.

## Theme system

Light/dark mode uses three layers:
1. `:root` defines light palette (default)
2. `@media (prefers-color-scheme: dark)` overrides with dark palette
3. `[data-theme="dark"]` on `<html>` for manual toggle (set via JS + localStorage)

There is no `[data-theme="light"]` block — toggling to light removes the `data-theme` attribute, falling back to `:root` defaults. The dark variable block is necessarily duplicated (media query + attribute selector can't be combined in vanilla CSS).

Hero hex-bg SVG has hardcoded stroke colors in data URIs (can't reference CSS variables), so it's duplicated per theme.

## CSS patterns

- **Shared card base**: `.focus-card`, `.role-card`, `.skill-card` share background/border/radius/hover via a combined selector. Each adds only its own padding.
- **Heading color**: Use `var(--heading)` not hardcoded `#f0ead8` or `#1a1a1a`.
- **Theme-aware colors**: Always use CSS variables (`var(--text)`, `var(--surface)`, etc.), never raw hex values in component styles.

## Dynamic content

- **Publications** (`publications.html`): Fetches from ORCID API, enriches with CrossRef (authors, DOI, volume/issue, citation count, abstract). APS journals (Phys. Rev. B) don't provide abstracts via CrossRef; IOP journals do.
- **GitHub repos** (`github.html`): Fetches from GitHub API, shows up to 12 non-fork repos sorted by push date.
- **Footer year**: Auto-updated via `js-year` class and `site.js`.
