import { colors } from '../../tokens/tokens';

export type MapTheme = 'light' | 'dark';
const c = (t: keyof typeof colors, theme: MapTheme) => colors[t][theme];
const hex = (t: keyof typeof colors, theme: MapTheme) => c(t, theme).replace('#', '');

/**
 * Mapbox GL style built from Timequake map/* tokens on Mapbox Streets v8 vector tiles.
 * - Use directly: new mapboxgl.Map({ style: mapboxStyle('dark') })
 * - Or upload the JSON to Mapbox Studio (Styles → Upload) to get a style ID for staticMapUrl().
 * Running paths are drawn as dotted hairlines so trails read clearly under a route.
 */
export function mapboxStyle(theme: MapTheme) {
  const minor = ['street', 'street_limited', 'service', 'secondary', 'tertiary'];
  const major = ['motorway', 'trunk', 'primary'];
  return {
    version: 8,
    name: `Timequake ${theme}`,
    glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
    sources: { streets: { type: 'vector', url: 'mapbox://mapbox.mapbox-streets-v8' } },
    layers: [
      { id: 'land', type: 'background', paint: { 'background-color': c('map/land', theme) } },
      { id: 'park', type: 'fill', source: 'streets', 'source-layer': 'landuse', filter: ['in', ['get', 'class'], ['literal', ['park', 'pitch', 'grass', 'cemetery']]], paint: { 'fill-color': c('map/park', theme) } },
      { id: 'water', type: 'fill', source: 'streets', 'source-layer': 'water', paint: { 'fill-color': c('map/water', theme) } },
      { id: 'waterway', type: 'line', source: 'streets', 'source-layer': 'waterway', paint: { 'line-color': c('map/water', theme), 'line-width': ['interpolate', ['linear'], ['zoom'], 10, 0.5, 16, 3] } },
      { id: 'path', type: 'line', source: 'streets', 'source-layer': 'road', minzoom: 13, filter: ['==', ['get', 'class'], 'path'], paint: { 'line-color': c('map/road-major', theme), 'line-width': 1, 'line-dasharray': [1, 2] } },
      { id: 'road', type: 'line', source: 'streets', 'source-layer': 'road', filter: ['in', ['get', 'class'], ['literal', minor]], layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': c('map/road', theme), 'line-width': ['interpolate', ['linear'], ['zoom'], 12, 0.5, 16, 2.5] } },
      { id: 'road-major', type: 'line', source: 'streets', 'source-layer': 'road', filter: ['in', ['get', 'class'], ['literal', major]], layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': c('map/road-major', theme), 'line-width': ['interpolate', ['linear'], ['zoom'], 10, 1, 16, 5] } },
      { id: 'road-label', type: 'symbol', source: 'streets', 'source-layer': 'road', minzoom: 14, filter: ['has', 'name'],
        layout: { 'symbol-placement': 'line', 'text-field': ['get', 'name'], 'text-font': ['DIN Pro Regular', 'Arial Unicode MS Regular'], 'text-size': 10, 'text-letter-spacing': 0.1, 'text-transform': 'uppercase' },
        paint: { 'text-color': c('map/label', theme), 'text-halo-color': c('map/land', theme), 'text-halo-width': 1.5 } },
      { id: 'place-label', type: 'symbol', source: 'streets', 'source-layer': 'place_label', filter: ['in', ['get', 'class'], ['literal', ['settlement_subdivision', 'settlement']]],
        layout: { 'text-field': ['get', 'name'], 'text-font': ['DIN Pro Medium', 'Arial Unicode MS Regular'], 'text-size': 11, 'text-letter-spacing': 0.12, 'text-transform': 'uppercase' },
        paint: { 'text-color': c('map/label', theme), 'text-halo-color': c('map/land', theme), 'text-halo-width': 1.5 } },
    ],
  };
}

/** Route layers to add on top of any basemap. Coordinates are [lng, lat]. */
export function routeLayers(theme: MapTheme, live = false) {
  const route = c(live ? 'map/route-live' : 'map/route', theme);
  return [
    { id: 'route-casing', type: 'line', source: 'route', layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': c('map/land', theme), 'line-width': 7 } },
    { id: 'route', type: 'line', source: 'route', layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': route, 'line-width': 3 } },
    { id: 'route-start', type: 'circle', source: 'route-ends', filter: ['==', ['get', 'kind'], 'start'], paint: { 'circle-radius': 5, 'circle-color': c('map/land', theme), 'circle-stroke-color': c('map/route', theme), 'circle-stroke-width': 2 } },
    { id: 'route-end', type: 'circle', source: 'route-ends', filter: ['==', ['get', 'kind'], 'end'], paint: { 'circle-radius': live ? 7 : 5, 'circle-color': route, 'circle-stroke-color': c('map/land', theme), 'circle-stroke-width': live ? 3 : 0 } },
  ] as const;
}

/** Google/Mapbox encoded polyline (precision 5). Input [lng, lat]. */
export function encodePolyline(coords: [number, number][]) {
  let out = '', pLat = 0, pLng = 0;
  const enc = (v: number) => { v = v < 0 ? ~(v << 1) : v << 1; let s = ''; while (v >= 0x20) { s += String.fromCharCode((0x20 | (v & 0x1f)) + 63); v >>= 5; } return s + String.fromCharCode(v + 63); };
  for (const [lng, lat] of coords) { const a = Math.round(lat * 1e5), b = Math.round(lng * 1e5); out += enc(a - pLat) + enc(b - pLng); pLat = a; pLng = b; }
  return out;
}

const thin = <T,>(a: T[], max: number) => (a.length <= max ? a : a.filter((_, i) => i % Math.ceil(a.length / max) === 0 || i === a.length - 1));

export interface StaticMapOptions {
  accessToken: string;
  coordinates: [number, number][];
  theme?: MapTheme;
  width?: number; height?: number;
  /** "username/styleId" of the uploaded mapboxStyle(). Defaults to Mapbox light-v11 / dark-v11 (both grayscale). */
  style?: string;
  live?: boolean;
  padding?: number;
  /** Logo + attribution on the image. Turn off only if the screen credits © Mapbox © OpenStreetMap elsewhere. */
  attribution?: boolean;
}

/** Static Images API URL for run-log thumbnails and share cards. (Static API does not support Mapbox Standard.) */
export function staticMapUrl({ accessToken, coordinates, theme = 'light', width = 112, height = 112, style, live = false, padding = 10, attribution = false }: StaticMapOptions) {
  const s = style ?? (theme === 'dark' ? 'mapbox/dark-v11' : 'mapbox/light-v11');
  const path = `path-3+${hex(live ? 'map/route-live' : 'map/route', theme)}-1(${encodeURIComponent(encodePolyline(thin(coordinates, 180)))})`;
  const q = new URLSearchParams({ padding: String(padding), attribution: String(attribution), logo: String(attribution), access_token: accessToken });
  return `https://api.mapbox.com/styles/v1/${s}/static/${path}/auto/${width}x${height}@2x?${q}`;
}
