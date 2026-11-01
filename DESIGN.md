# Design

The design system is the source of truth for the redesign on `ui-redesign`:
https://claude.ai/artifact/EbyXwkguDQM6J6rkgWsmpe

Read its `project/README.md` first, then `project/tokens.json`, `project/components/bundle.css`, and the `preview.html` and `README.md` of each component you build. The README's Figma Map section maps each part of the Figma reference to a component. `components/HomePage/preview.html` shows the target page, and `components/HeroDoodles` shows the hero's scroll state.

## Rules that matter most

- Take color, type, spacing, and radius from the tokens. Don't write raw `zinc-*`, `orange-*`, or hex values in components.
- Text on `accent` uses `on-accent`, never white.
- One `am-accent` phrase per heading, and only `arc` behind the portrait.
- Every photograph and piece of work carries a Readout of real numbers. Never invent a quote, rating, award, or metric.
- Use real screenshots and his own photographs. Replace the two sample photographs before launch.
- Motion follows the table in the README, and every effect has a `prefers-reduced-motion` fallback.

## Mapping to this repo

Theme switching uses `html.dark`, so the dark token block goes on `html.dark` in `src/app/globals.css`. Fonts stay in the existing `next/font/local` setup, and rasters use `next/image`.

`src/app/globals.css` holds the tokens and `src/app/design-system.css` holds the component styles, ported from the system's `components/bundle.css` with site-specific additions at the end. Photo titles and albums come from each Drive file's description, written as `Title | Album`.
