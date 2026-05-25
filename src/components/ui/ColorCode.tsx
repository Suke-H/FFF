import type { Color } from '../../game/types';

type Props = { color: Color };

export function ColorCode({ color }: Props) {
  return <span style={{ fontFamily: 'monospace', fontSize: 18 }}>{color}</span>;
}
