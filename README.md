# Stephen Cheng CV

A React and Vite CV site for Stephen Cheng, including an ATS-readable tagged A4 PDF export.

## Requirements

- Node.js 24.x (`.nvmrc`)
- pnpm

## Commands

```sh
pnpm install --frozen-lockfile
pnpm dev                 # start the Vite development server
pnpm run check:data      # validate CV content and configured icons
pnpm run build           # type-check and create dist/
pnpm run pdf             # generate dist/Stephen_Cheng_CV.pdf
```

## Editing CV content

Edit [`src/data/cv.json`](src/data/cv.json). It is the single source of truth for profile details, skills, experience, education, and certifications.

- Use a known Lucide icon name for `{"type":"lucide","name":"..."}`.
- Use a configured local SVG id for `{"type":"svg","id":"..."}`.
- Run `pnpm run check:data` after content edits; it validates required fields, HTTPS links, and supported icon references.
- Keep experience statements accurate and measurable. Only include metrics and technologies you can substantiate.

## PDF export

The PDF generator serves the production build locally, renders it with Puppeteer, and adds document metadata with pdf-lib. Run `pnpm run build` before `pnpm run pdf` to ensure the PDF reflects current content.

The generated PDF is an artifact and is written to `dist/Stephen_Cheng_CV.pdf`; do not commit it unless publishing a deliberate release artifact.

## Deployment

Pushing `main` deploys the static site and generated PDF to GitHub Pages. Pull requests validate CV data and the production build.
