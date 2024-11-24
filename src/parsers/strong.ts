import { Parser, Row } from "./parser.ts";

export class StrongParser implements Parser {
  static HEADERS_MAP: Record<string, keyof Row> = {
    Date: "date",
    "Exercise Name": "exercise",
    Weight: "weight",
    Reps: "volume",
  };

  public parse(data: string): Array<Row> {
    const lines = data.split("\n");
    const header = lines[0].trim().split(";");
    const rows = lines.slice(1).map((r) => this.buildRow(header, r, ";"));
    return rows;
  }

  private buildRow(
    header: Array<string>,
    line: string,
    delimiter: string,
  ): Row {
    const values = line.trim().split(delimiter);

    const row: Record<string, string | number> = {};
    for (let i = 0; i < header.length; i++) {
      const mapped = StrongParser.HEADERS_MAP[header[i]];
      if (!mapped) continue;
      row[mapped] = this.sanitizeValue(values[i]);
    }

    return row as Row;
  }

  private sanitizeValue(value: string): string {
    return value.trim().replaceAll('"', "").toLowerCase();
  }
}
