/**
 * Weight lifting chart.
 * X-axis are dates and Y-axis weight lifted for a given exercise.
 */
class WeightsChart extends Chart {
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
          text: "Weight (kg)",
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

  /**
   * Chart constructor that mounts it on the DOM canvas element.
   */
  constructor(canvasId, data) {
    const ctx = document.getElementById(canvasId).getContext("2d");
    super(ctx, {
      type: WeightsChart.OPTIONS.type,
      options: WeightsChart.OPTIONS,
      data: {
        datasets: WeightsChart.buildDatasets(data),
      },
    });
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
    // each workout/date
    const dateExerciseWeightMaxMap = relevantExercises.reduce((acc, row) => {
      const date = row.date;
      if (!acc[date]) acc[date] = {};

      const exercise = row.exercise;
      if (!acc[date][exercise]) acc[date][exercise] = -Infinity;

      const weight = row.weight;
      acc[date][exercise] = Math.max(acc[date][exercise], weight);

      return acc;
    }, {});

    // converts the previous map to a list of objects labeled and dated
    const dateExerciseWeightMaxes = Object.keys(
      dateExerciseWeightMaxMap
    ).flatMap((date) => {
      return Object.keys(dateExerciseWeightMaxMap[date]).map((exercise) => ({
        exercise,
        date,
        weight: dateExerciseWeightMaxMap[date][exercise],
      }));
    });

    // converts the previous list to a map of exercise to
    // its label, data points and color to use in the graph
    const labeledDatasetMap = dateExerciseWeightMaxes.reduce(
      (acc, { exercise, date, weight }) => {
        if (!acc[exercise]) {
          acc[exercise] = {
            label: exercise,
            data: [],
          };
        }
        acc[exercise].data.push({ x: date, y: weight });
        return acc;
      },
      {}
    );

    // returns the dataset for the chart, labeled and colored
    const labeledDataset = Object.values(labeledDatasetMap);
    return labeledDataset;
  }
}
