import type { Color } from '../../game/types';
import { ColorSwatch } from '../ui/ColorSwatch';
import { ColorCode } from '../ui/ColorCode';

type Props = { color: Color; onClick: () => void; disabled?: boolean };

export function ColorCard({ color, onClick, disabled }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        padding: '8px 12px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        border: '2px solid #888',
        borderRadius: 8,
        background: '#1a1a1a',
        opacity: disabled ? 0.35 : 1,
      }}
    >
      <ColorSwatch color={color} size={40} />
      <ColorCode color={color} />
    </button>
  );
}
