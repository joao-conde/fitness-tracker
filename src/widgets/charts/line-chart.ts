import {
  Chart,
  ChartConfiguration,
  ChartDataset,
  ScaleOptionsByType,
} from "npm:chart.js";

import { DeepPartial } from "../../utils.ts";

export type LineChartDataset = ChartDataset<"line">;

export type LineChartScales = {
  x: DeepPartial<ScaleOptionsByType<"time">>;
  y: DeepPartial<ScaleOptionsByType<"linear">>;
};

type LineChartOptions = {
  canvasId: string;
  datasets: Array<LineChartDataset>;
  scales: LineChartScales;
  borderWidth?: number;
  pointRadius?: number;
  pointHoverRadius?: number;
};

export class LineChart extends Chart {
  private originalDatasets: Array<LineChartDataset>;

  constructor({
    canvasId,
    datasets,
    scales,
    borderWidth = 1.5,
    pointRadius = 2,
    pointHoverRadius = 5,
  }: LineChartOptions) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    const config: ChartConfiguration<"line"> = {
      type: "line",
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: scales.x as ScaleOptionsByType<"time">,
          y: scales.y as ScaleOptionsByType<"linear">,
        },
      },
      data: {
        datasets: datasets.map((dataset) => ({
          ...dataset,
          borderWidth,
          pointRadius,
          pointHoverRadius,
        })),
      },
    };
    super(ctx!, config);

    this.originalDatasets = this.data.datasets as Array<LineChartDataset>;
  }

  public filter(label: string) {
    this.data.datasets = this.originalDatasets.filter((d) =>
      d.label?.includes(label)
    );
    this.update();
  }
}
