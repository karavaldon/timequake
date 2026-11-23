import type { Meta, StoryObj } from '@storybook/react';
import { LiveMetrics } from './LiveMetrics';
const meta: Meta<typeof LiveMetrics> = { title: 'Running/Live Metrics', component: LiveMetrics, args: { elapsed: '32:18', pace: '7:38', distance: '4.21', heartRate: 158, zone: 4 }, parameters: { docs: { description: { component: 'The live-run readout. Elapsed is the hero; pace, distance and HR sit under one hairline. The current zone is the only accent block. It is not an aria-live region, because that would talk every second. Announce laps and zone changes with Toast instead.' } } } , decorators: [(S) => <div style={{ maxWidth: 360 }}><S /></div>] };
export default meta; type S = StoryObj<typeof LiveMetrics>;
export const Recording: S = {};
export const Paused: S = { args: { paused: true, zone: 2, heartRate: 131 } };
