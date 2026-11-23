import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';
const meta: Meta<typeof Toast> = { title: 'Core/Toast', component: Toast, parameters: { docs: { description: { component: 'Inverse strip, `role="status"`. Announce laps, zone changes and sync results here, not in the live readouts.' } } } };
export default meta; type S = StoryObj<typeof Toast>;
export const Examples: S = { render: () => <div style={{ display: 'grid', gap: 12 }}><Toast message="Lap 4 · 7:29" icon="flag" /><Toast message="Run synced from your watch" action={{ label: 'View', onClick: () => {} }} /></div> };
