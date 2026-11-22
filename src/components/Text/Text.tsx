import type { ElementType, HTMLAttributes } from 'react';
import { cx } from '../../lib/cx';
import { textClass, type TextVariant, type ColorToken, cssVar } from '../../tokens/tokens';

const defaultTag: Partial<Record<TextVariant, ElementType>> = { 'display/xl': 'h1', 'display/lg': 'h1', 'heading/1': 'h1', 'heading/2': 'h2', title: 'h3' };

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** Figma text style name: "display/lg", "body/md", "caps/sm", "data/xl"… */
  variant?: TextVariant;
  color?: Extract<ColorToken, `text/${string}`>;
  as?: ElementType;
}

/** Typography primitive, 1:1 with the Figma text styles. */
export function Text({ variant = 'body/md', color, as, className, style, ...rest }: TextProps) {
  const Tag = as ?? defaultTag[variant] ?? (variant.startsWith('caps') || variant.startsWith('data') ? 'span' : 'p');
  return <Tag className={cx(textClass(variant), className)} style={{ margin: 0, ...(color ? { color: cssVar(color) } : null), ...style }} {...rest} />;
}
