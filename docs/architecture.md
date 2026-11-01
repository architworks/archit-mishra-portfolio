# Architecture Tour

This page peels back the layers of the portfolio app, explaining how routing, data, and components interact. It should help you reason about changes or extend the site without spelunking through every file.

## App Router backbone

The project uses the Next.js App Router (`src/app/`). The layout and page files work together like this:

```
app/
├── layout.tsx         # Wraps every route with fonts, theme script, navbar, footer, and metadata
├── page.tsx           # The home route (/) - stacks the home sections in order
├── not-found.tsx      # 404 page
├── icon.svg           # Favicon
├── globals.css        # Tailwind v4 import + design tokens
├── design-system.css  # Component styles
├── projects/
│   ├── page.tsx       # /projects - grid of every project
│   └── [slug]/        # /projects/<slug> - one page per MDX file
├── photography/
│   └── page.tsx       # /photography - gallery with album filters + lightbox
└── api/drive/
    ├── photos/        # GET /api/drive/photos - lists the folder as JSON
    └── photo/[id]/    # GET /api/drive/photo/<id> - streams one image from Drive
```

### `src/app/layout.tsx`

- Loads Urbanist and Lufga with `next/font/local` from the `fonts/` folder and exposes them as CSS variables.
- Imports `src/app/globals.css` and `src/app/design-system.css`.
- Runs a small inline script before paint, so a saved or system dark theme never flashes light.
- Renders the skip link, `<Navbar />`, `<Footer />`, and `<PageMotion />` around every route.
- Sets base metadata (`title`, `description`, `metadataBase`).

### `src/app/page.tsx` (Home)

```tsx
export const revalidate = 3600;

export default async function Home() {
  const featured = await getFeaturedProjects();
  return (
    <>
      <Hero />
      <ServicesBand />
      <Experience />
      <HirePanel />
      <ProjectsShowcase projects={featured} />
      <ResultsBand />
      <Discuss />
      <Marquee />
      <LensSection />
    </>
  );
}
```

- Fetches featured projects via `getFeaturedProjects`, which reads MDX front matter (more on that below).
- Renders sections in sequence. Each section is its own component in `src/components/`.
- Regenerates at most once an hour, which is how often new Drive photos can reach the home page.

## Data & content flow

### Site copy (TypeScript)

`src/data/site.ts` exports the short, structured copy that components render:

| Export | Used by |
| ------ | ------- |
| `contact` | `Discuss`, `Footer`, `HirePanel` |
| `navLeft`, `navRight` | `Navbar`, `Footer` |
| `services` | `ServicesBand` |
| `roles` | `Experience` |
| `hireStats` | `HirePanel` |
| `results` | `ResultsBand` |
| `skills` | `Marquee` |

Headlines and one-off sentences stay in the component that shows them.

### Projects (MDX)

- MDX lives under `content/projects/*.mdx`. The filename is the URL slug.
- `src/lib/projects.ts` handles:
  - Reading files via `fs/promises`, skipping `content/projects/TEMPLATE.mdx`.
  - Parsing front matter with `gray-matter`.
  - Sorting by `order`, then `date`, and filtering to featured projects.
  - Compiling MDX on demand with `next-mdx-remote/rsc`, `remark-gfm`, and `rehype-slug`.
- `getAllProjectsMeta` returns typed metadata so the home rail and the `/projects` grid can render without compiling MDX.
- `src/components/mdx-components.tsx` maps MDX images to a lazy-loaded `<img>`. The `.am-prose` class styles everything else.

### Photographs (Google Drive)

- `src/lib/google-drive.ts` lists the images in the folder named by `GOOGLE_DRIVE_FOLDER`, using `GOOGLE_DRIVE_API_KEY`.
- There are no titles or albums to maintain. Each photo's exposure readout comes from the metadata Drive reads from the image file, and it stays empty if the file has none.
- `LensSection` calls the library directly on the server, caches the list for an hour, and shows the first three photos. If Drive fails or the folder is empty, the section leaves itself out.
- `GoogleDriveGallery` runs in the browser and fetches `/api/drive/photos` uncached. The selected album and open photo are kept in the URL (`?album=` and `?photo=`), so a view can be shared.
- Images always load through `/api/drive/photo/<id>`, which keeps the API key on the server. To `next/image`, they're local URLs, so `next.config.ts` needs no remote hosts.

### Static assets

- Images live under `public/images/`, and the resume is a Google Doc embedded on `/resume`.
- Project covers and page images go through `next/image`.

## Component highlights

| Component | Responsibility | Notes |
| --------- | -------------- | ----- |
| `Hero` | Landing section with the portrait and portfolio switch | Reveals `HeroDoodles` once the headline scrolls away |
| `ServicesBand` | "What I Build" cards on a dark band (`#about`) | Each card has a diagram or photograph |
| `Experience` | Timeline of roles (`#resume`) | Each role carries a `Readout` of real numbers |
| `HirePanel` | "Why Hire Me?" stats and email button (`#hire`) | Reads `hireStats` and `contact` |
| `ProjectsShowcase` | Scrolling rail of featured projects (`#projects`) | Accepts `ProjectMeta[]`, renders `ProjectCover` |
| `ResultsBand` | Measured outcomes on a dark band (`#results`) | Fills the slot where testimonials would go |
| `Discuss` | Email field that opens a mail draft (`#contact`) | Validates the address, then opens a `mailto:` link |
| `Marquee` | Scrolling list of skills | Has a pause button |
| `LensSection` | First three photographs (`#photography`) | Server component, hides itself when there are no photos |
| `GoogleDriveGallery` | `/photography` grid with album filters and lightbox | Keyboard accessible, with loading, empty, and error states |
| `ProjectCover` | Linked project cover | Falls back to the silk band image when a project has no `cover` |
| `Readout` | Row of real numbers under work and photographs | Renders nothing when the list is empty |
| `PageMotion` | Rises each block into view once on scroll | Skipped under `prefers-reduced-motion`; blocks stay visible without it |
| `Navbar`, `Footer`, `ThemeToggle`, `icons` | Site chrome and inline SVG icons | `Footer` reuses `Brand` from `Navbar` |

## Styling & theming

The styling comes from a design system. `DESIGN.md` links to it and lists the rules to follow.

- `src/app/globals.css` holds the design tokens: color, type, spacing, radius, and shadow as CSS variables on `:root`, with dark overrides on `html.dark`. It also imports Tailwind and maps the tokens into `@theme inline`.
- `src/app/design-system.css` holds the component styles as `am-*` classes, ported from the design system. Site-specific additions sit at the end, after the `Site additions` comment.
- Components use those `am-*` classes rather than Tailwind utilities.
- Dark mode is the `.dark` class on `<html>`. The inline script in `src/app/layout.tsx` sets it from the saved choice or the system preference, and `ThemeToggle` flips it and saves the choice to `localStorage`.

## Deployment posture

- The site needs a Node runtime, because the Drive API routes and the hourly regeneration run on the server. Vercel and other Next.js hosts work.
- At runtime, it depends on the Google Drive API. Everything except the photographs keeps working if Drive is down.
- Fonts ship in the repo, so nothing is fetched from a font service.

With the architecture under your belt, continue to [Content Management](content.md) to learn how to keep projects, site copy, and photography up to date.
