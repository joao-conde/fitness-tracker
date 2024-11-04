export type Row = {
  date: string;
  exercise: string;
  weight: number;
  volume: number;
};

export class StrongParser {
  #rows;

  static HEADERS_MAP: Record<string, string> = {
    Date: "date",
    "Exercise Name": "exercise",
    Weight: "weight",
    Reps: "volume",
  };

  constructor(data: string, delimiter: string = ";") {
    this.#rows = this.buildRows(data, delimiter);
  }

  rows() {
    return this.#rows;
  }

  buildRows(data: string, delimiter: string) {
    const lines = data.split("\n");
    const header = lines[0].split(delimiter);
    const rows = lines.slice(1).map((r) => this.buildRow(header, r, delimiter));
    return rows;
  }

  buildRow(header: Array<string>, line: string, delimiter: string): Row {
    const values = line.split(delimiter);

    const row: Record<string, string | number> = {};
    for (let i = 0; i < header.length; i++) {
      const mapped = StrongParser.HEADERS_MAP[header[i]];
      if (!mapped) continue;
      row[mapped] = this.sanitizeValue(values[i]);
    }

    return row as Row;
  }

  sanitizeValue(value: string): string {
    return value.trim().replaceAll('"', "").toLowerCase();
  }
}
