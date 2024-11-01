const EXERCISE_INCLUDES = [
  "bench",
  "squat",
  "deadlift",
  "pull up",
  "bicep",
  "tricep",
];

const EXERCISE_EXCLUDES = [
  "decline",
  "bodyweight",
  "close grip",
  "assisted",
  "cable",
  "rope tricep pushdown",
];

const EXERCISE_MIN_FREQUENCY = 50;

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

  return {
    labels: rows.map((row) => row.exercise),
    weights: heaviestSetWeights,
    volumes: heaviestSetVolumes,
  };
}

function filterLabelByFrequency({ rows, label, minFrequency } = {}) {
  const groupedByLabel = groupByLabel({ rows, label, x: null, y: null });

  const counts = groupedByLabel.reduce((acc, group) => {
    acc[group.label] = group.data.length;
    return acc;
  }, {});

  return rows.filter((row) => counts[row[label]] >= minFrequency);
}

function filterLabelByValue({
  rows,
  label,
  includes = [],
  excludes = [],
} = {}) {
  return rows.filter(
    (row) =>
      includes.some((i) => row[label].includes(i)) &&
      excludes.every((e) => !row[label].includes(e))
  );
}

function groupByLabel({ rows, label, x, y } = {}) {
  const groupedByLabelMap = rows.reduce((acc, row) => {
    if (!acc[row[label]]) {
      acc[row[label]] = {
        label: row[label],
        data: [],
      };
    }
    acc[row[label]].data.push({ x: row[x], y: row[y] });
    return acc;
  }, {});

  const groups = Object.values(groupedByLabelMap);
  return groups;
}

function workoutHeaviestSets(rows) {
  const heaviestSetMap = rows.reduce((acc, row) => {
    const date = row.date;
    if (!acc[date]) acc[date] = {};

    const exercise = row.exercise;
    if (!acc[date][exercise]) acc[date][exercise] = { weight: -Infinity };

    const weight = row.weight;
    if (weight >= acc[date][exercise].weight) {
      acc[date][exercise] = row;
    }

    return acc;
  }, {});

  const heaviestSets = Object.keys(heaviestSetMap).flatMap((date) =>
    Object.values(heaviestSetMap[date])
  );
  return heaviestSets;
}
