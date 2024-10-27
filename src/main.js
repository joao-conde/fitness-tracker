async function mount() {
  // load and parse CSV file exported by Strong app
  const csv = await loadCsv("data/workouts.csv");
  const strong = new StrongParser(csv);

  // filter irrelevant data out
  let rows = strong.rows();
  rows = filterLabelByFrequency(rows, "exercise", 1);
  rows = filterLabelByValue(
    rows,
    "exercise",
    EXERCISE_INCLUDES,
    EXERCISE_EXCLUDES
  );

  // reduce data to heaviest sets and get heaviest
  // set's weight and volume
  const heaviestSets = workoutHeaviestSets(rows);
  const heaviestSetWeights = groupByLabel(
    heaviestSets,
    "exercise",
    "date",
    "weight"
  );
  const heaviestSetVolumes = groupByLabel(
    heaviestSets,
    "exercise",
    "date",
    "volume"
  );

  // build and mount the charts
  const weightChart = new WeightsChart({
    canvasId: "weights-chart",
    datasets: heaviestSetWeights,
  });
  const volumesChart = new VolumesChart({
    canvasId: "volumes-chart",
    datasets: heaviestSetVolumes,
  });

  // build and mount the exercises dropdown filter
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
