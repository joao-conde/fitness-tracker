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
    "rope tricep pushdown",
  ];

  static MIN_FREQUENCY = 50;

  constructor(data, delimiter = ";") {
    this.#rows = this.filterRows(this.buildRows(data, delimiter));
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

  buildRow(header, fileRow, delimiter) {
    const values = fileRow.split(delimiter);

    const row = {};
    for (let i = 0; i < header.length; i++) {
      const mapped = StrongCsv.HEADERS_MAP[header[i]];
      if (!mapped) continue;
      row[mapped] = this.sanitizeValue(values[i]);
    }
    return row;
  }

  sanitizeValue(value) {
    return value.trim().replaceAll('"', "").toLowerCase();
  }

  filterRows(rows) {
    const groupedByExercise = groupByLabel(rows, "exercise", "date", "weight");
    const counts = groupedByExercise.reduce((acc, group) => {
      acc[group.label] = group.data.length;
      return acc;
    }, {});

    return rows
      .filter((r) => this.filterRowExerciseName(r))
      .filter((r) => this.filterRowExerciseFrequency(r, counts));
  }

  filterRowExerciseName(row) {
    return (
      StrongCsv.EXERCISE_INCLUDES.some((i) => row.exercise.includes(i)) &&
      StrongCsv.EXERCISE_EXCLUDES.every((e) => !row.exercise.includes(e))
    );
  }

  filterRowExerciseFrequency(row, counts) {
    return counts[row.exercise] > StrongCsv.MIN_FREQUENCY;
  }
}
