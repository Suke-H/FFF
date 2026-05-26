import type { Operator } from '../../game/types';

type Props = { operator: Operator; onClick: () => void; disabled?: boolean };

export function OperatorButton({ operator, onClick, disabled }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        fontSize: 28,
        fontWeight: 'bold',
        padding: '8px 20px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        border: '2px solid #888',
        borderRadius: 8,
        background: '#1a1a1a',
        color: '#fff',
        opacity: disabled ? 0.35 : 1,
      }}
    >
      {operator.symbol}
    </button>
  );
}
