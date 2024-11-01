async function mount() {
  // load and parse CSV file exported by Strong app
  const csv = await loadCsv("data/workouts.csv");
  const strong = new StrongParser(csv);

  const rows = strong.rows();
  const datasets = buildDatasets(rows);

  // build and mount the charts
  const weightChart = new WeightsChart({
    canvasId: "weights-chart",
    datasets: datasets.weights,
  });
  const volumesChart = new VolumesChart({
    canvasId: "volumes-chart",
    datasets: datasets.volumes,
  });

  // build and mount the exercises dropdown filter
  new Dropdown({
    selectId: "exercises-filter",
    options: datasets.labels,
    onChange: (exercise) => {
      weightChart.filter(exercise);
      volumesChart.filter(exercise);
    },
  });
}

document.addEventListener("DOMContentLoaded", async () => await mount());
