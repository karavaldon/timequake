import { useEffect, useState } from 'react';
import { cx } from '../../lib/cx';
import s from './Photo.module.css';

export type PhotoRatio = '16:9' | '3:2' | '4:5' | '1:1' | '9:16';

export interface PhotoProps {
  src?: string;
  /** Describe what's in the photo. Use "" only for purely decorative images. */
  alt: string;
  ratio?: PhotoRatio;
  /** Black-and-white treatment (grayscale + a little contrast). Default on — the system has no colour photos. */
  mono?: boolean;
  /** Caps caption below the photo. Never on top of it. */
  caption?: string;
  credit?: string;
  /** Slot name shown on the placeholder (e.g. "run/cover-lady-bird"). */
  slot?: string;
  className?: string;
}

/** Black-and-white photo in a fixed crop, caption below. Missing or broken src → labelled placeholder. Figma: Photography › Photo / <ratio>. */
export function Photo({ src, alt, ratio = '4:5', mono = true, caption, credit, slot, className }: PhotoProps) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  const [w, h] = ratio.split(':').map(Number);
  const empty = !src || failed;
  return (
    <figure className={cx(s.root, className)}>
      <div className={s.frame} style={{ aspectRatio: `${w} / ${h}` }}>
        {empty ? (
          <div className={s.placeholder} {...(alt ? { role: 'img', 'aria-label': `Photo placeholder: ${alt}` } : { 'aria-hidden': true })}>
            <svg className={s.cross} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden><path d="M0 0L100 100M100 0L0 100" vectorEffect="non-scaling-stroke" /></svg>
            <span className={s.label}><span>{ratio}</span>{slot && <span className={s.slot}>{slot}</span>}</span>
          </div>
        ) : (
          <img className={cx(s.img, mono && s.mono)} src={src} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} />
        )}
      </div>
      {(caption || credit) && <figcaption className={s.caption}>{caption}{caption && credit && ' · '}{credit && <span className={s.credit}>{credit}</span>}</figcaption>}
    </figure>
  );
}
