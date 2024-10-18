class FitnessChart extends Chart {
  constructor({ canvasId, data } = {}) {
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

  buildScales() {
    throw new Error("not implemented");
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
}
