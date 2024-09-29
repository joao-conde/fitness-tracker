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

  constructor(canvasId, data) {
    const ctx = document.getElementById(canvasId).getContext("2d");
    super(ctx, {
      type: VolumesChart.OPTIONS.type,
      options: VolumesChart.OPTIONS,
      data: {
        datasets: VolumesChart.buildDatasets(data),
      },
    });
    console.log(this.data.datasets);
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

    const dateExerciseWeightMaxWithRepsMap = matches.reduce((acc, row) => {
      const date = row.date;
      if (!acc[date]) acc[date] = {};

      const exercise = row.exercise;
      if (!acc[date][exercise])
        acc[date][exercise] = { volume: 0, weight: -Infinity };

      const weight = row.weight;
      const volume = row.volume;
      if (weight >= acc[date][exercise].weight) {
        acc[date][exercise].volume = volume;
      }

      return acc;
    }, {});

    // converts the previous map to a list of objects labeled and dated
    const dateExerciseWeightMaxes = Object.keys(
      dateExerciseWeightMaxWithRepsMap
    ).flatMap((date) => {
      return Object.keys(dateExerciseWeightMaxWithRepsMap[date]).map(
        (exercise) => ({
          exercise,
          date,
          weight: dateExerciseWeightMaxWithRepsMap[date][exercise].weight,
          volume: dateExerciseWeightMaxWithRepsMap[date][exercise].volume,
        })
      );
    });

    const labeledDatasetMap = dateExerciseWeightMaxes.reduce(
      (acc, { exercise, date, volume }) => {
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
        acc[exercise].data.push({ x: date, y: volume });
        return acc;
      },
      {}
    );

    const labeledDataset = Object.values(labeledDatasetMap);
    return labeledDataset;
  }
}
