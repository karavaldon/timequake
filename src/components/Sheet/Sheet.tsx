import { useEffect, useRef, type ReactNode } from 'react';
import { IconButton } from '../Button';
import s from './Sheet.module.css';

export interface SheetProps { open: boolean; onClose: () => void; title: string; children: ReactNode; }

/** Bottom sheet on a native <dialog> (focus trap + Esc for free). Figma: Core › Sheet. */
export function Sheet({ open, onClose, title, children }: SheetProps) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { const d = ref.current; if (!d) return; if (open && !d.open) d.showModal?.(); if (!open && d.open) d.close(); }, [open]);
  return (
    <dialog ref={ref} className={s.sheet} aria-labelledby="sheet-title" onClose={onClose} onClick={(e) => { if (e.target === ref.current) onClose(); }}>
      <div className={s.head}><h2 id="sheet-title" className="kv-text-heading-2" style={{ margin: 0 }}>{title}</h2><IconButton icon="x" label="Close" onClick={onClose} /></div>
      <div className={s.body}>{children}</div>
    </dialog>
  );
}
