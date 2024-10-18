async function mount() {
  const response = await fetch("data/workouts.csv");
  const data = await response.text();

  const rows = new StrongCsv(data).rows();

  const weightChart = new WeightsChart({
    canvasId: "weights-chart",
    data: rows,
  });
  const volumesChart = new VolumesChart({
    canvasId: "volumes-chart",
    data: rows,
  });

  new SelectFilter({
    selectId: "exercises-filter",
    options: rows.map((r) => r.exercise),
    onFilter: (exercise) => {
      weightChart.filter(exercise);
      volumesChart.filter(exercise);
    },
  });
}

document.addEventListener("DOMContentLoaded", async () => await mount());
