import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from './store';
import { loadStage, addItem, resetExpression } from './store/gameSlice';
import { useGameDispatch } from './hooks/useGameDispatch';
import { stages } from './game/stages';
import { ALL_OPERATORS } from './game/operators';
import { ALL_FILTERS } from './game/filters';
import { TargetColor } from './components/game/TargetColor';
import { ColorCard } from './components/game/ColorCard';
import { OperatorButton } from './components/game/OperatorButton';
import { FilterButton } from './components/game/FilterButton';
import { ExpressionBar } from './components/game/ExpressionBar';
import { ResultFeedback } from './components/game/ResultFeedback';

export default function App() {
  const dispatch = useGameDispatch();
  const { palette, availableOperatorIds, availableFilterIds } = useSelector((s: RootState) => s.game);
  const availableOperators = ALL_OPERATORS.filter((op) =>
    availableOperatorIds.includes(op.id)
  );
  const availableFilters = ALL_FILTERS.filter((f) =>
    availableFilterIds.includes(f.id)
  );

  useEffect(() => {
    dispatch(loadStage(stages[0]));
  }, [dispatch]);

  return (
    <div style={{ padding: 32, maxWidth: 600, margin: '0 auto', color: '#fff' }}>
      <h1 style={{ marginBottom: 24 }}>FFF</h1>
      <TargetColor />
      <div style={{ marginTop: 24 }}>
        <ExpressionBar />
      </div>
      <ResultFeedback />
      <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {palette.map((color) => (
          <ColorCard
            key={color}
            color={color}
            onClick={() => dispatch(addItem({ kind: 'color', value: color }))}
          />
        ))}
      </div>
      <div style={{ marginTop: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {availableOperators.map((op) => (
          <OperatorButton
            key={op.id}
            operator={op}
            onClick={() => dispatch(addItem({ kind: 'operator', id: op.id }))}
          />
        ))}
        {availableFilters.map((f) => (
          <FilterButton
            key={f.id}
            filter={f}
            onClick={() => dispatch(addItem({ kind: 'filter', id: f.id }))}
          />
        ))}
      </div>
      <div style={{ marginTop: 16 }}>
        <button
          onClick={() => dispatch(resetExpression())}
          style={{
            padding: '8px 20px',
            cursor: 'pointer',
            border: '2px solid #888',
            borderRadius: 8,
            background: '#333',
            color: '#fff',
          }}
        >
          リセット
        </button>
      </div>
    </div>
  );
}
