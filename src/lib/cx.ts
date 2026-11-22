/** Tiny className joiner: cx('a', cond && 'b') */
export const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(' ');
