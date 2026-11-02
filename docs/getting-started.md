# Getting Started

This guide helps you install dependencies, run the site locally, and understand the top-level project layout. Even if you're already fluent with Next.js, skim the project structure section to see where content lives.

## Prerequisites

- **Node.js 18.18 or newer** (required by Next.js 15).  
  Check your version:
  ```bash
  node --version
  ```
- **npm** (ships with Node). The scripts here assume npm, and the repo includes a `package-lock.json`.

## Installation

Clone the repo and install packages:

```bash
git clone https://github.com/dynamiterdx/archit-mishra-portfolio.git
cd archit-mishra-portfolio
npm install
```

## Environment variables

The photography gallery reads from Google Drive, so it needs two values. Copy the example file and fill them in:

```bash
cp .env.example .env.local
```

| Variable | Value |
| -------- | ----- |
| `GOOGLE_DRIVE_API_KEY` | A Google API key with the Drive API enabled |
| `GOOGLE_DRIVE_FOLDER` | The link or ID of a Drive folder that anyone with the link can view |

The rest of the site works without them. `/photography` shows its "Couldn't Load These Photos" notice, and the home page leaves out its "From My Lens" section.

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Starts Next.js in development mode at http://localhost:3000 |
| `npm run dev:clean` | Deletes the `.next` folder before launching dev mode (helpful if Next.js caches get cranky) |
| `npm run build` | Type-checks and compiles the production build |
| `npm run start` | Serves the production build on port 3000 |
| `npm run lint` | Runs ESLint with the Next.js config |

## Project structure

```
├── src
│   ├── app
│   │   ├── layout.tsx        # Root layout, fonts, metadata, theme script, nav + footer
│   │   ├── page.tsx          # Home page that stitches the sections together
│   │   ├── not-found.tsx     # 404 page
│   │   ├── icon.svg          # Favicon
│   │   ├── globals.css       # Design tokens for light and dark themes
│   │   ├── design-system.css # Component styles (am-* classes)
│   │   ├── api/drive/        # Routes that serve Google Drive photos and the resume
│   │   ├── photography/      # Route for the photography gallery
│   │   └── projects/         # Project listing + dynamic [slug] detail pages
│   ├── components            # One component per section or shared UI block
│   ├── data
│   │   └── site.ts           # Site copy: contact, nav, services, roles, stats, skills
│   └── lib
│       ├── google-drive.ts   # Drive API client and photo metadata parsing
│       └── projects.ts       # MDX loader for project writeups
├── content
│   └── projects              # MDX files for project writeups, plus TEMPLATE.mdx
├── fonts                     # Urbanist and Lufga font files
├── public                    # Images and the logo mark
├── docs                      # This documentation set (MkDocs)
├── DESIGN.md                 # Link to the design system and its key rules
├── .env.example              # Environment variables to copy into .env.local
├── eslint.config.mjs         # Flat-config ESLint setup
├── mkdocs.yml                # MkDocs site config
├── next.config.ts            # Next.js config (currently empty)
├── postcss.config.mjs        # Tailwind's PostCSS plugin
└── package.json
```

## Development workflow

1. Run `npm run dev`.
2. Visit http://localhost:3000.
3. Edit files in `src/` &ndash; Next.js will hot-reload.
4. Reload the browser after editing an MDX file. Projects are read from disk rather than imported, so hot reload doesn't pick them up.

## Troubleshooting

- **The gallery says "Couldn't Load These Photos"**  
  Open `/api/drive/photos` in your browser. Its JSON error names the cause, such as a missing API key, a bad folder link, or a folder that isn't shared. See [Photography](content.md#photography) for the setup.

- **The gallery is empty**  
  Only images directly inside the folder are listed. Images in subfolders don't appear.

- **MDX page 500 errors**  
  Usually caused by invalid front matter or MDX syntax in the file. See [Content Management](content.md#project-mdx) for the expected shape.

- **A project cover throws an image error**  
  Covers go through `next/image`, which rejects remote hosts until they're allowed in `next.config.ts`. Use a path under `public/`, or add the host to `images.remotePatterns`.

- **The dev server shows stale or broken pages**  
  Run `npm run dev:clean` to clear `.next` and start again.

With the environment ready, head to the [Architecture Tour](architecture.md) to understand how routes, layout, and data loading are wired up.
