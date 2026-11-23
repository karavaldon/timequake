import type { Meta, StoryObj } from '@storybook/react';
import { TopBar } from './TopBar';
import { IconButton } from '../Button';
const meta: Meta<typeof TopBar> = { title: 'Core/Top Bar', component: TopBar, parameters: { docs: { description: { component: 'Default bar for sub-screens (back · title · actions); Large for top-level tabs (caps eyebrow + serif title).' } } } };
export default meta; type S = StoryObj<typeof TopBar>;
export const Default: S = { render: () => <div style={{ maxWidth: 375 }}><TopBar title="Morning tempo" onBack={() => {}} actions={<IconButton icon="share" label="Share" />} /></div> };
export const Large: S = { render: () => <div style={{ maxWidth: 375 }}><TopBar large eyebrow="Sat · Nov 21" title="Today" actions={<IconButton icon="settings" label="Settings" />} /></div> };
