import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { Icon, type IconName } from '../Icon';
import s from './Button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary = the ONE filled action per screen (black in light, Volt in dark). secondary = square outline. ghost = text only. */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** md 48 · lg 56 (sticky CTAs) */
  size?: 'md' | 'lg';
  icon?: IconName;
  fullWidth?: boolean;
  children: ReactNode;
}

/** Caps label in mono — like the printed words on a Casio case. Figma: Core › Button. */
export function Button({ variant = 'primary', size = 'md', icon, fullWidth, className, children, type = 'button', ...rest }: ButtonProps) {
  return (
    <button type={type} className={cx(s.btn, s[variant], s[size], fullWidth && s.full, className)} {...rest}>
      {icon && <Icon name={icon} size={20} />}<span>{children}</span>
    </button>
  );
}

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  /** Required accessible name. */
  label: string;
  variant?: 'ghost' | 'outline';
}
/** 48 × 48 icon-only button. Figma: Core › Icon Button. */
export function IconButton({ icon, label, variant = 'ghost', className, type = 'button', ...rest }: IconButtonProps) {
  return <button type={type} aria-label={label} className={cx(s.iconBtn, variant === 'outline' && s.outlineIcon, className)} {...rest}><Icon name={icon} /></button>;
}
