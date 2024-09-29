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
            speed: 0.5,
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
    const matches = data.filter((row) => {
      const fuzzy_allow_match = WeightsChart.ALLOW_LIST.some((label) =>
        row.exercise.toLowerCase().includes(label.toLowerCase())
      );
      const fuzzy_deny_match = WeightsChart.DENY_LIST.some((label) =>
        row.exercise.toLowerCase().includes(label.toLowerCase())
      );
      return fuzzy_allow_match && !fuzzy_deny_match;
    });

    const dateExerciseWeightMaxMap = matches.reduce((acc, row) => {
      const date = row.date;
      if (!acc[date]) acc[date] = {};

      const exercise = row.exercise;
      if (!acc[date][exercise]) acc[date][exercise] = -Infinity;

      const weight = row.weight;
      acc[date][exercise] = Math.max(acc[date][exercise], weight);

      return acc;
    }, {});

    const dateExerciseWeightMaxes = Object.keys(
      dateExerciseWeightMaxMap
    ).flatMap((date) => {
      return Object.keys(dateExerciseWeightMaxMap[date]).map((exercise) => ({
        exercise,
        date,
        weight: dateExerciseWeightMaxMap[date][exercise],
      }));
    });

    const labeledDatasetMap = dateExerciseWeightMaxes.reduce(
      (acc, { exercise, date, weight }) => {
        if (!acc[exercise]) {
          const red = Math.random() * 255;
          const green = Math.random() * 255;
          const blue = Math.random() * 255;
          acc[exercise] = {
            label: exercise,
            color: `rgb(${red}, ${green}, ${blue})`,
            data: [],
          };
        }
        acc[exercise].data.push({ x: date, y: weight });
        return acc;
      },
      {}
    );

    const labeledDataset = Object.values(labeledDatasetMap);
    return labeledDataset;
  }
}
