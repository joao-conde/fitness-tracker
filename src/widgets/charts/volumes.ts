import { LineChart, LineChartDataset, LineChartScales } from "./line.ts";

type VolumesChartOptions = {
  canvasId: string;
  datasets: Array<LineChartDataset>;
};

export class VolumesChart extends LineChart {
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
        text: "Best Set Repetitions",
      },
      beginAtZero: true,
    },
  };

  constructor({ canvasId, datasets }: VolumesChartOptions) {
    super({ canvasId, datasets, scales: VolumesChart.SCALES });
  }
}
