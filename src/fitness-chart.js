class FitnessChart extends Chart {
  static OPTIONS = {
    type: "line",
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      zoom: {
        zoom: {
          mode: "x",
          wheel: {
            enabled: true,
            speed: 0.1,
          },
          pinch: {
            enabled: true,
          },
        },
        pan: {
          enabled: true,
        },
      },
    },
  };

  static workoutHeaviestSets(data) {
    // a map from date and exercise to its heaviest set
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

    // turn the map into the list of heaviest sets
    const heaviestSets = Object.keys(heaviestSetMap).flatMap((date) =>
      Object.values(heaviestSetMap[date])
    );

    return heaviestSets;
  }

  static groupByLabel(data, label, x, y) {
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

    const options = {
      ...this.constructor.OPTIONS,
      scales: this.constructor.SCALES,
    };
    this.config.type = options.type;
    this.options = options;

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
