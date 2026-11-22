import { Icon, type IconName } from '../Icon';
import s from './Toast.module.css';

export interface ToastProps { message: string; icon?: IconName; action?: { label: string; onClick: () => void }; }

/** Inverse strip, announced politely. Use for laps, zone changes, sync done. Figma: Core › Toast. */
export function Toast({ message, icon = 'check', action }: ToastProps) {
  return (
    <div role="status" aria-live="polite" className={s.toast}>
      <Icon name={icon} size={20} /><span className={s.msg}>{message}</span>
      {action && <button type="button" className={s.action} onClick={action.onClick}>{action.label}</button>}
    </div>
  );
}
