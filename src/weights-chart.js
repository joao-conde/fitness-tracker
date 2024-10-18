/**
 * Weight lifting chart.
 * X-axis for dates and Y-axis for the weight lifted in the heaviest set.
 */
class WeightsChart extends FitnessChart {
  buildScales() {
    return {
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
  }

  buildDatasets(data) {
    const heaviestSets = workoutHeaviestSets(data);
    return groupByLabel(heaviestSets, "exercise", "date", "weight");
  }
}
