class FitnessChart extends Chart {
  static OPTIONS = {
    type: "line",
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  constructor(canvasId, data) {
    // get canvas context and create chart
    const ctx = document.getElementById(canvasId).getContext("2d");
    super(ctx);

    // resolve options based on defaults and child class
    // scale overrides
    const options = {
      ...this.constructor.OPTIONS,
      scales: this.constructor.SCALES,
      onClick: this.onClick,
    };
    this.config.type = options.type;
    this.options = options;

    // build the datasets with child class implementation
    const datasets = this.buildDatasets(data);
    this.data.datasets = datasets;
    this.originalDatasets = datasets;

    // update the chart to ensure proper render
    this.update();
  }

  buildDatasets(data) {
    throw new Error("not implemented");
  }

  onClick(e, elements) {
    // deletes a specific data point
    elements.forEach(({ datasetIndex, index }) =>
      this.data.datasets[datasetIndex].data.splice(index, 1)
    );
    this.update();
  }

  filter(exercise) {
    this.data.datasets = this.originalDatasets.filter((d) =>
      d.label.includes(exercise)
    );
    this.update();
  }

  workoutHeaviestSets(data) {
    // builds map[date][exercise] => heaviest set
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

    // turns the map into a list of heaviest sets
    const heaviestSets = Object.keys(heaviestSetMap).flatMap((date) =>
      Object.values(heaviestSetMap[date])
    );

    return heaviestSets;
  }

  groupByLabel(data, label, x, y) {
    // builds map[label] => { label, data }
    const groupedByLabelMap = data.reduce((acc, row) => {
      if (!acc[row[label]]) {
        acc[row[label]] = {
          label: row[label],
          data: [],
        };
      }
      acc[row[label]].data.push({ x: row[x], y: row[y] });
      return acc;
    }, {});

    // returns a list of [{ label, data }]
    return Object.values(groupedByLabelMap);
  }
}
