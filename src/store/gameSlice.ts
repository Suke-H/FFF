import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Color, ExpressionItem, Stage } from '../game/types';
import { ALL_OPERATORS } from '../game/operators';
import { ALL_FILTERS } from '../game/filters';
import { evaluateExpression } from '../game/expression';

type GameStatus = 'playing' | 'cleared' | 'failed';

interface GameState {
  currentStageId: string;
  palette: Color[];
  target: Color;
  availableOperatorIds: string[];
  availableFilterIds: string[];
  expression: ExpressionItem[];
  status: GameStatus;
}

const initialState: GameState = {
  currentStageId: '',
  palette: [],
  target: '#000',
  availableOperatorIds: [],
  availableFilterIds: [],
  expression: [],
  status: 'playing',
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    loadStage(state, action: PayloadAction<Stage>) {
      const stage = action.payload;
      state.currentStageId = stage.id;
      state.palette = stage.palette;
      state.target = stage.target;
      state.availableOperatorIds = stage.availableOperatorIds;
      state.availableFilterIds = stage.availableFilterIds;
      state.expression = [];
      state.status = 'playing';
    },
    addItem(state, action: PayloadAction<ExpressionItem>) {
      if (state.status !== 'playing') return;
      const item = action.payload;

      if (item.kind === 'color') {
        if (state.expression.length > 0) {
          const last = state.expression[state.expression.length - 1];
          if (last.kind !== 'operator') return;
        }
        const alreadyUsed = state.expression.some(
          e => e.kind === 'color' && e.value === item.value
        );
        if (alreadyUsed) return;
      }

      if (item.kind === 'filter') {
        if (state.expression.length === 0) return;
        const last = state.expression[state.expression.length - 1];
        if (last.kind !== 'color' && last.kind !== 'filter') return;
      }

      state.expression.push(item);
      const result = evaluateExpression(state.expression, ALL_OPERATORS, ALL_FILTERS);
      if (result !== null && result === state.target) {
        state.status = 'cleared';
      }
    },
    resetExpression(state) {
      state.expression = [];
      state.status = 'playing';
    },
    setTarget(state, action: PayloadAction<Color>) {
      state.target = action.payload;
      state.expression = [];
      state.status = 'playing';
    },
    addPaletteColor(state, action: PayloadAction<Color>) {
      if (!state.palette.includes(action.payload))
        state.palette.push(action.payload);
    },
    removePaletteColor(state, action: PayloadAction<Color>) {
      state.palette = state.palette.filter(c => c !== action.payload);
      state.expression = state.expression.filter(
        e => !(e.kind === 'color' && e.value === action.payload)
      );
    },
    toggleFilter(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.availableFilterIds.includes(id))
        state.availableFilterIds = state.availableFilterIds.filter(f => f !== id);
      else
        state.availableFilterIds.push(id);
    },
  },
});

export const { loadStage, addItem, resetExpression, setTarget, addPaletteColor, removePaletteColor, toggleFilter } = gameSlice.actions;
export default gameSlice.reducer;
