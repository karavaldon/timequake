import type { Meta, StoryObj } from '@storybook/react';
import { Button, IconButton } from './Button';
const meta: Meta<typeof Button> = { title: 'Core/Button', component: Button, args: { children: 'Start run', variant: 'primary', size: 'md' },
  parameters: { docs: { description: { component: 'Labels are mono caps, like the printed words on a Casio case. **Primary is the one filled action per screen** (black in light, Volt in dark). Secondary is a square outline; ghost is an underlined text action. Min 48 px tall; icon-only buttons always get a `label`.' } } } };
export default meta; type S = StoryObj<typeof Button>;
export const Primary: S = {};
export const Variants: S = { render: () => <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}><Button>Start run</Button><Button variant="secondary">Pair device</Button><Button variant="ghost">See all</Button><Button disabled>Saving</Button></div> };
export const WithIcon: S = { args: { icon: 'play', size: 'lg', fullWidth: true }, render: (a) => <div style={{ maxWidth: 360 }}><Button {...a} /></div> };
export const IconButtons: S = { render: () => <div style={{ display: 'flex', gap: 8 }}><IconButton icon="share" label="Share run" /><IconButton icon="settings" label="Settings" variant="outline" /></div> };
