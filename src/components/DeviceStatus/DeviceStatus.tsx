import { cx } from '../../lib/cx';
import { Icon } from '../Icon';
import s from './DeviceStatus.module.css';

export type DeviceKind = 'watch' | 'strap';
export type DeviceState = 'connected' | 'syncing' | 'disconnected' | 'low-battery';
export interface Device { kind: DeviceKind; name: string; state: DeviceState; battery?: number; detail?: string; }

const STATE_TEXT: Record<DeviceState, string> = { connected: 'Connected', syncing: 'Syncing', disconnected: 'Not connected', 'low-battery': 'Low battery' };

/** One paired device: watch or sensor strap. Figma: Core › Device Status (Kind × State). */
export function DeviceStatus({ kind, name, state, battery, detail }: Device) {
  return (
    <div className={s.row} role="group" aria-label={`${name}, ${STATE_TEXT[state]}`}>
      <span className={s.icon}><Icon name={kind === 'watch' ? 'watch' : 'heart-pulse'} /></span>
      <span className={s.text}><span className={s.name}>{name}</span><span className={cx(s.state, state === 'disconnected' && s.off, state === 'low-battery' && s.warn)}>{state !== 'disconnected' && <span className={s.dot} aria-hidden />}{STATE_TEXT[state]}{detail ? ` · ${detail}` : ''}</span></span>
      {battery !== undefined && <span className={s.battery}><Icon name={battery <= 15 ? 'battery-low' : 'battery-medium'} size={20} />{battery}%<span className="kv-visually-hidden"> battery</span></span>}
    </div>
  );
}

/** Compact header chip: "● WATCH · STRAP". Dot is live accent when both are connected. */
export function DeviceChip({ devices }: { devices: Pick<Device, 'kind' | 'state'>[] }) {
  const ok = devices.every((d) => d.state === 'connected' || d.state === 'syncing');
  const label = devices.map((d) => (d.kind === 'watch' ? 'Watch' : 'Strap')).join(' · ');
  return <span className={s.chip} role="status" aria-label={`${label} ${ok ? 'connected' : 'not all connected'}`}><span className={cx(s.dot, !ok && s.dotOff)} aria-hidden />{label}</span>;
}
