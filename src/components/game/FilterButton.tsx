import type { Filter } from '../../game/types';

type Props = { filter: Filter; onClick: () => void; disabled?: boolean };

export function FilterButton({ filter, onClick, disabled }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        fontSize: 28,
        fontWeight: 'bold',
        padding: '8px 20px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        border: '2px solid #8848cc',
        borderRadius: 8,
        background: '#1a1a1a',
        color: '#cc88ff',
        opacity: disabled ? 0.35 : 1,
      }}
    >
      {filter.symbol}
    </button>
  );
}
