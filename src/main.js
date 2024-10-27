async function mount() {
  const response = await fetch("data/workouts.csv");
  const data = await response.text();

  let rows = new StrongParser(data).rows();
  rows = filterLabelByFrequency(rows, "exercise", MIN_FREQUENCY);
  rows = filterLabelByValue(
    rows,
    "exercise",
    EXERCISE_INCLUDES,
    EXERCISE_EXCLUDES
  );

  const heaviestSets = workoutHeaviestSets(rows);

  const weightChart = new WeightsChart({
    canvasId: "weights-chart",
    datasets: groupByLabel(heaviestSets, "exercise", "date", "weight"),
  });
  const volumesChart = new VolumesChart({
    canvasId: "volumes-chart",
    datasets: groupByLabel(heaviestSets, "exercise", "date", "volume"),
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
