/**
 * Volume weight lifting chart.
 * X-axis are dates and Y-axis are number of repetitions for the heaviest weight
 * lifted for a given exercise.
 */
class VolumesChart extends FitnessChart {
  static SCALES = {
    x: {
      title: {
        display: true,
        text: "Date",
      },
      type: "time",
      time: {
        unit: "day",
        tooltipFormat: "DD/MM/YYYY",
        displayFormats: {
          day: "DD/MM/YYYY",
        },
      },
    },
    y: {
      title: {
        display: true,
        text: "Volume (number of reps)",
      },
      beginAtZero: true,
    },
  };

  static buildDatasets(data) {
    const dateExerciseWeightMaxRepsMap = this.workoutHeaviestSets(data);
    return this.groupByLabel(
      dateExerciseWeightMaxRepsMap,
      "exercise",
      "date",
      "volume"
    );
  }
}
