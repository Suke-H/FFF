import type { Operator } from '../../game/types';

type Props = { operator: Operator; onClick: () => void };

export function OperatorButton({ operator, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      style={{
        fontSize: 28,
        fontWeight: 'bold',
        padding: '8px 20px',
        cursor: 'pointer',
        border: '2px solid #888',
        borderRadius: 8,
        background: '#1a1a1a',
        color: '#fff',
      }}
    >
      {operator.symbol}
    </button>
  );
}
