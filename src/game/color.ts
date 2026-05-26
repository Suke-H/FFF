import type { Color, ValueChannel } from './types';

function parseColor(hex: Color): [number, number, number] {
  const r = parseInt(hex[1], 16);
  const g = parseInt(hex[2], 16);
  const b = parseInt(hex[3], 16);
  return [r, g, b];
}

function formatColor(r: number, g: number, b: number): Color {
  return `#${r.toString(16).toUpperCase()}${g.toString(16).toUpperCase()}${b.toString(16).toUpperCase()}`;
}

function clamp(n: number): number {
  return Math.max(0, Math.min(15, n));
}

export function valueToColor(amount: number, channel: ValueChannel): Color {
  return formatColor(
    channel === 'r' ? amount : 0,
    channel === 'g' ? amount : 0,
    channel === 'b' ? amount : 0,
  );
}

export function addColors(a: Color, b: Color): Color {
  const [ar, ag, ab] = parseColor(a);
  const [br, bg, bb] = parseColor(b);
  return formatColor(clamp(ar + br), clamp(ag + bg), clamp(ab + bb));
}

export function subColors(a: Color, b: Color): Color {
  const [ar, ag, ab] = parseColor(a);
  const [br, bg, bb] = parseColor(b);
  return formatColor(clamp(ar - br), clamp(ag - bg), clamp(ab - bb));
}
