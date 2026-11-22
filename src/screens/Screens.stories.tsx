import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TopBar } from '../components/TopBar';
import { BottomNav } from '../components/BottomNav';
import { Button, IconButton } from '../components/Button';
import { ListRow } from '../components/ListRow';
import { SegmentedControl } from '../components/SegmentedControl';
import { DeviceStatus, DeviceChip } from '../components/DeviceStatus';
import { Switch } from '../components/Switch';
import { Stat } from '../components/Stat';
import { LiveMetrics } from '../components/LiveMetrics';
import { RunMap } from '../components/RunMap';
import { LineChart } from '../components/LineChart';
import { BarChart } from '../components/BarChart';
import { ZoneBar } from '../components/ZoneBar';
import { SplitsTable } from '../components/SplitsTable';
import { RunRow } from '../components/RunRow';
import { Icon } from '../components/Icon';
import { sampleGps, sampleRoute, sampleRun, sampleHr, weeks, restingHr, hrvTrend, weeklyMiles, sampleLog } from '../data/sample';
import s from './Screens.module.css';

const meta: Meta = { title: 'Screens/PWA', parameters: { layout: 'fullscreen', docs: { description: { component: 'Key PWA screens composed only from Timequake components. 390 × 844 frame. Every screen has one filled action at most.' } } } };
export default meta; type S = StoryObj;
const token = import.meta.env.STORYBOOK_MAPBOX_TOKEN as string | undefined;
const Head = ({ title, right }: { title: string; right?: string }) => <div className={s.head}><h2 className={s.capsPrimary} style={{ margin: 0 }}>{title}</h2>{right && <span className={s.caps}>{right}</span>}</div>;

export const Today: S = { render: () => (
  <div className={s.phone}>
    <TopBar large eyebrow="Saturday · Nov 21" title="Today" actions={<DeviceChip devices={[{ kind: 'watch', state: 'connected' }, { kind: 'strap', state: 'connected' }]} />} />
    <main className={s.main}>
      <section className={s.hero} aria-label="Readiness">
        <span className={s.caps}>Readiness</span>
        <p className={s.serif}>Recovered. A good day for something steady.</p>
        <div className={s.row3}><Stat label="HRV" value="71" unit="ms" delta="+6" trend="up" /><Stat label="Resting" value="52" unit="bpm" /><Stat label="Sleep" value="7:40" /></div>
      </section>
      <Button icon="play" size="lg" fullWidth>Start run</Button>
      <section className={s.section}><Head title="This week" right="28.4 / 30 mi" /><BarChart data={weeklyMiles.slice(-8)} labels={weeks.slice(-8)} unit="mi" title="Weekly mileage, last 8 weeks" height={120} /></section>
      <section className={s.section}><Head title="Last run" /><RunRow {...sampleLog[0]} route={sampleRoute} /></section>
    </main>
    <div className={s.nav}><BottomNav current="today" /></div>
  </div>) };

export const LiveRun: S = { render: () => (
  <div className={s.phone}>
    <TopBar title="Tempo · Lady Bird Lake" actions={<IconButton icon="lock" label="Lock screen" />} />
    <div className={s.live}>
      <RunMap coordinates={sampleGps.slice(0, 80)} accessToken={token} live height={180} label="Live route, 4.21 miles so far" />
      <LiveMetrics elapsed="32:18" pace="7:38" distance="4.21" heartRate={158} zone={4} />
      <div className={s.controls}>
        <button className={s.round} aria-label="Lap"><Icon name="flag" /></button>
        <button className={s.roundPrimary} aria-label="Pause run"><Icon name="pause" size={32} /></button>
        <button className={s.round} aria-label="Finish run"><Icon name="square" /></button>
      </div>
    </div>
  </div>) };

export const RunDetail: S = { render: () => (
  <div className={s.phone}>
    <TopBar title="Run" onBack={() => {}} actions={<IconButton icon="share" label="Share run" />} />
    <main className={s.main}>
      <section className={s.hero} style={{ paddingTop: 8 }}><span className={s.caps}>{sampleRun.date} · {sampleRun.place}</span><h1 className={s.serif}>{sampleRun.title}</h1></section>
      <RunMap coordinates={sampleGps} accessToken={token} height={220} label="6.21-mile loop around Lady Bird Lake" />
      <div className={s.row2}>
        <Stat label="Distance" value={sampleRun.distance} unit="mi" size="lg" /><Stat label="Time" value={sampleRun.time} size="lg" />
        <Stat label="Avg pace" value={sampleRun.pace} unit="/mi" size="md" /><Stat label="Avg HR" value={String(sampleRun.avgHr)} unit="bpm" size="md" />
        <Stat label="HRV" value={String(sampleRun.hrv)} unit="ms" size="md" /><Stat label="Elevation" value={sampleRun.elevation} unit="ft" size="md" />
      </div>
      <section className={s.section}><Head title="Heart rate" right={`Max ${sampleRun.maxHr}`} /><LineChart data={sampleHr} labels={['0:00', '24:00', '47:52']} unit="bpm" title="Heart rate during run" height={140} /></section>
      <section className={s.section}><Head title="Time in zone" /><ZoneBar zones={sampleRun.zones} /></section>
      <section className={s.section}><Head title="Splits" /><SplitsTable splits={sampleRun.splits} /></section>
    </main>
  </div>) };

function TrendsScreen() {
  const [range, setRange] = useState<'4w' | '12w' | '1y'>('12w');
  return (
    <div className={s.phone}>
      <TopBar large eyebrow="Last 12 weeks" title="Trends" />
      <main className={s.main}>
        <SegmentedControl label="Range" value={range} onChange={setRange} options={[{ value: '4w', label: '4W' }, { value: '12w', label: '12W' }, { value: '1y', label: '1Y' }]} />
        <section className={s.section}><Head title="Resting heart rate" right="−6 bpm" /><LineChart data={restingHr} labels={weeks} unit="bpm" title="Resting heart rate, last 12 weeks" /></section>
        <section className={s.section}><Head title="HRV" right="Normal 60–70" /><LineChart data={hrvTrend} labels={weeks} unit="ms" band={[60, 70]} title="HRV, last 12 weeks" /></section>
        <section className={s.section}><Head title="Weekly mileage" right="Avg 23.4" /><BarChart data={weeklyMiles} labels={weeks} unit="mi" title="Weekly mileage, last 12 weeks" /></section>
      </main>
      <div className={s.nav}><BottomNav current="trends" /></div>
    </div>);
}
export const Trends: S = { render: () => <TrendsScreen /> };

export const RunLog: S = { render: () => (
  <div className={s.phone}>
    <TopBar large eyebrow="November · 64.2 mi" title="Runs" actions={<IconButton icon="search" label="Search runs" />} />
    <main className={s.main} style={{ gap: 0 }}>{[...sampleLog, ...sampleLog].map((r, i) => <RunRow key={i} {...r} route={sampleRoute} />)}</main>
    <div className={s.nav}><BottomNav current="runs" /></div>
  </div>) };

function Toggles() {
  const [v, set] = useState({ a: true, b: true, c: false });
  return <>
    <Switch label="Auto-pause when stopped" checked={v.a} onChange={(a) => set({ ...v, a })} />
    <Switch label="Announce each mile" checked={v.b} onChange={(b) => set({ ...v, b })} />
    <Switch label="Record HRV during run" description="Uses more strap battery" checked={v.c} onChange={(c) => set({ ...v, c })} />
  </>;
}
export const Devices: S = { render: () => (
  <div className={s.phone}>
    <TopBar large eyebrow="Sensors" title="Gear" />
    <main className={s.main}>
      <section className={s.section}><Head title="Paired" />
        <DeviceStatus kind="watch" name="Timequake Watch" state="connected" battery={82} detail="Synced 2 min ago" />
        <DeviceStatus kind="strap" name="HR Strap" state="low-battery" battery={14} detail="Replace soon" />
      </section>
      <Button variant="secondary" icon="plus" fullWidth>Pair a device</Button>
      <section className={s.section}><Head title="Recording" />
        <Toggles />
        <ListRow title="Heart-rate zones" meta="Max 188 · LTHR 168" chevron href="#" />
        <ListRow title="Units" trailing="Miles" chevron href="#" />
      </section>
    </main>
    <div className={s.nav}><BottomNav current="gear" /></div>
  </div>) };
