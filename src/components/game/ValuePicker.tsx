import type { ValueChannel } from '../../game/types';

type Props = {
  amounts: number[];
  pending: number | null;
  disabled?: boolean;
  onSelectAmount: (amount: number) => void;
  onSelectChannel: (channel: ValueChannel) => void;
};

export function ValuePicker({ amounts, pending, disabled, onSelectAmount, onSelectChannel }: Props) {
  if (amounts.length === 0) return null;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
      {amounts.map(amount => (
        <button
          key={amount}
          onClick={() => onSelectAmount(amount)}
          disabled={disabled}
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            padding: '8px 20px',
            cursor: disabled ? 'not-allowed' : 'pointer',
            border: pending === amount ? '2px solid #88ccff' : '2px solid #4488cc',
            borderRadius: 8,
            background: pending === amount ? '#223355' : '#1a1a1a',
            color: '#88ccff',
            opacity: disabled ? 0.35 : 1,
          }}
        >
          {amount.toString(16).toUpperCase()}
        </button>
      ))}
      {pending !== null && (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ color: '#888', fontSize: 14 }}>→</span>
          {(['r', 'g', 'b'] as const).map(ch => (
            <button
              key={ch}
              onClick={() => onSelectChannel(ch)}
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                padding: '6px 14px',
                cursor: 'pointer',
                border: '2px solid #88ccff',
                borderRadius: 6,
                background: '#1a1a1a',
                color: '#88ccff',
              }}
            >
              {ch.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
