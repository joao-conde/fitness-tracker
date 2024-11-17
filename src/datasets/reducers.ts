import { Point } from "npm:chart.js";

import { Row } from "../parsers/parser.ts";
import { LineChartDataset } from "../charts/line-chart.ts";
import { Date, Exercise, Label } from "./builders.ts";

type RowWithLoad = Row & {
  load: number;
};

type GroupByLabelOptions<T> = {
  rows: Array<T>;
  label: keyof T;
  x: keyof T;
  y: keyof T;
};

export function groupByLabel<T>({
  rows,
  label,
  x,
  y,
}: GroupByLabelOptions<T>): Array<LineChartDataset> {
  const groupedByLabelMap = rows.reduce(
    (acc: Record<Label, { label: Label; data: Array<Point> }>, row: T) => {
      const labelValue = row[label] as string;
      const xValue = row[x] as number;
      const yValue = row[y] as number;

      if (!acc[labelValue]) {
        acc[labelValue] = {
          label: labelValue,
          data: [],
        };
      }

      acc[labelValue].data.push({
        x: xValue,
        y: yValue,
      });
      return acc;
    },
    {},
  );

  const groups = Object.values(groupedByLabelMap);
  return groups;
}

export function workoutHeaviestSets(rows: Array<Row>): Array<Row> {
  const heaviestSetMap = rows.reduce(
    (acc: Record<Date, Record<Exercise, Row>>, row: Row) => {
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

export function workoutExerciseLoads(rows: Array<Row>): Array<RowWithLoad> {
  const loadsMap = rows.reduce(
    (acc: Record<Date, Record<Exercise, RowWithLoad>>, row: Row) => {
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

export function workoutLoads(rows: Array<Row>): Array<RowWithLoad> {
  const loadsMap = rows.reduce((acc: Record<Date, RowWithLoad>, row) => {
    const date = row.date;
    if (!acc[date]) acc[date] = { load: 0, ...row };
    acc[date].load += row.weight * row.volume;
    return acc;
  }, {});

  const loads = Object.values(loadsMap);
  return loads;
}
