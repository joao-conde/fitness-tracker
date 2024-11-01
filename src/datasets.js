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

const MIN_FREQUENCY = 50;

function buildDatasets(rows) {
  rows = filterLabelByFrequency(rows, "exercise", MIN_FREQUENCY);
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

  return {
    labels: rows.map((row) => row.exercise),
    weights: heaviestSetWeights,
    volumes: heaviestSetVolumes,
  };
}

function filterLabelByFrequency(rows, label, minFrequency) {
  const groupedByLabel = groupByLabel(rows, label, null, null);

  const counts = groupedByLabel.reduce((acc, group) => {
    acc[group.label] = group.data.length;
    return acc;
  }, {});

  return rows.filter((row) => counts[row[label]] >= minFrequency);
}

function filterLabelByValue(rows, label, includes, excludes) {
  return rows.filter(
    (row) =>
      includes.some((i) => row[label].includes(i)) &&
      excludes.every((e) => !row[label].includes(e))
  );
}

function groupByLabel(data, label, x, y) {
  // builds map[row[label]] => { row[label], [{x, y}] }
  const groupedByLabelMap = data.reduce((acc, row) => {
    if (!acc[row[label]]) {
      acc[row[label]] = {
        label: row[label],
        data: [],
      };
    }
    acc[row[label]].data.push({ x: row[x], y: row[y] });
    return acc;
  }, {});

  // returns a list of [{ row[label], [{x, y}] }]
  const groups = Object.values(groupedByLabelMap);
  return groups;
}

function workoutHeaviestSets(data) {
  // builds map[date][exercise] => heaviest set row
  const heaviestSetMap = data.reduce((acc, row) => {
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

  // turns the map into a list of heaviest sets
  const heaviestSets = Object.keys(heaviestSetMap).flatMap((date) =>
    Object.values(heaviestSetMap[date])
  );
  return heaviestSets;
}
