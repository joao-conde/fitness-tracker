class TrackerChart extends Chart {
  constructor(ctxId, dataUrl) {
    const ctx = document.getElementById(ctxId).getContext("2d");

    super(ctx, {
      type: "line",
      data: {
        datasets: [],
      },
      options: {
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
      },
    });

    this.ctx = ctx;
    this.ctxId = ctxId;
    this.dataUrl = dataUrl;
  }

  async load() {
    const response = await fetch(this.dataUrl);
    const data = await response.text();
    const strong = new StrongParser(data);
    const chartData = strong.groupByMax().groupByLabel().transformed;
    this.data.datasets = chartData;
    super.update();
  }
}
