import s from './SplitsTable.module.css';
import { Tag } from '../Tag';

export interface Split { mile: number; pace: string; hr: number; elev: string; }
export interface SplitsTableProps { splits: Split[]; unit?: 'mi' | 'km'; }
const sec = (p: string) => { const [m, x] = p.split(':').map(Number); return m * 60 + x; };

/** Real <table>: mile, pace (with a hairline bar), HR, elevation. Fastest split tagged. Figma: Running › Splits Table. */
export function SplitsTable({ splits, unit = 'mi' }: SplitsTableProps) {
  const t = splits.map((x) => sec(x.pace)); const fast = Math.min(...t), slow = Math.max(...t);
  return (
    <table className={s.table}>
      <caption className="kv-visually-hidden">Splits per {unit === 'mi' ? 'mile' : 'kilometre'}</caption>
      <thead><tr><th scope="col">{unit}</th><th scope="col">Pace</th><th scope="col" className={s.r}>HR</th><th scope="col" className={s.r}>Elev</th></tr></thead>
      <tbody>{splits.map((x, i) => { const w = 30 + 70 * (1 - (t[i] - fast) / Math.max(1, slow - fast)); return (
        <tr key={x.mile}>
          <th scope="row">{x.mile}</th>
          <td><span className={s.pace}><span className={s.v}>{x.pace}</span><span className={s.track} aria-hidden><span style={{ width: `${w}%` }} data-fast={t[i] === fast || undefined} /></span>{t[i] === fast && <Tag tone="live">Fastest</Tag>}</span></td>
          <td className={s.r}>{x.hr}</td><td className={s.r}>{x.elev}</td>
        </tr>); })}</tbody>
    </table>
  );
}
