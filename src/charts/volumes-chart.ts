import { LineChart, LineChartDataset, LineChartScales } from "./line-chart.ts";

type VolumesChartOptions = {
  canvasId: string;
  datasets: Array<LineChartDataset>;
};

export class VolumesChart extends LineChart {
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
        text: "Repetitions",
      },
      beginAtZero: true,
    },
  };

  constructor({ canvasId, datasets }: VolumesChartOptions) {
    super({ canvasId, datasets, scales: VolumesChart.SCALES });
  }
}
