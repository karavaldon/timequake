import type { Meta, StoryObj } from '@storybook/react';
import { Photo } from './Photo';
import { photoSlots, photoSrc, type PhotoSlot } from '../../data/photos';

const meta: Meta<typeof Photo> = {
  title: 'Core/Photo', component: Photo,
  args: { ratio: '4:5', alt: 'Lady Bird Lake from the trail', slot: 'run/cover-lady-bird', src: photoSrc('run/cover-lady-bird'), caption: 'Thu · Nov 19 · Lady Bird Lake' },
  decorators: [(S) => <div style={{ maxWidth: 360 }}><S /></div>],
  parameters: { docs: { description: { component: 'A black-and-white photo in one of five crops, with its caption below in caps. Text never goes on the photo. If the file is missing it shows a labelled placeholder, so you can drop photos into `public/photos/` one at a time.' } } },
};
export default meta; type S = StoryObj<typeof Photo>;
export const RunCover: S = {};
export const Placeholder: S = { args: { src: undefined } };
export const Library: S = {
  decorators: [(S) => <div><S /></div>],
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 24 }}>
      {(Object.keys(photoSlots) as PhotoSlot[]).map((k) => { const p = photoSlots[k]; return <Photo key={k} src={photoSrc(k)} ratio={p.ratio} alt={p.alt} slot={k} caption={k} />; })}
    </div>
  ),
};
