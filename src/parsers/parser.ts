export type Row = {
  date: string;
  exercise: string;
  weight: number;
  volume: number;
};

export interface Parser {
  parse(data: string): Array<Row>;
}
