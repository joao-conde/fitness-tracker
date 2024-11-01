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

function workoutExerciseLoads(rows) {
  const loadsMap = rows.reduce((acc, row) => {
    const date = row.date;
    if (!acc[date]) acc[date] = {};

    const exercise = row.exercise;
    if (!acc[date][exercise]) acc[date][exercise] = { load: 0, ...row };

    acc[date][exercise].load += row.weight * row.volume;

    return acc;
  }, {});

  const loads = Object.keys(loadsMap).flatMap((date) =>
    Object.values(loadsMap[date])
  );
  return loads;
}
