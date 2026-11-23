import { Stat } from '../Stat';
import { Tag } from '../Tag';
import s from './LiveMetrics.module.css';

export interface LiveMetricsProps {
  elapsed: string; pace: string; distance: string; heartRate: number;
  zone: 1 | 2 | 3 | 4 | 5; unit?: 'mi' | 'km'; paused?: boolean;
}
const ZN = ['Recovery', 'Endurance', 'Tempo', 'Threshold', 'Max'];
const said = (t: string) => { const p = t.split(':').map(Number); const [h, m, sec] = p.length === 3 ? p : [0, ...p]; return `${h ? h + ' h ' : ''}${m} min ${sec} s`; };

/** The live-run readout: elapsed (hero), pace, distance, heart rate + zone. Not a live region; announce laps and zone changes with Toast. Figma: Running › Live Metrics. */
export function LiveMetrics({ elapsed, pace, distance, heartRate, zone, unit = 'mi', paused }: LiveMetricsProps) {
  return (
    <section className={s.root} aria-label={paused ? 'Live run, paused' : 'Live run'}>
      <div className={s.status}>{paused ? <Tag>Paused</Tag> : <Tag tone="live">Recording</Tag>}<span className={s.zone}>Z{zone} · {ZN[zone - 1]}</span></div>
      <Stat label="Elapsed" value={elapsed} size="xl" live={!paused} ariaLabel={`Elapsed ${said(elapsed)}`} />
      <div className={s.grid}>
        <Stat label="Pace" value={pace} unit={`/${unit}`} size="lg" ariaLabel={`Pace ${said(pace)} per ${unit === 'mi' ? 'mile' : 'kilometre'}`} />
        <Stat label="Distance" value={distance} unit={unit} size="lg" />
        <Stat label="Heart rate" value={String(heartRate)} unit="bpm" size="lg" ariaLabel={`Heart rate ${heartRate} beats per minute, zone ${zone} ${ZN[zone - 1]}`} />
        <div className={s.zones} aria-hidden>
          <span className={s.zlabel}>Zone</span>
          <span className={s.blocks}>{[1, 2, 3, 4, 5].map((z) => <span key={z} data-on={z <= zone || undefined} data-cur={z === zone || undefined}>{z}</span>)}</span>
        </div>
      </div>
    </section>
  );
}
