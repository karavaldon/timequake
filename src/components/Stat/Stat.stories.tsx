import type { Meta, StoryObj } from '@storybook/react';
import { Stat } from './Stat';
const meta: Meta<typeof Stat> = { title: 'Running/Stat', component: Stat, args: { label: 'Pace', value: '7:42', unit: '/mi', size: 'lg' }, parameters: { docs: { description: { component: 'Caps label, Chivo Mono value, caps unit. Sizes map to data/sm–xl. `live` turns the value accent (recording now). Pass `ariaLabel` when the visual is terse.' } } } };
export default meta; type S = StoryObj<typeof Stat>;
export const Default: S = {};
export const Sizes: S = { render: () => <div style={{ display: 'grid', gap: 24 }}><Stat label="Elapsed" value="47:52" size="xl" live /><Stat label="Distance" value="6.21" unit="mi" size="lg" /><Stat label="Avg HR" value="152" unit="bpm" size="md" /><Stat label="Cadence" value="172" unit="spm" size="sm" /></div> };
export const WithDelta: S = { args: { label: 'HRV', value: '71', unit: 'ms', delta: '+6 ms vs 4 wk', trend: 'up', size: 'lg' } };
