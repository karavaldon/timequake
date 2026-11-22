// ─────────────────────────────────────────────────────────────────────────────
// TIMEQUAKE v2 — single source of truth.
// A running PWA that pairs with a watch + a sports sensor strap.
// Look: stark black & white (LCD, Co–Star), Casio F-91W restraint, two accents:
//   Volt (the one action / live signal in dark) and Mulberry (accent in light).
// `npm run tokens` regenerates CSS / TS / DTCG JSON. Figma mirrors these names.
// ─────────────────────────────────────────────────────────────────────────────
export const PREFIX = 'kv';

export const primitives = {
  // Neutral ramp — true greys for the steps in between. Canvas & text use paper/ink below.
  gray: { 0:'#FFFFFF', 50:'#F5F5F5', 100:'#EBEBEB', 200:'#D6D6D6', 300:'#B3B3B3', 400:'#8A8A8A', 500:'#6B6B6B', 600:'#525252', 700:'#3D3D3D', 800:'#262626', 900:'#141414', 950:'#0A0A0A', 1000:'#000000' },
  // Paper & ink — the softened white and black used for every canvas and text colour.
  // Pure #FFF/#000 vibrate against each other; these keep the B&W look at ~17:1.
  paper: { 0:'#F3F2EE', 50:'#EEEDE9', 100:'#E4E3DE' },
  ink:   { 1000:'#121212', 950:'#181818', 900:'#202020' },
  volt:     { 300:'#E4FF7A', 400:'#D4FF3D', 600:'#93B80F', 800:'#4A5C08' },
  mulberry: { 300:'#DA84B5', 400:'#C65A97', 600:'#862662', 700:'#6B1A4E', 900:'#340C27' },
  // Errors only. Kept quiet — the system is B&W first.
  red:      { 300:'#FF8A8A', 600:'#C21E2E' },
};

// Semantic colors: [light, dark]
export const semantic = {
  // Surfaces — flat; separate things with hairlines, not fills.
  'bg/canvas':           ['paper.0','ink.1000'],
  'bg/raised':           ['paper.50','ink.900'],     // sheets, menus, pressed rows
  'bg/inverse':          ['ink.1000','paper.0'],
  'bg/action':           ['ink.1000','volt.400'],   // the ONE primary action
  'bg/action-pressed':   ['gray.800','volt.300'],
  'bg/accent':           ['mulberry.700','mulberry.400'],
  'bg/accent-subtle':    ['paper.50','ink.900'],
  'bg/disabled':         ['paper.100','gray.800'],
  'bg/danger':           ['red.600','red.300'],
  // Text
  'text/primary':        ['ink.1000','paper.0'],
  'text/secondary':      ['gray.600','gray.300'],
  'text/tertiary':       ['gray.500','gray.400'],    // labels, meta — still ≥4.5:1
  'text/disabled':       ['gray.400','gray.600'],
  'text/inverse':        ['paper.0','ink.1000'],
  'text/on-action':      ['paper.0','ink.1000'],
  'text/on-accent':      ['paper.0','ink.1000'],
  'text/accent':         ['mulberry.700','mulberry.300'],
  'text/live':           ['mulberry.700','volt.400'], // the "live" signal
  'text/danger':         ['red.600','red.300'],
  // Lines
  'border/hairline':     ['gray.200','gray.800'],    // dividers (decorative)
  'border/strong':       ['ink.1000','paper.0'],     // inputs, selected, outlines (≥3:1)
  'border/input':        ['gray.500','gray.400'],
  'border/focus':        ['mulberry.700','volt.400'],
  'border/danger':       ['red.600','red.300'],
  // Icons
  'icon/primary':        ['ink.1000','paper.0'],
  'icon/secondary':      ['gray.500','gray.400'],
  'icon/accent':         ['mulberry.700','mulberry.300'],
  'icon/live':           ['mulberry.700','volt.400'],
  // Data viz — monochrome first; one highlight
  'data/line':           ['ink.1000','paper.0'],
  'data/line-muted':     ['gray.400','gray.600'],
  'data/grid':           ['gray.200','gray.800'],
  'data/highlight':      ['mulberry.700','volt.400'],
  'data/band':           ['paper.100','ink.900'],    // ranges (e.g. normal HRV)
  // HR zones — a single-hue ramp, always labelled (Z1–Z5), never colour alone
  'data/zone-1':         ['gray.400','gray.500'],
  'data/zone-2':         ['gray.500','gray.400'],
  'data/zone-3':         ['gray.700','gray.300'],
  'data/zone-4':         ['ink.1000','paper.0'],
  'data/zone-5':         ['mulberry.700','volt.400'],
  // Map (B&W basemap for GPS routes)
  'map/land':            ['paper.0','ink.1000'],
  'map/water':           ['paper.100','ink.900'],
  'map/park':            ['paper.50','ink.950'],
  'map/road':            ['gray.200','gray.800'],
  'map/road-major':      ['gray.300','gray.700'],
  'map/label':           ['gray.500','gray.400'],
  'map/route':           ['ink.1000','paper.0'],
  'map/route-live':      ['mulberry.700','volt.400'],
};

export const spacing = { 0:0, 2:2, 4:4, 8:8, 12:12, 16:16, 20:20, 24:24, 32:32, 40:40, 48:48, 64:64, 80:80 };
// Mostly square, like printed matter. Pills only for the primary action + tags.
export const radius = { none:0, xs:2, sm:4, md:8, pill:999 };
export const borderWidth = { hairline:1, strong:1.5, focus:2 };
export const size = { 'touch-min':48, 'touch-live':72, 'icon-sm':16, 'icon-md':20, 'icon-lg':24 };
export const elevation = { sheet: [{ y:-1, blur:0, spread:0, color:'rgba(0,0,0,0.12)' }] }; // a hairline above sheets; no soft shadows
export const motion = {
  duration: { instant:80, fast:140, base:220, slow:360 },
  easing: { standard:'cubic-bezier(0.2, 0, 0, 1)', exit:'cubic-bezier(0.3, 0, 1, 1)', linear:'linear' },
};

export const fontFamily = {
  serif: { name:'Instrument Serif', stack:"'Instrument Serif', 'Times New Roman', serif" },
  sans:  { name:'Instrument Sans',  stack:"'Instrument Sans', system-ui, -apple-system, 'Segoe UI', sans-serif" },
  mono:  { name:'Chivo Mono',       stack:"'Chivo Mono', ui-monospace, 'SF Mono', Menlo, monospace" },
};

// Editorial serif headlines · sans UI · mono labels + numbers (plain zero, LCD feel)
export const typography = {
  'display/xl':  { family:'serif', figmaStyle:'Regular', weight:400, size:64, line:64, tracking:-2 },
  'display/lg':  { family:'serif', figmaStyle:'Regular', weight:400, size:48, line:50, tracking:-1.5 },
  'heading/1':   { family:'serif', figmaStyle:'Regular', weight:400, size:36, line:40, tracking:-1 },
  'heading/2':   { family:'serif', figmaStyle:'Regular', weight:400, size:28, line:32, tracking:-0.5 },
  'title':       { family:'sans',  figmaStyle:'SemiBold', weight:600, size:17, line:22, tracking:0 },
  'body/lg':     { family:'sans',  figmaStyle:'Regular', weight:400, size:18, line:27, tracking:0 },
  'body/md':     { family:'sans',  figmaStyle:'Regular', weight:400, size:16, line:24, tracking:0 },
  'body/sm':     { family:'sans',  figmaStyle:'Regular', weight:400, size:14, line:20, tracking:0 },
  'label/md':    { family:'sans',  figmaStyle:'Medium',  weight:500, size:16, line:20, tracking:0 },
  'label/sm':    { family:'sans',  figmaStyle:'Medium',  weight:500, size:14, line:18, tracking:0 },
  'caps/md':     { family:'mono',  figmaStyle:'Medium',  weight:500, size:12, line:16, tracking:10, upper:true },
  'caps/sm':     { family:'mono',  figmaStyle:'Medium',  weight:500, size:11, line:14, tracking:10, upper:true },
  'data/xl':     { family:'mono',  figmaStyle:'Regular', weight:400, size:72, line:72, tracking:-6, tabular:true },
  'data/lg':     { family:'mono',  figmaStyle:'Regular', weight:400, size:40, line:44, tracking:-4, tabular:true },
  'data/md':     { family:'mono',  figmaStyle:'Regular', weight:400, size:24, line:28, tracking:-3, tabular:true },
  'data/sm':     { family:'mono',  figmaStyle:'Regular', weight:400, size:16, line:20, tracking:-1, tabular:true },
};
