import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './TextField';
const meta: Meta<typeof TextField> = { title: 'Core/Text Field', component: TextField, args: { label: 'Weekly goal', suffix: 'mi', defaultValue: '25', helper: 'We’ll pace your week around it.' },
  parameters: { docs: { description: { component: 'An underlined field with a caps label above it. Never use the placeholder as the label. Units sit in a suffix, and errors tell you what to do next.' } } } };
export default meta; type S = StoryObj<typeof TextField>;
export const Default: S = { render: (a) => <div style={{ maxWidth: 360 }}><TextField {...a} /></div> };
export const Error: S = { args: { defaultValue: '0', error: 'Enter a goal above 0 miles.' }, render: (a) => <div style={{ maxWidth: 360 }}><TextField {...a} /></div> };
