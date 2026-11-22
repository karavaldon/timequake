import type { ReactNode } from 'react';
import { IconButton } from '../Button';
import s from './TopBar.module.css';

export interface TopBarProps {
  title: string;
  /** Caps line above a large title ("Sat · Nov 21"). */
  eyebrow?: string;
  /** large = serif page title below the bar (top-level screens). */
  large?: boolean;
  onBack?: () => void;
  actions?: ReactNode;
}

/** Figma: Core › Top Bar (Default / Large). */
export function TopBar({ title, eyebrow, large, onBack, actions }: TopBarProps) {
  return (
    <header className={s.root}>
      <div className={s.bar}>
        <span className={s.lead}>{onBack && <IconButton icon="chevron-left" label="Back" onClick={onBack} />}</span>
        {!large && <span className={s.title}>{title}</span>}
        <span className={s.actions}>{actions}</span>
      </div>
      {large && <div className={s.large}>{eyebrow && <span className={s.eyebrow}>{eyebrow}</span>}<h1 className="kv-text-display-lg" style={{ margin: 0 }}>{title}</h1></div>}
    </header>
  );
}
