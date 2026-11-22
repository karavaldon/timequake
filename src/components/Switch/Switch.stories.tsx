import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch } from './Switch';
const meta: Meta<typeof Switch> = { title: 'Core/Switch', component: Switch, parameters: { docs: { description: { component: 'Row-level switch (`role="switch"`); the whole row is the target. On = `bg/action`.' } } } };
export default meta; type S = StoryObj<typeof Switch>;
export const Default: S = { render: () => { const [a, setA] = useState(true); const [b, setB] = useState(false); return <div style={{ maxWidth: 380 }}><Switch label="Auto-pause" description="Pause when you stop moving" checked={a} onChange={setA} /><Switch label="Lap every mile" checked={b} onChange={setB} /></div>; } };
