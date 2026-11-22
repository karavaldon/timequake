import { useId } from 'react';
import s from './LineChart.module.css';

export interface LineChartProps {
  data: number[];
  /** x labels shown at start / middle / end (e.g. weeks). */
  labels?: string[];
  /** Normal range band, e.g. your usual HRV. */
  band?: [number, number];
  unit: string;
  /** Accessible title: "Resting heart rate, last 12 weeks". */
  title: string;
  width?: number; height?: number;
  /** Highlight + label the last value (default true). */
  highlightLast?: boolean;
  yTicks?: number;
}

/** Thin monochrome line chart: one line, hairline grid, mono labels, accent only on the latest point. Includes a visually-hidden data table. Figma: Running › Line Chart. */
export function LineChart({ data, labels = [], band, unit, title, width = 350, height = 180, highlightLast = true, yTicks = 3 }: LineChartProps) {
  const id = useId();
  const pad = { l: 0, r: 44, t: 12, b: labels.length ? 24 : 8 };
  const lo = Math.min(...data, ...(band ?? [])), hi = Math.max(...data, ...(band ?? []));
  const span = hi - lo || 1; const min = lo - span * 0.15, max = hi + span * 0.15;
  const X = (i: number) => pad.l + (i / Math.max(1, data.length - 1)) * (width - pad.l - pad.r);
  const Y = (v: number) => pad.t + (1 - (v - min) / (max - min)) * (height - pad.t - pad.b);
  const d = data.map((v, i) => (i ? 'L' : 'M') + X(i).toFixed(1) + ' ' + Y(v).toFixed(1)).join(' ');
  const ticks = Array.from({ length: yTicks }, (_, i) => Math.round(min + ((i + 0.5) / yTicks) * (max - min)));
  const last = data[data.length - 1];
  return (
    <figure className={s.root}>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" role="img" aria-labelledby={`${id}-t`} aria-describedby={`${id}-d`}>
        <title id={`${id}-t`}>{title}</title>
        <desc id={`${id}-d`}>{`Latest ${last} ${unit}. Range ${Math.min(...data)}–${Math.max(...data)} ${unit}.`}</desc>
        {band && <rect x={pad.l} width={width - pad.l - pad.r} y={Y(band[1])} height={Y(band[0]) - Y(band[1])} className={s.band} />}
        {ticks.map((t) => <g key={t}><line x1={pad.l} x2={width - pad.r} y1={Y(t)} y2={Y(t)} className={s.grid} /><text x={width - pad.r + 8} y={Y(t) + 4} className={s.tick}>{t}</text></g>)}
        <path d={d} className={s.line} />
        {highlightLast && <><circle cx={X(data.length - 1)} cy={Y(last)} r={4.5} className={s.dot} /><text x={X(data.length - 1) - 8} y={Y(last) - 10} textAnchor="end" className={s.value}>{last}</text></>}
        {labels.length > 0 && [0, Math.floor((labels.length - 1) / 2), labels.length - 1].map((i, k) => <text key={k} x={X(Math.round((i / Math.max(1, labels.length - 1)) * (data.length - 1)))} y={height - 6} textAnchor={k === 0 ? 'start' : k === 2 ? 'end' : 'middle'} className={s.tick}>{labels[i]}</text>)}
      </svg>
      <table className="kv-visually-hidden"><caption>{title}</caption><tbody>{data.map((v, i) => <tr key={i}><th scope="row">{labels[i] ?? i + 1}</th><td>{v} {unit}</td></tr>)}</tbody></table>
    </figure>
  );
}
