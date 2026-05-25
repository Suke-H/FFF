import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Color, ExpressionItem, Stage } from '../game/types';
import { ALL_OPERATORS } from '../game/operators';
import { evaluateExpression } from '../game/expression';

type GameStatus = 'playing' | 'cleared' | 'failed';

interface GameState {
  currentStageId: string;
  palette: Color[];
  target: Color;
  availableOperatorIds: string[];
  expression: ExpressionItem[];
  status: GameStatus;
}

const initialState: GameState = {
  currentStageId: '',
  palette: [],
  target: '#000',
  availableOperatorIds: [],
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

      state.expression.push(item);
      const result = evaluateExpression(state.expression, ALL_OPERATORS);
      if (result !== null && result === state.target) {
        state.status = 'cleared';
      }
    },
    resetExpression(state) {
      state.expression = [];
      state.status = 'playing';
    },
  },
});

export const { loadStage, addItem, resetExpression } = gameSlice.actions;
export default gameSlice.reducer;
