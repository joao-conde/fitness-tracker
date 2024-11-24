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
};

export class LineChart extends Chart {
  private originalDatasets: Array<LineChartDataset>;

  constructor({ canvasId, datasets, scales }: LineChartOptions) {
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
        datasets: datasets,
      },
    };
    super(ctx!, config);

    this.originalDatasets = datasets;
  }

  public filter(label: string) {
    this.data.datasets = this.originalDatasets.filter((d) =>
      d.label?.includes(label)
    );
    this.update();
  }
}
