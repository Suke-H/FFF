import type { Filter } from './types';
import type { Color } from './types';

function invertColor(a: Color): Color {
  const r = 15 - parseInt(a[1], 16);
  const g = 15 - parseInt(a[2], 16);
  const b = 15 - parseInt(a[3], 16);
  return `#${r.toString(16).toUpperCase()}${g.toString(16).toUpperCase()}${b.toString(16).toUpperCase()}`;
}

export const ALL_FILTERS: Filter[] = [
  { id: 'invert', symbol: 'inv', apply: invertColor },
];
