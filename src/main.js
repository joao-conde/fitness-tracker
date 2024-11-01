async function mount() {
  // load and parse CSV file exported by Strong app
  const csv = await loadCsv("data/workouts.csv");
  const strong = new StrongParser(csv);

  // build datasets used by each chart
  const rows = strong.rows();
  const datasets = buildDatasets(rows);

  // build and mount the charts
  const weightChart = new WeightsChart({
    canvasId: "heaviest-sets-weight-chart",
    datasets: datasets.weights,
  });
  const volumesChart = new VolumesChart({
    canvasId: "heaviest-sets-volume-chart",
    datasets: datasets.volumes,
  });
  const loadChart = new LoadChart({
    canvasId: "load-chart",
    datasets: datasets.load,
  });

  // build and mount the exercises dropdown filter
  new Dropdown({
    selectId: "exercises-filter",
    options: datasets.labels,
    onChange: (exercise) => {
      weightChart.filter(exercise);
      volumesChart.filter(exercise);
      loadChart.filter(exercise);
    },
  });
}

document.addEventListener("DOMContentLoaded", async () => await mount());
