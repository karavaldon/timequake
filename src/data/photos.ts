import type { PhotoRatio } from '../components/Photo';

/**
 * Photo library. Drop files into public/photos/ with these names (JPG, 2× the export size is fine).
 * Until a file exists, <Photo> shows a labelled placeholder. Same slot names as the Figma Photography page.
 */
export const photoSlots = {
  'hero/today':            { ratio: '16:9', file: 'hero-today.jpg',            alt: 'Morning light on the trail', use: 'Today header' },
  'hero/onboarding':       { ratio: '16:9', file: 'hero-onboarding.jpg',       alt: 'Wide view of the lake trail', use: 'First launch' },
  'run/cover-lady-bird':   { ratio: '4:5',  file: 'run-cover-lady-bird.jpg',   alt: 'Lady Bird Lake from the trail', use: 'Run cover' },
  'run/cover-long':        { ratio: '4:5',  file: 'run-cover-long.jpg',        alt: 'Long run, open road', use: 'Run cover' },
  'run/cover-track':       { ratio: '4:5',  file: 'run-cover-track.jpg',       alt: 'Track lanes', use: 'Run cover' },
  'gear/watch':            { ratio: '1:1',  file: 'gear-watch.jpg',            alt: 'Watch on wrist', use: 'Gear' },
  'gear/strap':            { ratio: '1:1',  file: 'gear-strap.jpg',            alt: 'Heart-rate strap, detail', use: 'Gear' },
  'gear/shoes':            { ratio: '1:1',  file: 'gear-shoes.jpg',            alt: 'Worn running shoes', use: 'Gear' },
  'place/butler-trail':    { ratio: '3:2',  file: 'place-butler-trail.jpg',    alt: 'Butler Trail', use: 'Place' },
  'place/town-lake-bridge':{ ratio: '3:2',  file: 'place-town-lake-bridge.jpg',alt: 'Underneath a bridge on the lake', use: 'Place' },
  'share/story':           { ratio: '9:16', file: 'share-story.jpg',           alt: '', use: 'Share card background' },
  'editorial/weather':     { ratio: '3:2',  file: 'editorial-weather.jpg',     alt: 'Running in the weather', use: 'Editorial' },
} satisfies Record<string, { ratio: PhotoRatio; file: string; alt: string; use: string }>;

export type PhotoSlot = keyof typeof photoSlots;
export const photoSrc = (slot: PhotoSlot, base = '/photos/') => base + photoSlots[slot].file;
