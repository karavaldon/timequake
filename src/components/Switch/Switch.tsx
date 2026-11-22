import { useId } from 'react';
import s from './Switch.module.css';

export interface SwitchProps { label: string; description?: string; checked: boolean; onChange: (v: boolean) => void; disabled?: boolean; }

/** Row with label + switch; the whole row is the target. Figma: Core › Switch. */
export function Switch({ label, description, checked, onChange, disabled }: SwitchProps) {
  const id = useId();
  return (
    <label className={s.row} htmlFor={id}>
      <span className={s.text}><span className={s.label}>{label}</span>{description && <span className={s.desc}>{description}</span>}</span>
      <input id={id} type="checkbox" role="switch" className={s.input} checked={checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} />
      <span className={s.track} aria-hidden><span className={s.knob} /></span>
    </label>
  );
}
