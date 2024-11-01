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
