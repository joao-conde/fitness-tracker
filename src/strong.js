const FUZZY_ALLOW_LIST = [
  "chest press",
  "shoulder press",
  "bicep curl",
  "incline bench",
];

const FUZZY_DENY_LIST = ["machine"];

class Strong {
  constructor(data) {
    const rows = data
      .split("\n")
      .slice(1)
      .map((r) => this.parseRow(r))
      .map((r) => this.sanitizeRow(r))
      .filter((r) => this.filterRow(r));
    const groupMax = this.groupByMax(rows);

    this.rows = rows;
    this.groupMax = groupMax;
  }

  parseRow(text, delimiter = ";") {
    const columns = text.split(delimiter);
    return {
      label: columns[2],
      x: moment(columns[0], "YYYY-MM-DD hh:mm:ss").format("DD/MM/YYYY"),
      y: parseFloat(columns[4]),
    };
  }

  sanitizeRow(row) {
    return {
      label: row.label.trim().replaceAll('"', ""),
      x: row.x,
      y: row.y,
    };
  }

  filterRow(row) {
    const fuzzy_allow_match = FUZZY_ALLOW_LIST.some((label) =>
      row.label.toLowerCase().includes(label)
    );
    const fuzzy_deny_match = FUZZY_DENY_LIST.some((label) =>
      row.label.toLowerCase().includes(label)
    );
    return fuzzy_allow_match && !fuzzy_deny_match;
  }

  chartData() {
    const groups = {};

    this.groupMax.forEach(({ label, y, x }) => {
      if (!groups[label]) {
        const red = Math.random() * 255;
        const green = Math.random() * 255;
        const blue = Math.random() * 255;
        groups[label] = {
          label,
          color: `rgb(${red}, ${green}, ${blue})`,
          data: [],
        };
      }
      groups[label].data.push({ x, y });
    });

    return Object.values(groups);
  }

  groupByMax(rows) {
    const workouts = {};

    rows.forEach((row) => {
      if (!workouts[row.x]) workouts[row.x] = {};

      const workout = workouts[row.x];

      if (!workout[row.label]) workout[row.label] = -Infinity;

      workout[row.label] = Math.max(workout[row.label], row.y);
    });

    const records = Object.keys(workouts).flatMap((x) => {
      return Object.keys(workouts[x]).map((label) => ({
        label,
        x,
        y: workouts[x][label],
      }));
    });

    return records;
  }
}
