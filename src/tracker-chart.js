/**
 * A tracker chart class where X axis is a date and Y axis a weight.
 */
class TrackerChart extends Chart {
  constructor(ctxId, dataUrl) {
    const ctx = document.getElementById(ctxId).getContext("2d");

    super(ctx, {
      type: "line",
      data: {
        datasets: [],
      },
      options: TrackerChart.options(),
    });

    this.ctx = ctx;
    this.ctxId = ctxId;
    this.dataUrl = dataUrl;
  }

  static options() {
    return {
      scales: {
        x: {
          type: "time",
          time: {
            unit: "day",
            tooltipFormat: "DD/MM/YYYY",
            displayFormats: {
              day: "DD/MM/YYYY",
            },
          },
          title: {
            display: true,
            text: "Date",
          },
        },
        y: {
          title: {
            display: true,
            text: "Weight (kg)",
          },
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
      },
    };
  }

  async load() {
    const response = await fetch(this.dataUrl);
    const data = await response.text();
    const parser = new StrongParser(data);
    const datasets = parser.groupByMax().groupByLabel().transformed;
    this.data.datasets = datasets;
    super.update();
  }
}
