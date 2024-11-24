import { Row } from "../parsers/parser.ts";
import { Label } from "./builders.ts";
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
  "rope tricep pushdown",
];

export const EXERCISE_MIN_FREQUENCY = 50;

type FilterByFrequencyOptions = {
  rows: Array<Row>;
  label: keyof Row;
  minFrequency: number;
};

type FilterByValueOptions = {
  rows: Array<Row>;
  label: keyof Row;
  includes: Array<string>;
  excludes: Array<string>;
};

export function filterLabelByFrequency({
  rows,
  label,
  minFrequency,
}: FilterByFrequencyOptions): Array<Row> {
  const groupedByLabel = groupByLabel({
    rows: rows,
    label: label,
    x: "date",
    y: "weight",
  });

  const counts = groupedByLabel.reduce((acc: Record<Label, number>, group) => {
    acc[group.label!] = group.data.length;
    return acc;
  }, {});

  return rows.filter((row) => counts[row[label]] >= minFrequency);
}

export function filterLabelByValue({
  rows,
  label,
  includes = [],
  excludes = [],
}: FilterByValueOptions): Array<Row> {
  return rows.filter(
    (row) =>
      includes.some((i) => row[label].toString().includes(i)) &&
      excludes.every((e) => !row[label].toString().includes(e))
  );
}
