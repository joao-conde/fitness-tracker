async function mount() {
  const response = await fetch("data/workouts.csv");
  const data = await response.text();

  const rows = new StrongParser(data).rows();

  const weightChart = new WeightsChart({
    canvasId: "weights-chart",
    data: rows,
  });
  const volumesChart = new VolumesChart({
    canvasId: "volumes-chart",
    data: rows,
  });

  new Dropdown({
    selectId: "exercises-filter",
    options: rows.map((r) => r.exercise),
    onChange: (exercise) => {
      weightChart.filter(exercise);
      volumesChart.filter(exercise);
    },
  });
}

document.addEventListener("DOMContentLoaded", async () => await mount());
