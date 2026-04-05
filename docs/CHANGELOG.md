# Changelog

All notable changes to this project will be documented in this file.

## [2026-04-05]

### Fixed
- Removed dead dependency `motion` from `dependencies` (never imported, ~12 MB saved)
- Removed duplicate `vite` from `dependencies` (kept in `devDependencies` only)
- Deleted dead code `src/shared/constant/routes.ts` and its barrel re-export (ROUTES, PRIVATE_ROUTES never consumed)
- Removed dead `#modules` path alias from `tsconfig.json` and `alias.ts` (directory `src/modules/` does not exist)
- Fixed all 6 ESLint warnings:
  - Replaced array index keys with stable identifiers (company name, skill title, cert title) in Chronicle, Sidebar, Credentials
  - Suppressed index key for static bullet arrays with inline eslint-disable comment
  - Removed `console.warn` from render path in `IconRenderer.tsx` (react/purity rule)
  - Fixed import order and if-newline style in `IconRenderer.tsx`
- Deleted duplicate `public/avatar.jpg` (identical to `src/data/my-pic.jpg`, 227 KB saved)
- Fixed CI deploy workflow: Node version now reads from `.nvmrc` instead of hardcoded `20`
- Fixed CI deploy workflow: Changed `--no-frozen-lockfile` to `--frozen-lockfile` for reproducible builds
- Added `timeout-minutes: 10` to both CI workflow jobs (deploy + check)
- Bumped package version from `0.0.0` to `1.0.0`

### Files Created
- `.agent/issue_report_2026-04-05_22-51.md` — 11 verified issues (0 Critical, 3 High, 5 Medium, 3 Low)
- `.agent/feature_report_2026-04-05_22-51.md` — 10 feature suggestions across 5 categories
- `docs/CHANGELOG.md` — This file

### Files Modified
- `package.json` — Removed `motion`, duplicate `vite`; bumped version
- `src/shared/constant/index.ts` — Removed dead routes re-export
- `src/shared/constant/alias.ts` — Removed `#modules` alias
- `tsconfig.json` — Removed `#modules` path mapping
- `src/components/Chronicle.tsx` — Stable React keys + eslint-disable for bullets
- `src/components/Credentials.tsx` — Stable React keys (cert.title)
- `src/components/Sidebar.tsx` — Stable React keys (group.title, skill.title)
- `src/components/ui/IconRenderer.tsx` — Removed console.warn from render; fixed import order
- `.github/workflows/deploy.yml` — Node version from .nvmrc, frozen-lockfile, timeout
- `.github/workflows/check.yml` — Added timeout-minutes

### Files Deleted
- `src/shared/constant/routes.ts` — Dead code (never imported)
- `public/avatar.jpg` — Duplicate of `src/data/my-pic.jpg`
