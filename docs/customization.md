# Customization Playbook

This page collects the tweaks you're likely to make once the portfolio content is set. It covers theming, adding sections, extending data loaders, and prepping for deployment.

## Theming & styling

The design system is the source of truth for how the site looks. `DESIGN.md` links to it and lists the rules that matter most. Its tokens come first, so make a lasting change there, then copy it into this repo.

### Colors and typography

- Tokens live in `src/app/globals.css`. Light values are on `:root`, and dark overrides are on `html.dark`. Adjust values such as `--accent`, `--ink`, or `--ground`.
- Each token needs a value that works in both themes. If a color is only set on `:root`, dark mode uses that same value.
- The `@theme inline` block in the same file maps tokens to Tailwind names (`--color-accent`, `--font-sans`, and so on). Add a new token there too if you want it available as a Tailwind utility.
- Don't write raw hex or Tailwind palette values such as `zinc-*` or `orange-*` in components. Text on `accent` uses `on-accent`, never white.
- To switch fonts, add the files under `fonts/` and update the `localFont` calls in `src/app/layout.tsx`. Keep the `--font-urbanist` and `--font-lufga` variable names, or update the `--font-display` and `--font-body` tokens to match. Example:
  ```ts
  const urbanist = localFont({
    src: [
      { path: "../../fonts/urbanist/static/Urbanist-Bold.ttf", weight: "700", style: "normal" },
    ],
    variable: "--font-urbanist",
    display: "swap",
  });
  ```

### Component-level tweaks

- Component styles live in `src/app/design-system.css` as `am-*` classes, grouped under comments such as `Hero`, `Timeline`, and `Gallery`.
- Add site-specific styles after the `Site additions` comment. The earlier sections are ported from the design system, so keeping them unchanged makes them easier to compare.
- Motion durations and easings are the `--dur-*` and `--ease-*` variables at the top of that file.
- Scroll reveals are in `src/components/PageMotion.tsx`. To animate a new block, add its class to the `BLOCKS` list.
- Give every new effect a `prefers-reduced-motion` fallback.

## Adding new sections

1. Create a new component in `src/components/`.
2. Decide whether it runs on the client (`"use client"`) or server. Most sections only need the server. Use a client component for state, effects, or browser APIs.
3. Build it from the existing `am-section`, `am-wrap`, and `am-sec-head` classes so that spacing and headings match.
4. Put its copy in `src/data/site.ts` if it's a list or anything else you'll edit often.
5. Import it into `src/app/page.tsx` and slot it into the stack wherever you want it.

```tsx
<Experience />
<YourSection />
<HirePanel />
```

To link to the section from the navbar, give it an `id`, add it to `navLeft` or `navRight` in `src/data/site.ts`, and add the `id` to the section list in `src/components/Navbar.tsx` so its link highlights on scroll. Keep in mind that the footer shows `navLeft` and the first two `navRight` links.

## Extending data loaders

### New MDX collections

If you want a writing section:

1. Create a new folder beside `content/projects/` and add MDX files with front matter.
2. Copy `src/lib/projects.ts` into a new file in `src/lib/`, then adjust its types and folder path.
3. Add a route folder under `src/app/`, using `src/app/projects/page.tsx` and its `[slug]` route as the model.

### Additional copy

For quick lists, such as speaking engagements, add a new typed export to `src/data/site.ts` and create a component to render it.

### Photo sources

Everything Drive-specific is in `src/lib/google-drive.ts`. To change how titles and albums are read, edit `describePhoto`. To read more metadata, add the field to the `fields` parameter in `listDrivePhotos` and to the `DriveFile` type.

## Deployment checklist

1. **Environment variables** &mdash; Set `GOOGLE_DRIVE_API_KEY` and `GOOGLE_DRIVE_FOLDER` on your host. Restrict the API key to the Drive API in the Google Cloud console.
2. **`metadataBase`** &mdash; It's set to `https://www.archit-mishra.com` in `src/app/layout.tsx`. Change it if the domain changes, to keep Open Graph URLs correct.
3. **Remote images** &mdash; Drive photos load through the site's own API route, so they need no configuration. If you use a remote `cover`, add its host to `images.remotePatterns` in `next.config.ts`.
4. **Sample photographs** &mdash; `DESIGN.md` asks for the two sample photographs to be replaced before launch. Confirm that the Drive folder and `public/images/` hold only real ones.
5. **Static exports** &mdash; Not supported as the site stands. The Drive API routes and hourly regeneration need a server, so use Vercel or another host that runs Next.js.

## MkDocs integration

This documentation lives under `docs/`, and `mkdocs.yml` at the repo root defines its navigation and the Material theme. To preview it:

```bash
pip install mkdocs-material
```

```bash
mkdocs serve
```

Add new pages to `nav` in `mkdocs.yml`. Paths there are relative to `docs/`.

## Useful experiments

- **Persist the theme server-side**: The choice is saved in `localStorage` now. Moving it to a cookie would let the server render the right theme.
- **Add analytics**: Drop Vercel Analytics or Plausible into `src/app/layout.tsx` if you need basic tracking.
- **Show `linkOut`**: Projects already parse this field, so a case study link only needs a button on the detail page.

That's it! Between this playbook and the rest of the docs, you should be able to reshape the portfolio without getting lost.
