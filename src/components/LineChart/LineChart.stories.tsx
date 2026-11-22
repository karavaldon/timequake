import type { Meta, StoryObj } from '@storybook/react';
import { sampleRoute, sampleRun, sampleHr, weeks, restingHr, hrvTrend, weeklyMiles, sampleLog } from '../../data/sample';
import { LineChart } from './LineChart';
const meta: Meta<typeof LineChart> = { title: 'Running/Line Chart', component: LineChart, args: { data: restingHr, labels: weeks, unit: 'bpm', title: 'Resting heart rate, last 12 weeks' }, parameters: { docs: { description: { component: 'One line, hairline grid, mono labels on the right, accent only on the latest point. `band` draws your normal range. Every chart carries a visually-hidden table of its values.' } } } , decorators: [(S) => <div style={{ maxWidth: 380 }}><S /></div>] };
export default meta; type S = StoryObj<typeof LineChart>;
export const RestingHR: S = {};
export const HRVWithBand: S = { args: { data: hrvTrend, unit: 'ms', band: [60, 70], title: 'HRV, last 12 weeks' } };
export const HeartRateDuringRun: S = { args: { data: sampleHr, labels: ['0:00', '24:00', '47:52'], unit: 'bpm', title: 'Heart rate during run', height: 140 } };
