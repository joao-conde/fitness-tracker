/**
 * A parser for the CSV files exported by the Strong mobile app.
 */
class StrongCsvParser {
  static EXTRACTED_HEADERS = {
    Date: "date",
    "Exercise Name": "exercise",
    Weight: "weight",
  };

  constructor(data, delimiter = ";") {
    const lines = data.split("\n");
    const header = lines[0].split(delimiter);

    const rows = lines.slice(1).map((r) => {
      const columns = r.split(delimiter);
      const row = {};
      for (let i = 0; i < header.length; i++) {
        const extractHeader = StrongCsvParser.EXTRACTED_HEADERS[header[i]];
        if (extractHeader) {
          row[extractHeader] = columns[i];
        }
      }
      return row;
    });

    this.delimiter = delimiter;
    this.header = header;
    this.rows = rows;
  }
}
