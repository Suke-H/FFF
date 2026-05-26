import type { Color, ExpressionItem, Filter, Operator } from './types';
import { valueToColor } from './color';

export function nextAllowed(expr: ExpressionItem[]): Set<ExpressionItem['kind']> {
  if (expr.length === 0) return new Set(['color']);
  const last = expr[expr.length - 1];
  if (last.kind === 'operator') return new Set(['color', 'value']);
  return new Set(['operator', 'filter']);
}

function resolveColor(item: ExpressionItem): Color | null {
  if (item.kind === 'color') return item.value;
  if (item.kind === 'value') return valueToColor(item.amount, item.channel);
  return null;
}

export function evaluateExpression(
  items: ExpressionItem[],
  operators: Operator[],
  filters: Filter[]
): Color | null {
  if (items.length === 0) return null;
  const firstColor = resolveColor(items[0]);
  if (firstColor === null) return null;

  let result: Color = firstColor;
  let i = 1;

  // apply consecutive filters after a color/value
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
      const rhsItem = items[i + 1];
      const rhsColor = rhsItem ? resolveColor(rhsItem) : null;
      if (rhsColor === null) return null;
      let rhs: Color = rhsColor;
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
