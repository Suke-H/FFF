import type { Color, ExpressionItem, Filter, Operator } from './types';

export function evaluateExpression(
  items: ExpressionItem[],
  operators: Operator[],
  filters: Filter[]
): Color | null {
  if (items.length === 0) return null;
  if (items[0].kind !== 'color') return null;

  let result: Color = items[0].value;
  let i = 1;

  // apply consecutive filters after a color
  while (i < items.length && items[i].kind === 'filter') {
    const f = filters.find((f) => f.id === (items[i] as { kind: 'filter'; id: string }).id);
    if (!f) return null;
    result = f.apply(result);
    i++;
  }

  while (i < items.length) {
    const opItem = items[i];
    if (opItem.kind !== 'operator') return null;

    const op = operators.find((o) => o.id === opItem.id);
    if (!op) return null;

    if (op.arity === 2) {
      const colorItem = items[i + 1];
      if (!colorItem || colorItem.kind !== 'color') return null;
      let rhs: Color = colorItem.value;
      i += 2;
      while (i < items.length && items[i].kind === 'filter') {
        const f = filters.find((f) => f.id === (items[i] as { kind: 'filter'; id: string }).id);
        if (!f) return null;
        rhs = f.apply(rhs);
        i++;
      }
      result = op.apply(result, rhs);
    } else if (op.arity === 1) {
      result = op.apply(result);
      i += 1;
    }
  }

  return result;
}
