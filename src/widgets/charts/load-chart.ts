import { LineChart, LineChartDataset, LineChartScales } from "./line-chart.ts";

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

  constructor({ canvasId, datasets }: LoadChartOptions) {
    super({ canvasId, datasets, scales: LoadChart.SCALES });
  }
}
