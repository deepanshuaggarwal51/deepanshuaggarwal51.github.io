# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static personal academic website for Deepanshu Aggarwal (theoretical condensed matter physicist, IIT Delhi). Deployed via GitHub Pages directly from the `main` branch — no build step, no static site generator.

## Development

No build, lint, or test commands. Open any `.html` file in a browser to preview. Changes pushed to `main` are live immediately on GitHub Pages.

## Architecture

- **Pure static site**: HTML pages + one CSS file (`css/sphinx.css`) + one JS file (`js/site.js`)
- **Pages**: `index.html` (home), `about.html`, `publications.html`, `education.html`, `news.html`, `skiils.html` (note: filename is intentionally misspelled)
- **Styling**: Single stylesheet `css/sphinx.css` handles all pages. Uses Google Fonts (Playfair Display, Inter, JetBrains Mono) and Font Awesome 6.5 icons via CDN
- **Layout**: Sidebar navigation pattern shared across all pages (duplicated in each HTML file, not templated)
- **No dependencies**: No package.json, no bundler, no framework
