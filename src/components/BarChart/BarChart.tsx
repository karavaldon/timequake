import { useId } from 'react';
import s from './BarChart.module.css';

export interface BarChartProps { data: number[]; labels: string[]; unit: string; title: string; width?: number; height?: number; /** Index to highlight (default: last). */ highlight?: number; }

/** Weekly volume bars: outlined past bars, solid current bar, accent cap. Hidden data table included. Figma: Running › Bar Chart. */
export function BarChart({ data, labels, unit, title, width = 350, height = 160, highlight = data.length - 1 }: BarChartProps) {
  const id = useId(); const max = Math.max(...data) * 1.1; const gap = 6; const bw = (width - gap * (data.length - 1)) / data.length; const base = height - 22;
  return (
    <figure className={s.root}>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" role="img" aria-labelledby={`${id}-t`}>
        <title id={`${id}-t`}>{`${title}. This week ${data[highlight]} ${unit}.`}</title>
        <line x1={0} x2={width} y1={base + 0.5} y2={base + 0.5} className={s.axis} />
        {data.map((v, i) => { const h = (v / max) * (base - 18); const x = i * (bw + gap); const cur = i === highlight; return (
          <g key={i}>
            <rect x={x + 0.5} y={base - h + 0.5} width={bw - 1} height={h} className={cur ? s.cur : s.bar} />
            {cur && <><rect x={x} y={base - h - 3} width={bw} height={3} className={s.cap} /><text x={x + bw / 2} y={base - h - 8} textAnchor="middle" className={s.value}>{v}</text></>}
          </g>); })}
        {[0, Math.floor((labels.length - 1) / 2), labels.length - 1].map((i, k) => <text key={k} x={k === 0 ? 0 : k === 2 ? width : i * (bw + gap) + bw / 2} y={height - 4} textAnchor={k === 0 ? 'start' : k === 2 ? 'end' : 'middle'} className={s.tick}>{labels[i]}</text>)}
      </svg>
      <table className="kv-visually-hidden"><caption>{title}</caption><tbody>{data.map((v, i) => <tr key={i}><th scope="row">{labels[i]}</th><td>{v} {unit}</td></tr>)}</tbody></table>
    </figure>
  );
}
