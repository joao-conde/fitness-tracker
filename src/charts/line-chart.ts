import { Chart, ChartConfiguration } from "npm:chart.js";

export class LineChart extends Chart {
  originalDatasets: Array<any>;

  constructor({
    canvasId,
    datasets,
    scales,
  }: {
    canvasId: string;
    datasets: Array<any>;
    scales: Record<string, any>;
  }) {
    const canvas = document.getElementById(
      canvasId,
    ) as HTMLCanvasElement | null;
    const ctx = canvas?.getContext("2d");

    if (!ctx) {
      throw Error("no context");
    }

    const config: ChartConfiguration = {
      type: "line",
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: scales,
      },
      data: {
        datasets: datasets,
      },
    };
    super(ctx, config);

    this.originalDatasets = datasets;
  }

  filter(label: string) {
    this.data.datasets = this.originalDatasets.filter((d) =>
      d.label.includes(label)
    );
    this.update();
  }
}
