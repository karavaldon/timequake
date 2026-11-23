import type { Meta, StoryObj } from '@storybook/react';
import { ListRow } from './ListRow';
const meta: Meta<typeof ListRow> = { title: 'Core/List Row', component: ListRow, parameters: { docs: { description: { component: 'Hairline-separated rows. Values on the right are mono. Becomes a link or button with `href` / `onClick`.' } } } };
export default meta; type S = StoryObj<typeof ListRow>;
export const Rows: S = { render: () => <div style={{ maxWidth: 375 }}><ListRow title="Auto-pause" meta="On" chevron onClick={() => {}} /><ListRow icon="heart-pulse" title="Max heart rate" trailing="186 bpm" /><ListRow icon="map" title="Map style" meta="Black & white" chevron href="#" /></div> };
