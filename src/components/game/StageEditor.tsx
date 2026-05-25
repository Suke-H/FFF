import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { useGameDispatch } from '../../hooks/useGameDispatch';
import { setTarget, addPaletteColor, removePaletteColor, toggleFilter } from '../../store/gameSlice';
import { ALL_FILTERS } from '../../game/filters';
import { ColorSwatch } from '../ui/ColorSwatch';

function isValidColor(s: string): boolean {
  return /^#[0-9A-Fa-f]{3}$/.test(s);
}

export function StageEditor() {
  const dispatch = useGameDispatch();
  const { target, palette, availableFilterIds } = useSelector((s: RootState) => s.game);
  const [targetInput, setTargetInput] = useState(target);
  const [paletteInput, setPaletteInput] = useState('');

  const handleTargetChange = (v: string) => {
    setTargetInput(v);
    if (isValidColor(v)) dispatch(setTarget(v.toUpperCase() as `#${string}`));
  };

  const handleAddPalette = () => {
    const v = paletteInput.trim().toUpperCase();
    if (isValidColor(v)) {
      dispatch(addPaletteColor(v));
      setPaletteInput('');
    }
  };

  const row: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' };
  const section: React.CSSProperties = { marginTop: 20 };
  const label: React.CSSProperties = { color: '#aaa', fontSize: 13, marginBottom: 6 };
  const input: React.CSSProperties = {
    background: '#111', border: '1px solid #555', borderRadius: 4,
    color: '#fff', fontSize: 14, padding: '4px 8px', width: 80,
  };
  const btn = (active?: boolean): React.CSSProperties => ({
    padding: '4px 10px', cursor: 'pointer', borderRadius: 4,
    border: active ? '2px solid #fff' : '1px solid #555',
    background: active ? '#333' : '#1a1a1a', color: '#fff', fontSize: 13,
  });

  return (
    <div>
      {/* Target */}
      <div style={section}>
        <div style={label}>Target</div>
        <div style={row}>
          <ColorSwatch color={isValidColor(targetInput) ? targetInput : '#000'} size={36} />
          <input
            style={input}
            value={targetInput}
            onChange={e => handleTargetChange(e.target.value)}
            placeholder="#RGB"
            maxLength={4}
          />
        </div>
      </div>

      {/* Palette */}
      <div style={section}>
        <div style={label}>Palette</div>
        <div style={row}>
          {palette.map(color => (
            <div key={color} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <ColorSwatch color={color} size={36} />
              <button style={btn()} onClick={() => dispatch(removePaletteColor(color))}>✕</button>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <input
              style={input}
              value={paletteInput}
              onChange={e => setPaletteInput(e.target.value)}
              placeholder="#RGB"
              maxLength={4}
              onKeyDown={e => e.key === 'Enter' && handleAddPalette()}
            />
            <button style={btn()} onClick={handleAddPalette}>+</button>
          </div>
        </div>
      </div>

      {/* Filters */}
      {ALL_FILTERS.length > 0 && (
        <div style={section}>
          <div style={label}>Filters</div>
          <div style={row}>
            {ALL_FILTERS.map(f => (
              <button
                key={f.id}
                style={btn(availableFilterIds.includes(f.id))}
                onClick={() => dispatch(toggleFilter(f.id))}
              >
                {f.symbol}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
