import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { ALL_OPERATORS } from '../../game/operators';
import { ALL_FILTERS } from '../../game/filters';
import { evaluateExpression } from '../../game/expression';
import { ColorSwatch } from '../ui/ColorSwatch';
import { ColorCode } from '../ui/ColorCode';

export function ExpressionBar() {
  const expression = useSelector((s: RootState) => s.game.expression);
  const result = evaluateExpression(expression, ALL_OPERATORS, ALL_FILTERS);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', minHeight: 56 }}>
      {expression.map((item, i) =>
        item.kind === 'color' ? (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <ColorSwatch color={item.value} size={40} />
            <ColorCode color={item.value} />
          </div>
        ) : item.kind === 'filter' ? (
          <span key={i} style={{ fontSize: 24, fontWeight: 'bold', color: '#cc88ff' }}>
            {ALL_FILTERS.find((f) => f.id === item.id)?.symbol ?? item.id}
          </span>
        ) : (
          <span key={i} style={{ fontSize: 24, fontWeight: 'bold', color: '#ccc' }}>
            {ALL_OPERATORS.find((o) => o.id === item.id)?.symbol ?? item.id}
          </span>
        )
      )}
      {result !== null && (
        <>
          <span style={{ fontSize: 24, color: '#aaa' }}>=</span>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <ColorSwatch color={result} size={40} />
            <ColorCode color={result} />
          </div>
        </>
      )}
      {expression.length === 0 && (
        <span style={{ color: '#555', fontStyle: 'italic' }}>式を入力してください</span>
      )}
    </div>
  );
}
