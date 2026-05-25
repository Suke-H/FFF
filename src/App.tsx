import { useEffect, useState } from 'react';
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
import { StageEditor } from './components/game/StageEditor';

type Mode = 'play' | 'edit';

export default function App() {
  const dispatch = useGameDispatch();
  const { palette, availableOperatorIds, availableFilterIds, currentStageId } = useSelector((s: RootState) => s.game);
  const [mode, setMode] = useState<Mode>('play');

  const availableOperators = ALL_OPERATORS.filter((op) =>
    availableOperatorIds.includes(op.id)
  );
  const availableFilters = ALL_FILTERS.filter((f) =>
    availableFilterIds.includes(f.id)
  );

  useEffect(() => {
    dispatch(loadStage(stages[0]));
  }, [dispatch]);

  const modeBtn = (m: Mode): React.CSSProperties => ({
    padding: '6px 18px',
    cursor: 'pointer',
    borderRadius: 6,
    border: mode === m ? '2px solid #fff' : '2px solid #444',
    background: mode === m ? '#333' : '#111',
    color: '#fff',
    fontSize: 14,
    fontWeight: mode === m ? 'bold' : 'normal',
  });

  const stageBtn = (id: string): React.CSSProperties => ({
    padding: '6px 14px',
    cursor: 'pointer',
    borderRadius: 6,
    border: currentStageId === id ? '2px solid #fff' : '2px solid #555',
    background: currentStageId === id ? '#333' : '#1a1a1a',
    color: '#fff',
    fontSize: 14,
  });

  return (
    <div style={{ padding: 32, maxWidth: 600, margin: '0 auto', color: '#fff' }}>
      <h1 style={{ marginBottom: 16 }}>FFF</h1>

      {/* Mode toggle */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button style={modeBtn('play')} onClick={() => setMode('play')}>Play</button>
        <button style={modeBtn('edit')} onClick={() => setMode('edit')}>Edit</button>
      </div>

      {/* Stage selector */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {stages.map((stage) => (
          <button
            key={stage.id}
            onClick={() => dispatch(loadStage(stage))}
            style={stageBtn(stage.id)}
          >
            {stage.id}
          </button>
        ))}
      </div>

      {mode === 'edit' ? (
        <StageEditor />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
