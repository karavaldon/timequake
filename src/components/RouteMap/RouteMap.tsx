import { useId } from 'react';
import s from './RouteMap.module.css';

export interface RouteMapProps {
  /** Route as normalised [x, y] (0–1). Project GPS to the viewport first, or use toNormalised(). */
  route: [number, number][];
  width?: number; height?: number;
  /** Live = accent route + current-position dot at the end. */
  live?: boolean;
  /** Mile/km markers: indexes into `route`. */
  markers?: { at: number; label: string }[];
  /** Accessible summary: "6.21-mile loop around Lady Bird Lake". */
  label: string;
  /** Route only, with no basemap and smaller marks. For list thumbnails. */
  thumbnail?: boolean;
}

/** Normalise [lat, lng] GPS points into a padded 0–1 box (equirectangular; fine at city scale). */
export function toNormalised(points: [number, number][], pad = 0.08): [number, number][] {
  const lats = points.map((p) => p[0]), lngs = points.map((p) => p[1]);
  const [a, b, c, d] = [Math.min(...lats), Math.max(...lats), Math.min(...lngs), Math.max(...lngs)];
  const k = Math.cos(((a + b) / 2) * Math.PI / 180); const w = (d - c) * k, h = b - a; const span = Math.max(w, h) || 1;
  return points.map(([lat, lng]) => [pad + (1 - 2 * pad) * (((lng - c) * k) / span + (1 - w / span) / 2), pad + (1 - 2 * pad) * ((b - lat) / span + (1 - h / span) / 2)]);
}

/** Offline route sketch: the GPS line on a plain square grid. For real streets use RunMap (Mapbox), which falls back to this. Figma: Running › Route Map. */
export function RouteMap({ route, width = 335, height = 260, live, markers = [], label, thumbnail }: RouteMapProps) {
  const id = useId();
  const P = ([x, y]: [number, number]) => `${(x * width).toFixed(1)},${(y * height).toFixed(1)}`;
  const d = route.map((p, i) => (i ? 'L' : 'M') + P(p)).join(' ');
  const start = route[0], end = route[route.length - 1];
  const cell = 24, ox = (width % cell) / 2, oy = (height % cell) / 2;
  const grid: string[] = [];
  for (let x = ox; x <= width; x += cell) grid.push(`M${x},0 V${height}`);
  for (let y = oy; y <= height; y += cell) grid.push(`M0,${y} H${width}`);
  return (
    <figure className={thumbnail ? s.thumb : s.root} style={{ width, maxWidth: '100%' }}>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" role="img" aria-labelledby={`${id}-t`}>
        <title id={`${id}-t`}>{label}</title>
        <rect width={width} height={height} className={s.land} />
        {!thumbnail && <path d={grid.join(' ')} className={s.grid} shapeRendering="crispEdges" />}
        <path d={d} className={live ? s.routeLive : s.route} style={thumbnail ? { strokeWidth: 2 } : undefined} />
        {markers.map((m) => { const [x, y] = route[m.at]; return <g key={m.label} transform={`translate(${x * width},${y * height})`}><rect x={-9} y={-9} width={18} height={18} className={s.marker} /><text className={s.markerText} textAnchor="middle" dy="3.5">{m.label}</text></g>; })}
        {!thumbnail && <circle cx={start[0] * width} cy={start[1] * height} r={6} className={s.start} />}
        {thumbnail ? null : live ? <circle cx={end[0] * width} cy={end[1] * height} r={7} className={s.now} /> : <rect x={end[0] * width - 5} y={end[1] * height - 5} width={10} height={10} className={s.end} />}
      </svg>
    </figure>
  );
}
