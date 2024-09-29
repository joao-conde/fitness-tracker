class CsvParser {
  constructor(data, delimiter = ";") {
    const lines = data.split("\n");
    const header = lines[0].split(delimiter);

    this.delimiter = delimiter;
    this.header = header;

    const rows = lines.slice(1).map((r) => {
      const columns = r.split(delimiter);
      const row = {};
      for (let i = 0; i < header.length; i++) {
        row[header[i]] = columns[i];
      }
      return row;
    });
    const transformed = rows;

    this.rows = rows;
    this.transformed = transformed;
  }
}
