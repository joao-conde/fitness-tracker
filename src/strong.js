/**
 * A parser for the CSV files exported by the Strong mobile app.
 */
class StrongCsvParser {
  static HEADERS_MAP = {
    Date: "date",
    "Exercise Name": "exercise",
    Weight: "weight",
    Reps: "volume",
  };

  constructor(data, delimiter = ";") {
    const lines = data.split("\n");
    const fileHeader = lines[0].split(delimiter);
    const rows = lines
      .slice(1)
      .map((r) => this.buildRow(fileHeader, r, delimiter));
    this.rows = rows;
  }

  buildRow(fileHeader, fileRow, delimiter) {
    const values = fileRow.split(delimiter);

    const row = {};
    for (let i = 0; i < fileHeader.length; i++) {
      const mapped = StrongCsvParser.HEADERS_MAP[fileHeader[i]];
      if (!mapped) continue;
      row[mapped] = this.sanitizeValue(values[i]);
    }
    return row;
  }

  sanitizeValue(value) {
    return value.trim().replaceAll('"', "").toLowerCase();
  }
}
