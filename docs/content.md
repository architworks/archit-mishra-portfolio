# Content Management

Keeping the site fresh is mostly about editing MDX, one TypeScript file, and your Drive folder. This guide covers how to update each content surface safely.

The design system has one rule for all of it: never invent a quote, rating, award, or metric. Every piece of work and every photograph shows real numbers.

## Project MDX

Project writeups live under `content/projects/`. To add one, copy `content/projects/TEMPLATE.mdx` and rename it. The filename becomes the URL, so `content/projects/quizzaro.mdx` is served at `/projects/quizzaro`. Each file follows the pattern below:

```md
---
title: Quizzaro
subtitle: GenAI quiz coach that adapts to any topic
summary: Instant quizzes, adaptive drills, and detailed explanations powered by Azure OpenAI to help learners improve faster.
tags: [GenAI, Next.js, Azure, Education]
cover: /images/quizzaro-home.webp
demoUrl: https://archits-quiz-app.vercel.app/
featured: true
order: 28
date: 2024-11-05
---

## Why it exists
The story goes here...
```

### Expected fields

Set these on every project:

- `title` &mdash; Displayed on covers and detail pages.
- `summary` &mdash; Short blurb used on the home rail and the `/projects` grid.
- `date` &mdash; ISO string (`YYYY-MM-DD`); used for sorting when `order` is equal or unset.

### Optional fields

- `subtitle` &mdash; Shown on the detail page and in place of the title in the `/projects` grid.
- `tags` &mdash; Shown as chips.
- `cover` &mdash; Path to an image under `public/`, such as `/images/quizzaro-home.webp`. Without one, the project gets the silk band image as its cover. Remote URLs need a matching `images.remotePatterns` entry in `next.config.ts`.
- `repo`, `demoUrl` &mdash; Add the "View Source" and "Open Live Demo" buttons on the detail page.
- `featured` &mdash; Projects are featured by default. `featured: false` removes one from the home rail but keeps it on `/projects`.
- `order` &mdash; Pins projects. Higher numbers appear first, and any project with an `order` comes before those without one.

`linkOut` is in the template and gets parsed, but no page shows it yet.

> **Reminder:** Project files are read from disk, so reload the browser to see your edits. On a deployed site, changes go live with the next build.

## Site copy (`src/data/site.ts`)

Most short copy lives in `src/data/site.ts`:

| Export | What it controls |
| ------ | ---------------- |
| `contact` | Email, phone, LinkedIn, and resume link |
| `navLeft`, `navRight` | Links on either side of the navbar; the footer reuses them |
| `services` | "What I Build" cards |
| `roles` | Experience timeline, including each role's `readout` |
| `strengths` | The "how I work" points in the "Why Work With Me?" panel; keep numbers out, since Results has them |
| `results` | Measured outcome cards |
| `skills` | Words in the scrolling marquee |

A few details to watch for:

- Set `current: true` on the role that's in progress. It marks that row on the timeline.
- A service with `highlights` shows them under a diagram, which `src/components/ServicesBand.tsx` looks up by the service's `title`. If you rename or add one, update the `diagrams` map too.
- A service with an empty `highlights` list shows `public/images/photo-flt-6151.webp` instead.

Headlines and one-off sentences stay in their components. For example, the "Why Work With Me?" paragraph is in `src/components/HirePanel.tsx`, and the location and employer list is in `src/components/Discuss.tsx`.

## Photography

Photographs come from a single Google Drive folder, not from the repo. To publish one, add it to the folder. It appears in the `/photography` gallery right away and can reach the home page within an hour.

### Setting up the folder

1. **Create an API key.** In the Google Cloud console, enable the Drive API and create an API key.
2. **Share the folder.** Set general access to "Anyone with the link" with Viewer permission. An API key can only read public files.
3. **Set the environment variables.** Add these to `.env.local`, and to your host's settings when you deploy:
   ```bash
   GOOGLE_DRIVE_API_KEY=your-google-drive-api-key
   GOOGLE_DRIVE_FOLDER=https://drive.google.com/drive/folders/your-folder-id
   ```
   `GOOGLE_DRIVE_FOLDER` accepts either the folder link or the bare folder ID.

### What's automatic

Add a photo to the folder and it appears on the site. There is nothing else to maintain.


- **Exposure readout:** Camera, focal length, aperture, shutter speed, and ISO come from the metadata Drive reads from the image file. Keep that metadata when you export, or the readout will be empty.
- **Order:** Photos sort by filename. The home page shows the first three, so rename files to change which ones appear.
- **Scope:** Only images directly in the folder are listed. Subfolders are ignored.

## Contact & metadata

- Phone, email, LinkedIn, and the resume link live in `contact` in `src/data/site.ts`. The footer and "Let's Discuss" form both read from it.
- The resume is whatever document is in the Drive folder set by `contact.resumeFolderId` in `src/data/site.ts`. Drop in a Google Doc, PDF, or Word file and `/resume` shows it within about a minute. Download links use `contact.resumeDownload`, and a Google Doc downloads as a PDF. If the folder holds more than one, the most recently changed file wins. Share the folder once as "Anyone with the link: Viewer", and files added later inherit that.
- Update `src/app/layout.tsx` metadata (title, description, `metadataBase`) if the name or domain changes.

## Static assets

- Place images in `public/images/`. Prefer WebP for anything shown through `next/image`.
- The nav and footer use a text wordmark, and the favicon is `src/app/icon.svg`.
- Covers crop to a landscape frame of roughly 16:9, anchored to the top of the image, so keep the important part near the top.
- Use real screenshots and your own photographs, as `DESIGN.md` asks.

With content editing sorted, check out the [Customization Playbook](customization.md) for theming tips and deployment considerations.
