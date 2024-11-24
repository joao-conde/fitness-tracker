import {
  Dropdown,
  LoadChart,
  VolumesChart,
  WeightsChart,
} from "./widgets/mod.ts";
import { buildDatasets } from "./datasets/builders.ts";
import { StrongParser } from "./parsers/mod.ts";
import { loadCsv } from "./utils.ts";

async function mount() {
  // load and parse CSV file exported by Strong app
  const csv = await loadCsv("data/workouts.csv");
  const strong = new StrongParser();
  const rows = strong.parse(csv);

  // build datasets used by each chart
  const datasets = buildDatasets(rows);

  // mount the charts on the DOM
  const weightChart = new WeightsChart({
    canvasId: "heaviest-sets-weight-chart",
    datasets: datasets.weights,
  });
  const volumesChart = new VolumesChart({
    canvasId: "heaviest-sets-volume-chart",
    datasets: datasets.volumes,
  });
  const exercisesLoadChart = new LoadChart({
    canvasId: "exercises-load-chart",
    datasets: datasets.exercisesLoad,
  });
  new LoadChart({
    canvasId: "workout-load-chart",
    datasets: datasets.workoutLoad,
  });

  // mount the exercises dropdown filter on the DOM
  new Dropdown({
    selectId: "exercises-filter",
    options: datasets.labels,
    onChange: (exercise: string) => {
      weightChart.filter(exercise);
      volumesChart.filter(exercise);
      exercisesLoadChart.filter(exercise);
    },
  });
}

document.addEventListener("DOMContentLoaded", async () => await mount());