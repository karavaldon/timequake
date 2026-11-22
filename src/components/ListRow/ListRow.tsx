import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { Icon, type IconName } from '../Icon';
import s from './ListRow.module.css';

export interface ListRowProps {
  title: string;
  /** Caps meta line under the title ("Thu · Lady Bird Lake"). */
  meta?: string;
  icon?: IconName;
  /** Right side: a value (rendered mono) or any node. */
  trailing?: ReactNode;
  chevron?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
}

/** Hairline-separated row. Becomes a link/button when href/onClick is set. Figma: Core › List Row. */
export function ListRow({ title, meta, icon, trailing, chevron, href, onClick, className }: ListRowProps) {
  const body = (<>
    {icon && <Icon name={icon} />}
    <span className={s.text}><span className={s.title}>{title}</span>{meta && <span className={s.meta}>{meta}</span>}</span>
    {trailing != null && <span className={cx(s.trailing, typeof trailing === 'string' && s.mono)}>{trailing}</span>}
    {chevron && <Icon name="chevron-right" size={20} />}
  </>);
  if (href) return <a href={href} className={cx(s.row, s.interactive, className)}>{body}</a>;
  if (onClick) return <button type="button" onClick={onClick} className={cx(s.row, s.interactive, className)}>{body}</button>;
  return <div className={cx(s.row, className)}>{body}</div>;
}
