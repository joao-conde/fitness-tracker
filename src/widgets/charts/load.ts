import { LineChart, LineChartDataset, LineChartScales } from "./line.ts";

type LoadChartOptions = {
  canvasId: string;
  datasets: Array<LineChartDataset>;
};

export class LoadChart extends LineChart {
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
        text: "Total Load",
      },
      beginAtZero: true,
    },
  };

  constructor({ canvasId, datasets }: LoadChartOptions) {
    super({ canvasId, datasets, scales: LoadChart.SCALES });
  }
}
