# Timequake — design system (v2)

React + TypeScript component library and tokens for the Timequake running PWA: a web app paired with a sports sensor (HR strap) and a watch. It records GPS routes, pace, elapsed time, distance, heart rate and HRV, logs runs, and shows trends.

Figma source of truth: https://www.figma.com/design/unaZRobvOliiSLnm9h4YfI (node IDs in `figma.json`).

## Commands

```bash
npm install
npm run storybook        # dev Storybook on :6006 (default theme: dark)
npm run check            # tokens → contrast audit → typecheck. Run before every commit.
npm run build-storybook  # static build → storybook-static/
npm run a11y             # axe on every story, light + dark (needs build-storybook + `npx playwright install chromium`)
cp .env.example .env     # then add STORYBOOK_MAPBOX_TOKEN=pk.… to see real tiles
```

A change is done when `npm run check` passes and `npm run a11y` reports no violations.

## Layout

```
tokens/source.mjs          ← EDIT TOKENS HERE (only place)
scripts/build-tokens.mjs   → src/tokens/tokens.css · tokens.ts · tokens/dist/tokens.json (generated, never hand-edit)
scripts/audit-contrast.mjs ← WCAG pairs; add a pair whenever you add a fg/bg token
src/styles/global.css      fonts + tokens + focus ring + .kv-visually-hidden
src/components/<Name>/     Name.tsx · Name.module.css · Name.stories.tsx · index.ts
src/data/sample.ts         one consistent sample run (Thu Nov 19, Lady Bird Lake) used by every story
src/screens/               full-screen PWA stories (Storybook "Screens")
src/docs/*.mdx             Introduction + Foundations docs (Color, Typography, Spacing & Shape, Photography)
public/photos/             photo library files (see README there)
public/favicon.svg · favicon.ico · icons/ · manifest.webmanifest   app icon (serif T), from Figma Cover › Favicon
```

## The look

Black and white first, like an LCD — but **no watch screens, no segment digits, no faux-LCD panels**. Mood: Co–Star's starkness; Casio F-91W's restraint (printed caps labels, hairline rules, one accent).

- Black and white means **ink `#121212` and paper `#F3F2EE`**, never pure #000/#FFF (pure pairs vibrate). Use the `paper/*` and `ink/*` primitives via semantic tokens.
- Two accents only: **Volt** `#D4FF3D` and **Mulberry** `#6B1A4E`. Never introduce another hue.
- One filled action per screen: `bg/action` (black in light, Volt in dark).
- Live/latest state uses `text/live` / `data/highlight` / `map/route-live` (mulberry in light, volt in dark). Accent marks *what is live or latest*, never decoration.
- Hairlines (`border/hairline`) instead of cards and fills. Square corners; pills only for the primary button and tags.
- HR zones: single-hue ramp `data/zone-1…5`, Z5 is the accent. Always label Z1–Z5 in text.

## Type

- **Instrument Serif** — display/heading only (`display/*`, `heading/*`).
- **Instrument Sans** — UI text (`title`, `body/*`, `label/*`).
- **Chivo Mono** — every number (`data/*`, tabular) and every caps label (`caps/*`, uppercase, 0.1em tracking).
- Use `<Text variant>` or the `.kv-text-*` classes. Don't set font sizes ad hoc.

## Rules for code

- Style only with tokens: `var(--kv-color-…)`, `var(--kv-space-…)`, `--kv-radius-*`. No hex values in components.
- CSS Modules per component; `cx()` from `src/lib/cx.ts` for class joins.
- Icons: `<Icon name="kebab-name">` (Lucide, 1.5 stroke). Decorative by default; pass `label` to make it an image.
- Never theme with JS — themes are `[data-theme="light|dark"]` + `prefers-color-scheme` in tokens.css.
- New component checklist: folder with 4 files → export from `src/index.ts` → story titled `Core/…` or `Running/…` with a docs description → `npm run check` → `npm run a11y` → add the Figma node to `figma.json`.

## Accessibility (WCAG 2.2 AA — non-negotiable)

- Text 4.5:1, large text/UI/graphics 3:1 — enforced by `audit:contrast`.
- Touch targets ≥ 48px; live-run controls 72px+.
- Icon-only buttons require `label`. Visible text must start the accessible name (2.5.3) — don't put aria-label on links that already have text.
- Charts: SVG `role="img"` with `<title>`, plus a visually-hidden `<table>` of the values.
- Live metrics are **not** an aria-live region (would announce every second). Announce laps / zone changes / saves via `Toast` (role="status").
- Respect `prefers-reduced-motion`. No infinite blinking.
- State is never colour-only: device states and zones are always spelled out.

## Photography

- `<Photo src alt ratio caption>` — black-and-white (grayscale filter on by default), five crops: 16:9, 3:2, 4:5, 1:1, 9:16. Missing file → labelled placeholder.
- Library slots live in `src/data/photos.ts`; files go in `public/photos/` (names in its README). Same slot names as the Figma Photography page.
- Never put text, gradients or accent colour on a photo; captions go below in caps. `alt` is required — `""` only for decorative backgrounds.

## Maps (Mapbox)

- `RunMap` — live/detail maps on **Mapbox GL JS v3** (`mapbox-gl`, optional peer dep, lazy-loaded). Coordinates are `[lng, lat]`.
- `mapboxStyle(theme)` — full Mapbox style JSON built from `map/*` tokens on Mapbox Streets v8. It flips with light/dark. Trails (`class: path`) are dotted hairlines. Upload the JSON to Mapbox Studio to get a style ID if you want the exact palette in static images too.
- `routeLayers(theme, live)` — route casing + line + start/end dots. Live uses `map/route-live`.
- `staticMapUrl({ accessToken, coordinates, theme })` — Static Images API URL for `RunRow` thumbnails / share cards. Static API **cannot** render Mapbox Standard; defaults to `mapbox/light-v11` / `dark-v11` (already grayscale) or pass `style: "user/styleId"`.
- Token: public `pk.` token, URL-restricted in the Mapbox account. Storybook reads `STORYBOOK_MAPBOX_TOKEN`, the app `VITE_MAPBOX_TOKEN` (see `.env.example`). Never commit `.env`.
- No token → `RunMap` falls back to the offline SVG `RouteMap` (stories, tests, offline PWA).
- Keep the Mapbox logo + attribution on interactive maps (Mapbox terms). Thumbnails turn it off, so credit "© Mapbox © OpenStreetMap" on the run-detail screen.
- `RunMap` is non-interactive by default (no scroll/focus trap); `interactive` enables cooperative gestures.
- `sampleGps` is a hand-traced Butler Trail loop — approximate, demo only.

## Figma

- Variables mirror tokens 1:1 (`Color` collection has Light/Dark modes; `bg/canvas` ⇄ `--kv-color-bg-canvas`). Only WEB code syntax is set.
- Pages: Cover · Color · Type · Layout · Icons · Photography · Core · Running · Screens (Light + Dark sections).
- When adding to Figma: bind every paint to a Color variable, use the 16 text styles, describe the component with its code signature.

## Don'ts

- Don't edit generated token files. Don't add colours outside `tokens/source.mjs`.
- Don't touch `timequake-v1/` (archived previous system).
- Don't use watch/LCD skeuomorphism, gradients, shadows beyond `elevation.sheet`, or rounded cards.
