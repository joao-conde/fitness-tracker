class LineChart extends Chart {
  constructor({ canvasId, datasets } = {}) {
    const ctx = document.getElementById(canvasId).getContext("2d");
    super(ctx);

    this.config.type = "line";
    this.options = {
      scales: this.constructor.SCALES,
    };

    this.data.datasets = datasets;
    this.originalDatasets = datasets;

    this.update();
  }

  filter(label) {
    this.data.datasets = this.originalDatasets.filter((d) =>
      d.label.includes(label)
    );
    this.update();
  }
}
