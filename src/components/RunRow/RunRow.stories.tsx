import type { Meta, StoryObj } from '@storybook/react';
import { sampleRoute, sampleRun, sampleHr, weeks, restingHr, hrvTrend, weeklyMiles, sampleLog } from '../../data/sample';
import { RunRow } from './RunRow';
const meta: Meta<typeof RunRow> = { title: 'Running/Run Row', component: RunRow, args: { ...sampleLog[0], route: sampleRoute }, parameters: { docs: { description: { component: 'A run in the log. The whole row is one link, with a spoken label; the route thumbnail is decorative.' } } } , decorators: [(S) => <div style={{ maxWidth: 390 }}><S /></div>] };
export default meta; type S = StoryObj<typeof RunRow>;
export const Default: S = {};
export const Log: S = { render: () => <div>{sampleLog.map((r) => <RunRow key={r.id} {...r} route={sampleRoute} />)}</div> };
