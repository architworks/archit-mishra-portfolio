# Archit Mishra's Portfolio

The personal site of Archit Mishra, a data scientist and photographer. It's a Next.js 15 App Router app with project writeups in MDX and a photography gallery served from Google Drive.

## Run it locally

Install dependencies:

```bash
npm install
```

Copy the example environment file, then add your Google Drive API key and folder. The site runs without them, but the photography gallery won't load.

```bash
cp .env.example .env.local
```

Start the development server at [http://localhost:3000](http://localhost:3000):

```bash
npm run dev
```

## Where things live

| To change | Edit |
| --------- | ---- |
| Contact details, navigation, services, roles, stats, results, skills | `src/data/site.ts` |
| Color, type, spacing, and radius tokens | `src/app/globals.css` |
| Component styles (`am-*` classes) | `src/app/design-system.css` |
| Projects | `content/projects/*.mdx`, starting from `content/projects/TEMPLATE.mdx` |
| Page title, description, and site URL | `src/app/layout.tsx` |
| Images and the resume PDF | `public/` |

Read `DESIGN.md` before changing the look of the site. It links to the design system and lists the rules that matter most.

## Documentation

The guides are in `docs/`, and `mkdocs.yml` publishes them as a site:

- [Getting Started](docs/getting-started.md): setup, scripts, and project layout.
- [Architecture Tour](docs/architecture.md): routes, data flow, and components.
- [Content Management](docs/content.md): projects, site copy, and photos.
- [Customization Playbook](docs/customization.md): theming, new sections, and deployment.
