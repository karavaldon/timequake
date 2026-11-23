import { useEffect, useId, useRef, useState } from 'react';
import type { Map as MapboxMap } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { RouteMap, toNormalised, mapboxStyle, routeLayers, type MapTheme } from '../RouteMap';
import s from './RunMap.module.css';

export interface RunMapProps {
  /** GPS track as [lng, lat]. */
  coordinates: [number, number][];
  /** Public Mapbox token (pk.…). Without one, the offline SVG RouteMap renders instead. */
  accessToken?: string;
  /** Defaults to the nearest [data-theme], then prefers-color-scheme. */
  theme?: MapTheme;
  /** Uploaded Studio style URL (mapbox://styles/you/id). Defaults to mapboxStyle(theme). */
  styleUrl?: string;
  live?: boolean;
  /** Pan/zoom. Off by default so the map never traps scroll or keyboard focus. */
  interactive?: boolean;
  height?: number;
  /** Accessible summary: "6.21-mile loop around Lady Bird Lake". */
  label: string;
}

const detectTheme = (el: HTMLElement | null): MapTheme => {
  const t = el?.closest('[data-theme]')?.getAttribute('data-theme');
  if (t === 'light' || t === 'dark') return t;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};
const ends = (c: [number, number][]) => ({ type: 'FeatureCollection', features: [
  { type: 'Feature', properties: { kind: 'start' }, geometry: { type: 'Point', coordinates: c[0] } },
  { type: 'Feature', properties: { kind: 'end' }, geometry: { type: 'Point', coordinates: c[c.length - 1] } }] });

/** Real-tile run map on Mapbox GL, styled from map/* tokens. Falls back to the SVG RouteMap with no token. Figma: Running › Route Map. */
export function RunMap({ coordinates, accessToken, theme, styleUrl, live, interactive = false, height = 260, label }: RunMapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const map = useRef<MapboxMap | null>(null);
  const capId = useId();
  const [resolved, setResolved] = useState<MapTheme | undefined>(theme);

  useEffect(() => { if (!theme) setResolved(detectTheme(ref.current)); else setResolved(theme); }, [theme]);
  useEffect(() => {
    if (theme || !ref.current) return;
    const host = ref.current.closest('[data-theme]') ?? document.documentElement;
    const mo = new MutationObserver(() => setResolved(detectTheme(ref.current)));
    mo.observe(host, { attributes: true, attributeFilter: ['data-theme'] });
    return () => mo.disconnect();
  }, [theme]);

  useEffect(() => {
    if (!accessToken || !ref.current || !resolved || coordinates.length < 2) return;
    let cancelled = false;
    (async () => {
      const { default: mapboxgl } = await import('mapbox-gl');
      if (cancelled || !ref.current) return;
      const lngs = coordinates.map((p) => p[0]), lats = coordinates.map((p) => p[1]);
      const m = new mapboxgl.Map({
        container: ref.current, accessToken, interactive,
        style: (styleUrl ?? mapboxStyle(resolved)) as any,
        bounds: [[Math.min(...lngs), Math.min(...lats)], [Math.max(...lngs), Math.max(...lats)]],
        fitBoundsOptions: { padding: 32 }, attributionControl: false, cooperativeGestures: interactive,
      });
      m.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right');
      m.on('load', () => {
        m.addSource('route', { type: 'geojson', data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates } } });
        m.addSource('route-ends', { type: 'geojson', data: ends(coordinates) as any });
        for (const l of routeLayers(resolved, live)) m.addLayer(l as any);
      });
      map.current = m;
    })();
    return () => { cancelled = true; map.current?.remove(); map.current = null; };
  }, [accessToken, resolved, styleUrl, live, interactive, coordinates]);

  if (!accessToken) {
    return <RouteMap route={toNormalised(coordinates.map(([lng, lat]) => [lat, lng]))} width={335} height={height} live={live} label={label} />;
  }
  return (
    <figure className={s.root} aria-labelledby={capId}>
      <figcaption id={capId} className="kv-visually-hidden">{label}</figcaption>
      <div ref={ref} className={s.map} style={{ height }} />
    </figure>
  );
}
