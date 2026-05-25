import type { Color, ExpressionItem, Operator } from './types';

export function evaluateExpression(
  items: ExpressionItem[],
  operators: Operator[]
): Color | null {
  if (items.length === 0) return null;
  if (items[0].kind !== 'color') return null;

  let result: Color = items[0].value;
  let i = 1;

  while (i < items.length) {
    const opItem = items[i];
    if (opItem.kind !== 'operator') return null;

    const op = operators.find((o) => o.id === opItem.id);
    if (!op) return null;

    if (op.arity === 2) {
      const colorItem = items[i + 1];
      if (!colorItem || colorItem.kind !== 'color') return null;
      result = op.apply(result, colorItem.value);
      i += 2;
    } else if (op.arity === 1) {
      result = op.apply(result);
      i += 1;
    }
  }

  return result;
}
