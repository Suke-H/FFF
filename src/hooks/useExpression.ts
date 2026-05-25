import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { addItem, resetExpression } from '../store/gameSlice';
import { useGameDispatch } from './useGameDispatch';
import type { ExpressionItem } from '../game/types';

export function useExpression() {
  const dispatch = useGameDispatch();
  const expression = useSelector((s: RootState) => s.game.expression);
  const status = useSelector((s: RootState) => s.game.status);

  return {
    expression,
    status,
    addItem: (item: ExpressionItem) => dispatch(addItem(item)),
    reset: () => dispatch(resetExpression()),
  };
}
