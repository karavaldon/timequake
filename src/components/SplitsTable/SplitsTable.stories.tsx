import type { Meta, StoryObj } from '@storybook/react';
import { sampleRoute, sampleRun, sampleHr, weeks, restingHr, hrvTrend, weeklyMiles, sampleLog } from '../../data/sample';
import { SplitsTable } from './SplitsTable';
const meta: Meta<typeof SplitsTable> = { title: 'Running/Splits Table', component: SplitsTable, args: { splits: sampleRun.splits }, parameters: { docs: { description: { component: 'A real table. The hairline bar next to each pace is longer when faster; the fastest split gets the accent and a tag.' } } } , decorators: [(S) => <div style={{ maxWidth: 380 }}><S /></div>] };
export default meta; type S = StoryObj<typeof SplitsTable>;
export const Default: S = {};
