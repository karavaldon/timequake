import { cx } from '../../lib/cx';
import { Icon } from '../Icon';
import s from './Stat.module.css';

export interface StatProps {
  label: string;
  value: string;
  unit?: string;
  /** sm 16 · md 24 · lg 40 · xl 72 (data/* styles) */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Change vs a baseline, e.g. "+6 ms". Arrow comes from `trend`. */
  delta?: string;
  trend?: 'up' | 'down';
  /** live = accent value (recording now). */
  live?: boolean;
  /** Full spoken version when the visual is terse ("Pace 7 minutes 42 seconds per mile"). */
  ariaLabel?: string;
  align?: 'start' | 'end';
}

/** Label (caps) + mono value + unit. The atom of every data view. Figma: Running › Stat. */
export function Stat({ label, value, unit, size = 'md', delta, trend, live, ariaLabel, align = 'start' }: StatProps) {
  return (
    <div className={cx(s.stat, align === 'end' && s.end)} role="group" aria-label={ariaLabel ?? `${label} ${value}${unit ? ' ' + unit : ''}${delta ? ', ' + delta : ''}`}>
      <span className={s.label} aria-hidden>{label}</span>
      <span className={s.row} aria-hidden>
        <span className={cx(`kv-text-data-${size}`, live && s.live)}>{value}</span>
        {unit && <span className={s.unit}>{unit}</span>}
      </span>
      {delta && <span className={s.delta} aria-hidden>{trend && <Icon name={trend === 'up' ? 'trending-up' : 'trending-down'} size={16} />}{delta}</span>}
    </div>
  );
}
