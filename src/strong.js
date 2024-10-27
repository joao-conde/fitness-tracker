class StrongParser {
  #rows;

  static HEADERS_MAP = {
    Date: "date",
    "Exercise Name": "exercise",
    Weight: "weight",
    Reps: "volume",
  };

  constructor(data, delimiter = ";") {
    this.#rows = this.buildRows(data, delimiter);
  }

  rows() {
    return this.#rows;
  }

  buildRows(data, delimiter) {
    const lines = data.split("\n");
    const header = lines[0].split(delimiter);
    const rows = lines.slice(1).map((r) => this.buildRow(header, r, delimiter));
    return rows;
  }

  buildRow(header, line, delimiter) {
    const values = line.split(delimiter);

    const row = {};
    for (let i = 0; i < header.length; i++) {
      const mapped = StrongParser.HEADERS_MAP[header[i]];
      if (!mapped) continue;
      row[mapped] = this.sanitizeValue(values[i]);
    }
    return row;
  }

  sanitizeValue(value) {
    return value.trim().replaceAll('"', "").toLowerCase();
  }
}
