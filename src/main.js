const INCLUDES = ["incline bench press", "bench press", "bicep curl"];
const EXCLUDES = [];

async function mount() {
  // load CSV
  const response = await fetch("data/workouts.csv");
  const data = await response.text();

  // parse + sanitize data to format
  const parser = new StrongCsvParser(data);

  // filter out irrelevant exercises
  const rows = parser.rows.filter(
    (row) =>
      INCLUDES.some((i) => row.exercise.includes(i)) &&
      EXCLUDES.every((e) => !row.exercise.includes(e))
  );

  // chart data
  const weightChart = new WeightsChart("weights-chart", rows);
  const volumesChart = new VolumesChart("volumes-chart", rows);

  // enable dynamic filters
  new ExercisesFilter({
    selectId: "exercises-filter",
    options: rows.map((r) => r.exercise),
    onFilter: (exercise) => {
      weightChart.filter(exercise);
      volumesChart.filter(exercise);
    },
  });
}

document.addEventListener("DOMContentLoaded", async () => await mount());
