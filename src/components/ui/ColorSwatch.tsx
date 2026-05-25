import type { Color } from '../../game/types';

type Props = { color: Color; size?: number };

export function ColorSwatch({ color, size = 48 }: Props) {
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        border: '2px solid #555',
        borderRadius: 6,
      }}
    />
  );
}
