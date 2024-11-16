import { LineChart, LineChartDataset, LineChartScales } from "./line-chart.ts";

export class WeightsChart extends LineChart {
  static SCALES: LineChartScales = {
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
  };

  constructor(canvasId: string, datasets: Array<LineChartDataset>) {
    super(canvasId, datasets, WeightsChart.SCALES);
  }
}
