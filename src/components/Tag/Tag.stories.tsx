import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';
const meta: Meta<typeof Tag> = { title: 'Core/Tag', component: Tag, parameters: { docs: { description: { component: 'Small caps pills. `live` adds the accent dot, for things like recording, a new PR or the current split.' } } } };
export default meta; type S = StoryObj<typeof Tag>;
export const Tones: S = { render: () => <div style={{ display: 'flex', gap: 8 }}><Tag>Tempo</Tag><Tag tone="live">Recording</Tag><Tag tone="inverse">New 5K PR</Tag></div> };
