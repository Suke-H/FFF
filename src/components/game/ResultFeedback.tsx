import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

export function ResultFeedback() {
  const status = useSelector((s: RootState) => s.game.status);
  if (status !== 'cleared') return null;
  return (
    <div style={{ fontSize: 32, fontWeight: 'bold', color: '#4f4' }}>
      クリア！
    </div>
  );
}
