import { LineChart } from "./line-chart.ts";

export class VolumesChart extends LineChart {
  static SCALES = {
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

  constructor(options: { canvasId: string; datasets: Array<any> }) {
    super({ ...options, scales: VolumesChart.SCALES });
  }
}
