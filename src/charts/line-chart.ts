import { Chart, ChartConfiguration, ChartDataset } from "npm:chart.js";

export class LineChart extends Chart {
  private originalDatasets: Array<ChartDataset<"line">>;

  constructor({
    canvasId,
    datasets,
    scales,
  }: {
    canvasId: string;
    datasets: Array<ChartDataset<"line">>;
    scales: Record<string, any>;
  }) {
    const canvas = document.getElementById(
      canvasId
    ) as HTMLCanvasElement | null;
    const ctx = canvas?.getContext("2d");

    if (!ctx) {
      throw Error("no context");
    }

    const config: ChartConfiguration<"line"> = {
      type: "line",
      options: {
        plugins: {
          legend: {
            display: true,
          },
        },
        scales,
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
      d.label?.includes(label)
    );
    this.update();
  }
}
