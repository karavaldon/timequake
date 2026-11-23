import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SegmentedControl } from './SegmentedControl';
const meta: Meta = { title: 'Core/Segmented Control', parameters: { docs: { description: { component: 'Switch between 2–4 views of the same data. Arrow keys move between segments, and the selected one is inverted.' } } } };
export default meta;
export const Default: StoryObj = { render: () => { const [v, set] = useState<'w' | 'm' | 'y'>('w'); return <div style={{ maxWidth: 360 }}><SegmentedControl label="Range" value={v} onChange={set} options={[{ value: 'w', label: 'Week' }, { value: 'm', label: 'Month' }, { value: 'y', label: 'Year' }]} /></div>; } };
