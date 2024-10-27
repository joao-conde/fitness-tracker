class FitnessChart extends Chart {
  constructor({ canvasId, datasets } = {}) {
    // get canvas context and create chart
    const ctx = document.getElementById(canvasId).getContext("2d");
    super(ctx);

    // resolve options based on defaults and child class
    // scale overrides
    const options = {
      type: "line",
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
      },
      scales: this.buildScales(),
    };
    this.config.type = options.type;
    this.options = options;

    // build the datasets with child class implementation
    this.data.datasets = datasets;
    this.originalDatasets = datasets;

    // update the chart to ensure proper render
    this.update();
  }

  buildScales() {
    throw new Error("not implemented");
  }

  filter(exercise) {
    this.data.datasets = this.originalDatasets.filter((d) =>
      d.label.includes(exercise)
    );
    this.update();
  }
}
