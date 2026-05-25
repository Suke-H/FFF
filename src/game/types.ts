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

export type ExpressionItem =
  | { kind: 'color'; value: Color }
  | { kind: 'operator'; id: string };

export type Stage = {
  id: string;
  target: Color;
  palette: Color[];
  availableOperatorIds: string[];
  par: number;
};
