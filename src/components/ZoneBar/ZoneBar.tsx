import s from './ZoneBar.module.css';

export interface ZoneBarProps { /** Percent of time in Z1–Z5 (sums to ~100). */ zones: [number, number, number, number, number]; title?: string; }
const NAMES = ['Recovery', 'Endurance', 'Tempo', 'Threshold', 'Max'];

/** Time in heart-rate zones: one stacked bar + a labelled list. Zones are a single-hue ramp and always labelled. Figma: Running › Zone Bar. */
export function ZoneBar({ zones, title = 'Time in zone' }: ZoneBarProps) {
  return (
    <section className={s.root} aria-label={title}>
      <div className={s.bar} aria-hidden>{zones.map((p, i) => p > 0 && <span key={i} style={{ width: `${p}%`, background: `var(--kv-color-data-zone-${i + 1})` }} />)}</div>
      <ul className={s.list}>
        {zones.map((p, i) => <li key={i}><span className={s.sw} style={{ background: `var(--kv-color-data-zone-${i + 1})` }} aria-hidden /><span className={s.z}>Z{i + 1}</span><span className={s.n}>{NAMES[i]}</span><span className={s.p}>{p}%</span></li>)}
      </ul>
    </section>
  );
}
