# Server Administration Guides

A curated collection of practical field guides based on real remote server administration experience, rewritten for safe public sharing.

This repository is designed to serve two purposes:

- A personal knowledge base you can return to for repeatable operational workflows
- A public reference others can browse for practical Linux, VPS, cPanel, Laravel, and incident-response guidance

## Overview

The site is a static HTML documentation set with a homepage and a set of standalone guide pages.

Main topics currently covered:

- Remote server management basics
- Live performance investigation on a production VPS
- SSH and server security hardening
- cPanel / WHM incident response
- Post-`.env` Laravel deployment operations

## Site Structure

```text
ops-field-guides/
├── index.html
├── README.md
├── assets/
│   ├── theme.css
│   ├── theme-init.js
│   └── theme-toggle.js
├── pages/
│   ├── remote-server-management.html
│   ├── performance-investigation.html
│   ├── server-security-hardening.html
│   ├── cpanel-auth-bypass.html
│   └── post-env-edit-commands.html
└── secrets/
```

## Guide Index

- [Home / Site Map](./index.html)
- [Remote Server Management](./pages/remote-server-management.html)
- [Performance Investigation](./pages/performance-investigation.html)
- [Server Security Hardening](./pages/server-security-hardening.html)
- [cPanel/WHM Auth Bypass Incident Response](./pages/cpanel-auth-bypass.html)
- [Post-.env Edit Commands](./pages/post-env-edit-commands.html)

## Design Notes

The documentation is intentionally built as plain static HTML so it can be:

- Hosted easily on GitHub Pages
- Opened locally without a build step
- Kept portable and dependency-light
- Edited directly in any text editor or IDE

Shared presentation assets live in `assets/`:

- `theme.css`: shared light/dark theme rules and common UI polish
- `theme-init.js`: restores saved theme preference before paint
- `theme-toggle.js`: handles the global theme toggle interaction

## Theme System

Every page supports a shared light/dark theme toggle.

Features:

- Theme preference is saved in `localStorage`
- The selected theme persists across pages
- Each guide includes a Home link back to `index.html`
- Shared CSS overrides keep the visual system consistent across the full site

## Privacy and Sanitization

This public version has been sanitized to remove environment-specific identifiers and reduce exposure of personal or operational details.

Examples of what was generalized:

- Real domains replaced with placeholders such as `vps01.example.net`
- Real application hostnames replaced with generic examples such as `portal-app.example.net`
- Real usernames replaced with examples like `adminuser`, `adminops`, and `appuser`
- Real IP addresses replaced with documentation-safe example addresses such as `203.0.113.10`
- Real server paths normalized into generic but still realistic examples

The goal is to preserve operational usefulness while avoiding accidental disclosure of personal infrastructure details.

## Local Private Overrides

The published HTML stays generic on purpose, but the site also supports a local-only secret override layer.

How it works:

- Each page loads `assets/private-values-loader.js`
- That script looks for `secrets/private-values.json`
- If the JSON file exists locally, its replacement rules are applied after page load
- If the file does not exist, nothing breaks and the generic public values remain visible

The private file is intentionally ignored by Git:

```text
secrets/private-values.json
```

This lets you keep the public repository safe while still viewing the guides locally with your own real hostnames, usernames, and environment-specific values.

### Important

Because the override file is loaded with `fetch()`, use a local HTTP server when testing locally instead of opening the HTML directly with `file://`.

## Local Preview

Because the site is static HTML, you can preview it in several simple ways.

### Option 1: Open directly

Open `index.html` in your browser.

### Option 2: Serve locally

If you prefer a local HTTP server:

```bash
cd /path/to/server-administration
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## License / Usage

Use this repository as a personal operational handbook, a portfolio artifact, or a public learning resource.
