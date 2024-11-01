class LineChart extends Chart {
  constructor({ canvasId, datasets } = {}) {
    const ctx = document.getElementById(canvasId).getContext("2d");
    super(ctx);

    this.config.type = "line";
    this.options = {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: this.constructor.SCALES,
    };

    this.data.datasets = datasets;
    this.originalDatasets = datasets;

    this.update();
  }

  filter(label) {
    this.data.datasets = this.originalDatasets.filter((d) => d.label === label);
    this.update();
  }
}
