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
