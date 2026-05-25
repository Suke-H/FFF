import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { ColorSwatch } from '../ui/ColorSwatch';
import { ColorCode } from '../ui/ColorCode';

export function TargetColor() {
  const target = useSelector((s: RootState) => s.game.target);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span>Target:</span>
      <ColorSwatch color={target} size={56} />
      <ColorCode color={target} />
    </div>
  );
}
