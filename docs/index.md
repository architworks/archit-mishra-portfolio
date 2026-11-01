# Personal Portfolio - Documentation Home

These docs explain how the portfolio is put together and where to change things. The site belongs to Archit Mishra, a data scientist and photographer, and it was rebuilt from the design system described in `DESIGN.md`.

The project is a Next.js 15 App Router application. Long-form project writeups are MDX files, short site copy lives in one TypeScript file, and photographs come from a Google Drive folder at request time.

If you want to get productive fast, jump straight to:

- [Getting Started](getting-started.md) &mdash; Dev environment, scripts, and project layout.
- [Architecture Tour](architecture.md) &mdash; How routing, data loading, and components fit together.
- [Content Management](content.md) &mdash; Update projects, site copy, photographs, and metadata.
- [Customization Playbook](customization.md) &mdash; Theming, new sections, and deployment guidance.

## Where things live

- **Site copy:** `src/data/site.ts`
- **Design tokens:** `src/app/globals.css`
- **Component styles:** `src/app/design-system.css`
- **Projects:** `content/projects/*.mdx`

## Tech at a glance

- **Framework:** Next.js 15.5 with the App Router and React 19.
- **Language:** TypeScript with strict mode.
- **Styling:** CSS custom properties and hand-written `am-*` component classes, on top of Tailwind CSS v4's base layer.
- **Motion:** CSS transitions and the Web Animations API, with no animation library. Every effect has a `prefers-reduced-motion` fallback.
- **Content:** MDX with gray-matter for projects, the Google Drive API for photographs, and static assets in `public/`.
- **Icons:** Inline SVG components in `src/components/icons.tsx`.
- **Fonts:** Urbanist and Lufga, loaded from `fonts/` with `next/font/local`.

Start with [Getting Started](getting-started.md) to boot the project locally, or skip ahead to the [Architecture Tour](architecture.md) for the broader structure.
