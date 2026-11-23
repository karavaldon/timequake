import type { Meta, StoryObj } from '@storybook/react';
import { RunMap } from './RunMap';
import { RunRow } from '../RunRow';
import { staticMapUrl } from '../RouteMap';
import { sampleGps, sampleLog } from '../../data/sample';

const token = import.meta.env.STORYBOOK_MAPBOX_TOKEN as string | undefined;

const meta: Meta<typeof RunMap> = {
  title: 'Running/Run Map (Mapbox)', component: RunMap,
  args: { coordinates: sampleGps, accessToken: token, label: 'Loop around Lady Bird Lake, Mopac to Congress' },
  decorators: [(S) => <div style={{ maxWidth: 375 }}><S /></div>],
  parameters: { docs: { description: { component: `Real Mapbox tiles in the Timequake palette: \`mapboxStyle(theme)\` recolours Mapbox Streets v8 with map/* tokens, so the basemap flips with light/dark. Trails are dotted hairlines; the route sits on a land-coloured casing.

Set \`STORYBOOK_MAPBOX_TOKEN=pk.…\` in \`.env\` to see tiles. With no token it falls back to the offline SVG RouteMap (what you see now if the map looks stylised).

Thumbnails use \`staticMapUrl()\`. The Static Images API can't render Mapbox Standard, so it uses light-v11 / dark-v11, or your uploaded \`mapboxStyle\` via \`style: "you/styleId"\`.` } } },
};
export default meta; type S = StoryObj<typeof RunMap>;
export const Completed: S = {};
export const Live: S = { args: { coordinates: sampleGps.slice(0, Math.round(sampleGps.length * 0.6)), live: true, label: 'Live route so far' } };
export const Interactive: S = { args: { interactive: true, height: 360 } };
export const StaticThumbnails: S = {
  render: (_, { globals }) => (
    <div>{sampleLog.slice(0, 3).map((r) => (
      <RunRow key={r.id} {...r} thumbnailSrc={token ? staticMapUrl({ accessToken: token, coordinates: sampleGps, theme: globals.theme === 'light' ? 'light' : 'dark' }) : undefined} />
    ))}</div>
  ),
};
