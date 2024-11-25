import { LineChart, LineChartDataset, LineChartScales } from "./line-chart.ts";

type WeightsChartOptions = {
  canvasId: string;
  datasets: Array<LineChartDataset>;
};

export class WeightsChart extends LineChart {
  private static SCALES: LineChartScales = {
    x: {
      title: {
        display: true,
        text: "Date",
      },
      type: "time",
      time: {
        unit: "day",
        tooltipFormat: "DD MMM YYYY",
        displayFormats: {
          day: "DD MMM YYYY",
        },
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

  constructor({ canvasId, datasets }: WeightsChartOptions) {
    super({ canvasId, datasets, scales: WeightsChart.SCALES });
  }
}
