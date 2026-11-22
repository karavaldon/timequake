# Timequake

Black-and-white design system for a running PWA that pairs with an HR strap and a watch. Volt and Mulberry are the only accents. Inspired by the restraint of a Casio F-91W and the starkness of Co–Star, without imitating a watch screen.

- **Figma:** https://www.figma.com/design/unaZRobvOliiSLnm9h4YfI
- **Tokens:** `tokens/source.mjs` → CSS variables (`--kv-*`), TS, DTCG JSON
- **Type:** Instrument Serif · Instrument Sans · Chivo Mono
- **Components:** Core (Button, IconButton, TextField, Switch, SegmentedControl, ListRow, Tag, TopBar, BottomNav, Sheet, Toast, DeviceStatus) and Running (Stat, LiveMetrics, RouteMap, RunMap on Mapbox GL with a token-driven B&W style, static-map thumbnails, LineChart, BarChart, ZoneBar, SplitsTable, RunRow)
- **Screens:** Today, Live run, Run detail, Trends, Run log, Gear

```bash
cp .env.example .env   # add a Mapbox pk. token for real map tiles
npm install
npm run storybook
npm run check && npm run build-storybook && npm run a11y
```

```tsx
import '@karavaldon/timequake/styles';
import { Button, LiveMetrics, RouteMap } from '@karavaldon/timequake';

<html data-theme="dark">
<LiveMetrics elapsed="32:18" pace="7:38" distance="4.21" heartRate={158} zone={4} />
<Button icon="play" size="lg" fullWidth>Start run</Button>
```

See `CLAUDE.md` for the rules (used by Claude Code).
