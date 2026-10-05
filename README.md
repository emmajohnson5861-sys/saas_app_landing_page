# Algofort SaaS landing page

Run `npm install` then `npm run dev`. Open http://127.0.0.1:3000 or /lp/saas-app-development.

- `src/styles/tokens.css`: central brand colors, sizing, spacing and typography tokens.
- `src/styles/dashboard.css`: responsive interactive dashboard styles.
- `src/styles/hero-sun.css`: code-built hero ring with gradient shading, thin rims and static glow. No ring image is loaded. Lighting is clipped above the dashboard.
- `src/config/hero-motion.ts`: hero entrance and scroll rotation settings. Ring dimensions, rim width and glow opacity use `--alp_sun-*` tokens in `src/styles/tokens.css`.
- `src/config/saas.ts`: marketing copy, navigation and CTA configuration.
- `src/config/dashboard.ts`: typed sample projects, team, invoices, chart periods and activity.
- `src/config/brand-showcase.ts`: replaceable fictional logo names and vector mark choices.
- `src/config/motion.ts`: shared heading, paragraph and smooth-scroll motion settings.
- `src/config/ending.ts`: client feedback summaries and footer contact/navigation details.
- `src/components/InteractiveDashboard.tsx`: working tabs, keyboard navigation, search, project creation and completion, team role changes, chart filters and points, plan selection, invoice CSV export, settings, notifications and opt-in live sample events.

All authored classes use `alp_`. Marketing content is server rendered with client components for the dashboard, galleries, sliders and motion. Inter and Plus Jakarta Sans are self-hosted through `next/font`. GSAP SplitText reveals section headings by character and paragraphs by line as they enter the viewport. Paragraphs re-split on responsive changes. The hero uses staggered entrance and scroll effects. The logo carousel uses one CSS transform track and pauses offscreen, in background tabs or on hover. Reduced-motion preferences keep content static and readable. Live sample updates run only when enabled, visible and in a foreground browser tab.

This is a local interactive product demonstration. Changes stay in React memory and reset on reload; no billing, emails or external account changes occur. Sample metrics are not client results. Connect a verified backend separately if production data persistence is needed.

The page includes the hero, introductory product blueprint, capabilities, product experience, portfolio, client stories and footer. Portfolio concepts and showcase logos are illustrative; replace them with approved assets before publishing. CTAs point to the existing Algofort site. Configure canonical/social metadata and indexing before launch. Validation: `npm run lint`, `npm run typecheck`, `npm run build`.
