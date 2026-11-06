# Goshen Habitat

Vite multi-page architecture and construction portfolio. The existing routes are preserved.

```sh
npm install
npm run dev
npm run check
npm run build
npm run preview
```

## Editing

- `scripts/render-pages.mjs`: shared navigation, footer, homepage, studio, portfolio and project templates.
- `src/content/projects.json`: project facts, narrative sections and available media. Narrative HTML is trusted, repository-owned content.
- `src/content/studio.json`: company information and team biographies.
- `src/content/project-history.html`: retained historical project record.
- `src/content/images.json`: intrinsic image sizes and WebP variants in `public/img/optimized/`.
- `src/style.css`: responsive editorial design system, animations and reduced-motion behaviour.
- `src/main.js`, `src/gallery.js`: native navigation dialogs, reveals and image galleries.

The HTML pages are generated and committed for direct inspection. `predev` and `prebuild` regenerate them; after editing content during an active dev session, run `node scripts/render-pages.mjs`.

## Media and content

Mowe and Monrovia media are identified as architectural visualizations. Construction imagery is labelled as archive photography. Unrelated external imagery and unavailable local gallery entries are excluded; projects without available imagery retain text profiles. Original source images and videos are retained. The pre-existing deleted files have not been restored or replaced with unrelated assets.

Company statistics and placeholder portraits are not used. Project facts and historical notes come from the existing repository and have not been independently certified. In particular, historical project dates and status notes should be reviewed by the company before publication.

Contact actions use email, telephone and WhatsApp links; there is no form backend. The site introduces no new runtime dependencies.

The homepage and Studio page share the complete four-person team section. Hero photography is a credited third-party architectural inspiration image; see `src/content/media-credits.md` for its source.
