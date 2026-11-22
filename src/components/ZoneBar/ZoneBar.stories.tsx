import type { Meta, StoryObj } from '@storybook/react';
import { sampleRoute, sampleRun, sampleHr, weeks, restingHr, hrvTrend, weeklyMiles, sampleLog } from '../../data/sample';
import { ZoneBar } from './ZoneBar';
const meta: Meta<typeof ZoneBar> = { title: 'Running/Zone Bar', component: ZoneBar, args: { zones: sampleRun.zones }, parameters: { docs: { description: { component: 'Time in heart-rate zones. A single-hue ramp that ends in the accent at Z5, never a rainbow, and always labelled Z1–Z5 so the colours are not load-bearing.' } } } , decorators: [(S) => <div style={{ maxWidth: 380 }}><S /></div>] };
export default meta; type S = StoryObj<typeof ZoneBar>;
export const Default: S = {};
