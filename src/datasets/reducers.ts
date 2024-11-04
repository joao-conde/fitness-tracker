import { Row } from "../strong.ts";

export function groupByLabel<T>({
  rows,
  label,
  x,
  y,
}: {
  rows: Array<T>;
  label: keyof T;
  x: keyof T;
  y: keyof T;
}) {
  const groupedByLabelMap = rows.reduce(
    (
      acc: Record<string, { label: string; data: Array<{ x: any; y: any }> }>,
      row: T,
    ) => {
      if (!acc[row[label] as string]) {
        acc[row[label] as string] = {
          label: row[label] as string,
          data: [],
        };
      }
      acc[row[label] as string].data.push({ x: row[x], y: row[y] });
      return acc;
    },
    {},
  );

  const groups = Object.values(groupedByLabelMap);
  return groups;
}

export function workoutHeaviestSets(rows: Array<Row>) {
  const heaviestSetMap = rows.reduce(
    (acc: Record<string, Record<string, Row>>, row: Row) => {
      const date = row.date;
      if (!acc[date]) acc[date] = {};

      const exercise = row.exercise;
      if (!acc[date][exercise]) {
        acc[date][exercise] = { ...row, weight: -Infinity };
      }

      const weight = row.weight;
      if (weight >= acc[date][exercise].weight) {
        acc[date][exercise] = row;
      }

      return acc;
    },
    {},
  );

  const heaviestSets = Object.keys(heaviestSetMap).flatMap((date) =>
    Object.values(heaviestSetMap[date])
  );
  return heaviestSets;
}

type ExerciseAgg = Row & {
  load: number;
};

export function workoutExerciseLoads(rows: Array<Row>) {
  const loadsMap = rows.reduce(
    (acc: Record<string, Record<string, ExerciseAgg>>, row: Row) => {
      const date = row.date;
      if (!acc[date]) acc[date] = {};

      const exercise = row.exercise;
      if (!acc[date][exercise]) acc[date][exercise] = { load: 0, ...row };

      acc[date][exercise].load += row.weight * row.volume;

      return acc;
    },
    {},
  );

  const loads = Object.keys(loadsMap).flatMap((date) =>
    Object.values(loadsMap[date])
  );
  return loads;
}

type WorkoutAgg = Row & {
  load: number;
};

export function workoutLoads(rows: Array<Row>) {
  const loadsMap = rows.reduce((acc: Record<string, WorkoutAgg>, row) => {
    const date = row.date;
    if (!acc[date]) acc[date] = { load: 0, ...row };
    acc[date].load += row.weight * row.volume;
    return acc;
  }, {});

  const loads = Object.values(loadsMap);
  return loads;
}
