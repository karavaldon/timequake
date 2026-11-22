import s from './SegmentedControl.module.css';

export interface SegmentedControlProps<T extends string> { label: string; options: { value: T; label: string }[]; value: T; onChange: (v: T) => void; }

/** 2–4 mutually exclusive views (Week · Month · Year). Selected segment is inverse. Figma: Core › Segmented Control. */
export function SegmentedControl<T extends string>({ label, options, value, onChange }: SegmentedControlProps<T>) {
  return (
    <div role="radiogroup" aria-label={label} className={s.root}>
      {options.map((o) => (
        <button key={o.value} type="button" role="radio" aria-checked={o.value === value} className={s.seg} onClick={() => onChange(o.value)}
          onKeyDown={(e) => { const i = options.findIndex((x) => x.value === value); const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (d) { e.preventDefault(); onChange(options[(i + d + options.length) % options.length].value); } }}
          tabIndex={o.value === value ? 0 : -1}>{o.label}</button>
      ))}
    </div>
  );
}
