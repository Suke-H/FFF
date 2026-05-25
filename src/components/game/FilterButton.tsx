import type { Filter } from '../../game/types';

type Props = { filter: Filter; onClick: () => void };

export function FilterButton({ filter, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      style={{
        fontSize: 28,
        fontWeight: 'bold',
        padding: '8px 20px',
        cursor: 'pointer',
        border: '2px solid #8848cc',
        borderRadius: 8,
        background: '#1a1a1a',
        color: '#cc88ff',
      }}
    >
      {filter.symbol}
    </button>
  );
}
