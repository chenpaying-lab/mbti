export interface Question {
  id: number;
  statement: string;
  dimensionA: Dimension;
  dimensionB: Dimension;
}

export type Dimension = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

export interface Type {
  title: string;
  description: string;
  traits: string[];
}
