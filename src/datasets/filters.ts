import { Row } from "../strong.ts";
import { groupByLabel } from "./reducers.ts";

export const EXERCISE_INCLUDES = [
  "bench",
  "squat",
  "deadlift",
  "pull up",
  "bicep",
  "tricep",
];

export const EXERCISE_EXCLUDES = [
  "decline",
  "bodyweight",
  "close grip",
  "assisted",
  "cable",
  "rope tricep pushdown",
];

export const EXERCISE_MIN_FREQUENCY = 50;

export function filterLabelByFrequency({
  rows,
  label,
  minFrequency,
}: {
  rows: Array<Row>;
  label: keyof Row;
  minFrequency: number;
}) {
  const groupedByLabel = groupByLabel({ rows, label, x: "date", y: "weight" });

  const counts = groupedByLabel.reduce((acc: Record<string, number>, group) => {
    acc[group.label] = group.data.length;
    return acc;
  }, {});

  return rows.filter((row) => counts[row[label]] >= minFrequency);
}

export function filterLabelByValue({
  rows,
  label,
  includes = [],
  excludes = [],
}: {
  rows: Array<Row>;
  label: keyof Row;
  includes: Array<string>;
  excludes: Array<string>;
}) {
  return rows.filter(
    (row) =>
      includes.some((i) => row[label].toString().includes(i)) &&
      excludes.every((e) => !row[label].toString().includes(e)),
  );
}
