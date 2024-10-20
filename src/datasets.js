/**
 * Takes a list of rows and finds out the row corresponding to the
 * heaviest set of one exercise for one workout.
 *
 * Returns the heaviest set rows.
 */
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

/**
 * Takes a list of rows and the name of the label to use and
 * group data. Each group holds data points with x and y
 * pairs.
 */
function groupByLabel(data, label, x, y) {
  // builds map[label] => { label, data }
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

  // returns a list of [{ label, data }]
  const groups = Object.values(groupedByLabelMap);
  return groups;
}
