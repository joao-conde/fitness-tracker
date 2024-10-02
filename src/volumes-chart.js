/**
 * Volume weight lifting chart.
 * X-axis are dates and Y-axis are number of repetitions for the heaviest weight
 * lifted for a given exercise.
 */
class VolumesChart extends FitnessChart {
  static OPTIONS = {
    type: "line",
    scales: {
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
          text: "Volume (number of reps)",
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      zoom: {
        zoom: {
          mode: "x",
          wheel: {
            enabled: true,
            speed: 0.1,
          },
          pinch: {
            enabled: true,
          },
        },
        pan: {
          enabled: true,
        },
      },
    },
  };

  static buildDatasets(data) {
    const dateExerciseWeightMaxRepsMap = this.workoutHeaviestSets(data);
    return this.labeledDatasets(
      dateExerciseWeightMaxRepsMap,
      "exercise",
      "date",
      "volume"
    );
  }
}
