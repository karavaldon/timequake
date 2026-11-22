import { icons, type LucideProps } from 'lucide-react';

/** Kebab-case Lucide name — same as the Figma icon/* components ("heart-pulse", "map-pin"). */
export type IconName = string;
const toPascal = (n: string) => n.replace(/(^|-)(\w)/g, (_, __, c: string) => c.toUpperCase());

export interface IconProps extends Omit<LucideProps, 'ref'> {
  name: IconName;
  /** 16 | 20 | 24. Default 24. */
  size?: number;
  /** Accessible label. Omit for decorative icons (aria-hidden). */
  label?: string;
}

/** Thin-line Lucide icon at a 1.5 stroke — the printed-glyph look. Never filled. */
export function Icon({ name, size = 24, label, strokeWidth = 1.5, ...rest }: IconProps) {
  const Cmp = icons[toPascal(name) as keyof typeof icons];
  if (!Cmp) { if (import.meta.env.DEV) console.warn(`[Icon] unknown icon "${name}"`); return null; }
  return <Cmp size={size} strokeWidth={strokeWidth} absoluteStrokeWidth aria-hidden={label ? undefined : true} aria-label={label} role={label ? 'img' : undefined} focusable={false} {...rest} />;
}
