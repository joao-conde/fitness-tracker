/**
 * Weight lifting chart.
 * X-axis are dates and Y-axis weight lifted for a given exercise.
 */
class WeightsChart extends FitnessChart {
  static SCALES = {
    x: {
      type: "time",
      time: {
        unit: "day",
        tooltipFormat: "DD/MM/YYYY",
        displayFormats: {
          day: "DD/MM/YYYY",
        },
      },
      title: {
        display: true,
        text: "Date",
      },
    },
    y: {
      title: {
        display: true,
        text: "Weight (kg)",
      },
      beginAtZero: true,
    },
  };

  static buildDatasets(data) {
    const heaviestSets = this.workoutHeaviestSets(data);
    return this.groupByLabel(heaviestSets, "exercise", "date", "weight");
  }
}
