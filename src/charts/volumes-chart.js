/**
 * Volume weight lifting chart.
 * X-axis for dates and Y-axis for the number of repetitions made in the heaviest set.
 */
class VolumesChart extends FitnessChart {
  buildScales() {
    return {
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
  }
}
