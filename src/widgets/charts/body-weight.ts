import { LineChart, LineChartDataset, LineChartScales } from "./line-chart.ts";

type BodyWeightChartOptions = {
  canvasId: string;
  datasets: Array<LineChartDataset>;
};

export class BodyWeightChart extends LineChart {
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
        text: "Body Weight (kg)",
      },
    },
  };

  constructor({ canvasId, datasets }: BodyWeightChartOptions) {
    super({ canvasId, datasets, scales: BodyWeightChart.SCALES });
  }
}
