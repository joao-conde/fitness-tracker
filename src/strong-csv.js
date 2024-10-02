/**
 * A parser for the CSV files exported by the Strong mobile app.
 * Also a very strong parser for sure.
 */
class StrongCsv {
  #rows;

  static HEADERS_MAP = {
    Date: "date",
    "Exercise Name": "exercise",
    Weight: "weight",
    Reps: "volume",
  };

  static EXERCISE_INCLUDES = [
    "bench",
    "squat",
    "deadlift",
    "pull up",
    "bicep",
    "tricep",
  ];

  static EXERCISE_EXCLUDES = [
    "decline",
    "bodyweight",
    "close grip",
    "assisted",
    "cable",
  ];

  constructor(data, delimiter = ";") {
    const lines = data.split("\n");
    const fileHeader = lines[0].split(delimiter);
    const rows = lines
      .slice(1)
      .map((r) => this.buildRow(fileHeader, r, delimiter))
      .filter((r) => this.filterRow(r));
    this.#rows = rows;
  }

  rows() {
    return this.#rows;
  }

  buildRow(fileHeader, fileRow, delimiter) {
    const values = fileRow.split(delimiter);

    const row = {};
    for (let i = 0; i < fileHeader.length; i++) {
      const mapped = StrongCsv.HEADERS_MAP[fileHeader[i]];
      if (!mapped) continue;
      row[mapped] = this.sanitizeValue(values[i]);
    }
    return row;
  }

  filterRow(row) {
    return (
      StrongCsv.EXERCISE_INCLUDES.some((i) => row.exercise.includes(i)) &&
      StrongCsv.EXERCISE_EXCLUDES.every((e) => !row.exercise.includes(e))
    );
  }

  sanitizeValue(value) {
    return value.trim().replaceAll('"', "").toLowerCase();
  }
}
