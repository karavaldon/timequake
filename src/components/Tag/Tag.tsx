import { cx } from '../../lib/cx';
import s from './Tag.module.css';

export interface TagProps { children: string; /** live = accent dot + accent text (recording, new PR). */ tone?: 'default' | 'live' | 'inverse'; }

/** Small caps pill. Figma: Core › Tag. */
export function Tag({ children, tone = 'default' }: TagProps) {
  return <span className={cx(s.tag, s[tone])}>{tone === 'live' && <span className={s.dot} aria-hidden />}{children}</span>;
}
