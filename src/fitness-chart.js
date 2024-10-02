class FitnessChart extends Chart {
  static OPTIONS = {};

  static buildDatasets(data) {
    return [];
  }

  static workoutHeaviestSets(data) {
    const heaviestSetMap = data.reduce((acc, row) => {
      const date = row.date;
      if (!acc[date]) acc[date] = {};

      const exercise = row.exercise;
      if (!acc[date][exercise]) acc[date][exercise] = { weight: -Infinity };

      const weight = row.weight;
      if (weight >= acc[date][exercise].weight) {
        acc[date][exercise] = row;
      }

      return acc;
    }, {});

    const heaviestSets = Object.keys(heaviestSetMap).flatMap((date) => {
      return Object.keys(heaviestSetMap[date]).map((exercise) => ({
        exercise,
        date,
        ...heaviestSetMap[date][exercise],
      }));
    });

    return heaviestSets;
  }

  static labeledDatasets(data, label, x, y) {
    const labeledDatasetMap = data.reduce((acc, row) => {
      if (!acc[row[label]]) {
        acc[row[label]] = {
          label: row[label],
          data: [],
        };
      }
      acc[row[label]].data.push({ x: row[x], y: row[y] });
      return acc;
    }, {});
    const labeledDataset = Object.values(labeledDatasetMap);
    return labeledDataset;
  }

  constructor(canvasId, data) {
    const ctx = document.getElementById(canvasId).getContext("2d");
    super(ctx);

    this.config.type = this.constructor.OPTIONS.type;
    this.options = this.constructor.OPTIONS;

    const datasets = this.constructor.buildDatasets(data);
    this.data.datasets = datasets;
    this.originalDatasets = datasets;

    this.update();
  }

  filter(exercise) {
    this.data.datasets = this.originalDatasets.filter((d) =>
      d.label.includes(exercise)
    );
    this.update();
  }
}
