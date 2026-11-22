import { useId, type InputHTMLAttributes } from 'react';
import s from './TextField.module.css';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  helper?: string;
  error?: string;
  /** Unit shown after the value ("mi", "bpm"). */
  suffix?: string;
}

/** Underline field with a caps label above (never placeholder-as-label). Figma: Core › Text Field. */
export function TextField({ label, helper, error, suffix, id, ...rest }: TextFieldProps) {
  const uid = useId(); const fid = id ?? uid; const hid = `${fid}-hint`;
  return (
    <div className={s.root} data-error={error ? '' : undefined}>
      <label htmlFor={fid} className={s.label}>{label}</label>
      <div className={s.box}>
        <input id={fid} className={s.input} aria-invalid={error ? true : undefined} aria-describedby={helper || error ? hid : undefined} {...rest} />
        {suffix && <span className={s.suffix} aria-hidden>{suffix}</span>}
      </div>
      {(error || helper) && <span id={hid} className={s.hint}>{error ?? helper}</span>}
    </div>
  );
}
