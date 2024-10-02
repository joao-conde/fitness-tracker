/**
 * Volume weight lifting chart.
 * X-axis are dates and Y-axis are number of repetitions for the heaviest weight
 * lifted for a given exercise.
 */
class VolumesChart extends Chart {
  /**
   * A case insensitive "fuzzy" allow list of exercises to filter for.
   */
  static ALLOW_LIST = [
    "bicep curl",
    "incline bench",
    "lateral",
    "shoulder press",
    "fly",
  ];

  /**
   * A case insensitive "fuzzy" deny list of exercises to filter out.
   */
  static DENY_LIST = ["machine", "band", "cable"];

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

  constructor(canvasId, data) {
    const ctx = document.getElementById(canvasId).getContext("2d");
    const datasets = VolumesChart.buildDatasets(data);
    super(ctx, {
      type: VolumesChart.OPTIONS.type,
      options: VolumesChart.OPTIONS,
      data: {
        datasets: datasets,
      },
    });
    this.originalDatasets = datasets;
  }

  static buildDatasets(data) {
    // filters for relevant exercises
    const relevantExercises = data.filter((row) => {
      const fuzzy_allow_match = WeightsChart.ALLOW_LIST.some((label) =>
        row.exercise.toLowerCase().includes(label.toLowerCase())
      );
      const fuzzy_deny_match = WeightsChart.DENY_LIST.some((label) =>
        row.exercise.toLowerCase().includes(label.toLowerCase())
      );
      return fuzzy_allow_match && !fuzzy_deny_match;
    });

    // builds a map of the maximum weight for each exercise of
    // each workout/date and volume (number of reps)
    const dateExerciseWeightMaxRepsMap = relevantExercises.reduce(
      (acc, row) => {
        const date = row.date;
        if (!acc[date]) {
          acc[date] = {};
        }

        const exercise = row.exercise;
        if (!acc[date][exercise]) {
          acc[date][exercise] = { volume: 0, weight: -Infinity };
        }

        const weight = row.weight;
        const volume = row.volume;
        if (weight >= acc[date][exercise].weight) {
          acc[date][exercise].volume = volume;
        }

        return acc;
      },
      {}
    );

    // converts the previous map to a list of objects labeled and dated
    const dateExerciseWeightMaxReps = Object.keys(
      dateExerciseWeightMaxRepsMap
    ).flatMap((date) => {
      return Object.keys(dateExerciseWeightMaxRepsMap[date]).map(
        (exercise) => ({
          exercise,
          date,
          weight: dateExerciseWeightMaxRepsMap[date][exercise].weight,
          volume: dateExerciseWeightMaxRepsMap[date][exercise].volume,
        })
      );
    });

    // converts the previous list to a map of exercise to
    // its label, data points and color to use in the graph
    const labeledDatasetMap = dateExerciseWeightMaxReps.reduce(
      (acc, { exercise, date, volume }) => {
        if (!acc[exercise]) {
          acc[exercise] = {
            label: exercise,
            data: [],
          };
        }
        acc[exercise].data.push({ x: date, y: volume });
        return acc;
      },
      {}
    );

    // returns the dataset for the chart, labeled and colored
    const labeledDataset = Object.values(labeledDatasetMap);
    return labeledDataset;
  }

  filter(exercise) {
    this.data.datasets = this.originalDatasets.filter((d) =>
      d.label.includes(exercise)
    );
    this.update();
  }
}
