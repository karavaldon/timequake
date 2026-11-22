import { RouteMap } from '../RouteMap';
import { Tag } from '../Tag';
import s from './RunRow.module.css';

export interface RunRowProps { title: string; date: string; distance: string; time: string; pace: string; unit?: 'mi' | 'km'; tag?: string; route?: [number, number][]; /** Static map image (staticMapUrl()). Wins over `route`. */ thumbnailSrc?: string; href?: string; }

/** Run-log row: tiny route, date caps, title, three mono stats. Whole row is one link, named by its visible text. Figma: Running › Run Row. */
export function RunRow({ title, date, distance, time, pace, unit = 'mi', tag, route, thumbnailSrc, href = '#' }: RunRowProps) {
  return (
    <a className={s.row} href={href}>
      {thumbnailSrc ? <img className={s.thumb} src={thumbnailSrc} alt="" width={56} height={56} loading="lazy" />
        : route && <span className={s.thumb} aria-hidden><RouteMap route={route} width={56} height={56} label="" thumbnail /></span>}
      <span className={s.body}>
        <span className={s.top}><span className={s.date}>{date}</span>{tag && <Tag tone="inverse">{tag}</Tag>}</span>
        <span className={s.title}>{title}</span>
        <span className={s.stats}><span>{distance} <small>{unit}</small></span><span><span className="kv-visually-hidden">in </span>{time}</span><span>{pace} <small>/{unit}</small></span></span>
      </span>
    </a>
  );
}
