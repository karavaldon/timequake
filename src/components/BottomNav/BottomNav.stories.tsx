import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { BottomNav } from './BottomNav';
const meta: Meta<typeof BottomNav> = { title: 'Core/Bottom Nav', component: BottomNav, parameters: { docs: { description: { component: 'Four destinations: Today, Runs, Trends, Gear. The current tab gets a top rule and full-contrast text — not a colour. Respects the home-indicator safe area.' } } } };
export default meta; type S = StoryObj<typeof BottomNav>;
export const Default: S = { render: () => { const [c, set] = useState('today'); return <div style={{ maxWidth: 390 }}><BottomNav current={c} onChange={set} /></div>; } };
