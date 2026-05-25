import type { Operator } from './types';
import { addColors, subColors } from './color';

export const ALL_OPERATORS: Operator[] = [
  { id: 'add', symbol: '+', arity: 2, apply: addColors },
  { id: 'sub', symbol: '−', arity: 2, apply: subColors },
];
