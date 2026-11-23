import type { Meta, StoryObj } from '@storybook/react';
import { sampleRoute, sampleRun, sampleHr, weeks, restingHr, hrvTrend, weeklyMiles, sampleLog } from '../../data/sample';
import { RouteMap } from './RouteMap';
const meta: Meta<typeof RouteMap> = { title: 'Running/Route Map', component: RouteMap, args: { route: sampleRoute, label: '6.21-mile loop around Lady Bird Lake', markers: [{ at: 20, label: '1' }, { at: 40, label: '2' }, { at: 60, label: '3' }, { at: 80, label: '4' }, { at: 100, label: '5' }] }, parameters: { docs: { description: { component: 'The route drawn on a plain hairline grid of 24 px squares. It is a sketch, not a map, and the route is the only solid line. Live routes use the accent and end in a position dot. It works offline. For real map tiles, use Running › Run Map (Mapbox), which falls back to this.' } } } };
export default meta; type S = StoryObj<typeof RouteMap>;
export const Completed: S = {};
export const Live: S = { args: { route: sampleRoute.slice(0, 74), live: true, markers: [{ at: 20, label: '1' }, { at: 40, label: '2' }, { at: 60, label: '3' }], label: 'Live route, 3.1 miles so far' } };
export const Thumbnail: S = { args: { width: 56, height: 56, thumbnail: true, markers: [], label: 'Route thumbnail' } };
