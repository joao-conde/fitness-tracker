import { LineChart, LineChartDataset, LineChartScales } from "./line-chart.ts";

export class LoadChart extends LineChart {
  static SCALES: LineChartScales = {
    x: {
      title: {
        display: true,
        text: "Date",
      },
      type: "time",
      time: {
        unit: "day",
        tooltipFormat: "DD/MM/YYYY",
        displayFormats: {
          day: "DD/MM/YYYY",
        },
      },
    },
    y: {
      title: {
        display: true,
        text: "Total Load (all sets sum of weights * repetitions)",
      },
      beginAtZero: true,
    },
  };

  constructor(canvasId: string, datasets: Array<LineChartDataset>) {
    super(canvasId, datasets, LoadChart.SCALES);
  }
}
