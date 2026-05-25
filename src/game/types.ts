export type Color = string;

export type BinaryOperator = {
  id: string;
  symbol: string;
  arity: 2;
  apply: (a: Color, b: Color) => Color;
};

export type UnaryOperator = {
  id: string;
  symbol: string;
  arity: 1;
  apply: (a: Color) => Color;
};

export type Operator = BinaryOperator | UnaryOperator;

export type Filter = {
  id: string;
  symbol: string;
  apply: (a: Color) => Color;
};

export type ExpressionItem =
  | { kind: 'color'; value: Color }
  | { kind: 'operator'; id: string }
  | { kind: 'filter'; id: string };

export type Stage = {
  id: string;
  target: Color;
  palette: Color[];
  availableOperatorIds: string[];
  availableFilterIds: string[];
  par: number;
};
