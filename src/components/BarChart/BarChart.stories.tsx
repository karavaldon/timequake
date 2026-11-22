import type { Meta, StoryObj } from '@storybook/react';
import { sampleRoute, sampleRun, sampleHr, weeks, restingHr, hrvTrend, weeklyMiles, sampleLog } from '../../data/sample';
import { BarChart } from './BarChart';
const meta: Meta<typeof BarChart> = { title: 'Running/Bar Chart', component: BarChart, args: { data: weeklyMiles, labels: weeks, unit: 'mi', title: 'Weekly mileage' }, parameters: { docs: { description: { component: 'Weekly volume. Past weeks are outlines, this week is solid with an accent cap and its value.' } } } , decorators: [(S) => <div style={{ maxWidth: 380 }}><S /></div>] };
export default meta; type S = StoryObj<typeof BarChart>;
export const WeeklyMiles: S = {};
