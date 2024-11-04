function buildDatasets(rows) {
  rows = filterLabelByFrequency({
    rows,
    label: "exercise",
    minFrequency: EXERCISE_MIN_FREQUENCY,
  });
  rows = filterLabelByValue({
    rows,
    label: "exercise",
    includes: EXERCISE_INCLUDES,
    excludes: EXERCISE_EXCLUDES,
  });

  const heaviestSets = workoutHeaviestSets(rows);
  const heaviestSetWeights = groupByLabel({
    rows: heaviestSets,
    label: "exercise",
    x: "date",
    y: "weight",
  });
  const heaviestSetVolumes = groupByLabel({
    rows: heaviestSets,
    label: "exercise",
    x: "date",
    y: "volume",
  });

  const exercisesLoad = groupByLabel({
    rows: workoutExerciseLoads(rows),
    label: "exercise",
    x: "date",
    y: "load",
  });

  const workoutLoad = groupByLabel({
    rows: workoutLoads(rows),
    label: "date",
    x: "date",
    y: "load",
  });

  return {
    labels: rows.map((row) => row.exercise),
    weights: heaviestSetWeights,
    volumes: heaviestSetVolumes,
    exercisesLoad: exercisesLoad,
    workoutLoad: workoutLoad,
  };
}