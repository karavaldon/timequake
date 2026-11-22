import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Sheet } from './Sheet';
import { Button } from '../Button';
import { ListRow } from '../ListRow';
const meta: Meta<typeof Sheet> = { title: 'Core/Sheet', component: Sheet, parameters: { docs: { description: { component: 'Bottom sheet on native `<dialog>`: focus is trapped, Esc and the backdrop close it, focus returns to the trigger.' } } } };
export default meta; type S = StoryObj<typeof Sheet>;
export const Default: S = { render: () => { const [o, set] = useState(false); return <><Button variant="secondary" onClick={() => set(true)}>Run type</Button><Sheet open={o} onClose={() => set(false)} title="Run type"><ListRow title="Easy" onClick={() => set(false)} /><ListRow title="Tempo" onClick={() => set(false)} /><ListRow title="Intervals" onClick={() => set(false)} /></Sheet></>; } };
