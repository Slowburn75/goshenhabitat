# Refinement validation

- `npm run check`: passed on all 16 routes. Checks headings, main landmarks, descriptions, duplicate IDs, image alternatives, local media, local routes and fragment links.
- `npm run build`: passed with no build warnings.
- Production browser checks at 320px: all 16 routes loaded without horizontal overflow.
- Additional homepage, studio, portfolio and project-detail checks at 768px, 1440px and 1920px: no horizontal overflow or overlapping hero footer/content.
- Homepage visually reviewed on desktop and mobile, including the project showcase, services and orange contact section. Lazy-loaded homepage images were brought into view and confirmed loaded.
- Mobile navigation: open, Escape close, expanded-state reset and focus return verified.
- Services: native details expansion and visible contextual description verified.
- Gallery: opening an image, close-button focus, Escape close and focus return to the originating image button verified.
- Reduced-motion emulation: hero animation disabled and all reveal content visible.
- Contact email, telephone and WhatsApp destinations inspected; no messages sent.

Browser checks used the local Vite production preview. No public deployment or formal Lighthouse score is claimed. Project facts are retained from repository content; they have not been independently verified. Unavailable imagery is omitted rather than replaced by unrelated photography.

## Team restoration and hero update

- Restored all four original team members and biographies on the homepage and Studio page using one shared template.
- Added direct Our team navigation and footer links.
- Replaced the hero with responsive, locally hosted WebP versions of Joel Filipe’s architectural photograph, with a visible source credit.
- Visually reviewed the desktop hero and team section; checked responsive team stacking at 390px and no horizontal overflow at 320px.
