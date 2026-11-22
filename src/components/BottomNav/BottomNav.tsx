import { Icon, type IconName } from '../Icon';
import s from './BottomNav.module.css';

export interface NavItem { id: string; label: string; icon: IconName; href?: string; }
export interface BottomNavProps { items?: NavItem[]; current: string; onChange?: (id: string) => void; }

export const DEFAULT_NAV: NavItem[] = [
  { id: 'today', label: 'Today', icon: 'house' }, { id: 'runs', label: 'Runs', icon: 'activity' },
  { id: 'trends', label: 'Trends', icon: 'chart-no-axes-column' }, { id: 'gear', label: 'Gear', icon: 'watch' },
];

/** 4 destinations, icons + caps labels. Current tab gets a top rule, not a colour. Figma: Core › Bottom Nav. */
export function BottomNav({ items = DEFAULT_NAV, current, onChange }: BottomNavProps) {
  return (
    <nav aria-label="Primary" className={s.root}>
      {items.map((it) => (
        <a key={it.id} href={it.href ?? '#'} aria-current={it.id === current ? 'page' : undefined} className={s.item} onClick={(e) => { if (onChange) { e.preventDefault(); onChange(it.id); } }}>
          <Icon name={it.icon} /><span>{it.label}</span>
        </a>
      ))}
    </nav>
  );
}
