const FUZZY_ALLOW_LIST = [
  "bicep curl",
  "incline bench",
  "lateral",
  "shoulder press",
  "fly",
];

const FUZZY_DENY_LIST = ["machine", "band", "cable"];

class WeightsChart extends Chart {
  constructor(canvasId, data) {
    const ctx = document.getElementById(canvasId).getContext("2d");
    super(ctx, {
      type: "line",
      data: {
        datasets: WeightsChart.buildDatasets(data),
      },
      options: WeightsChart.options(),
    });
  }

  static buildDatasets(data) {
    const matches = data.filter((row) => {
      const fuzzy_allow_match = FUZZY_ALLOW_LIST.some((label) =>
        row["Exercise Name"].toLowerCase().includes(label.toLowerCase())
      );
      const fuzzy_deny_match = FUZZY_DENY_LIST.some((label) =>
        row["Exercise Name"].toLowerCase().includes(label.toLowerCase())
      );
      return fuzzy_allow_match && !fuzzy_deny_match;
    });

    const dateExerciseWeightMaxMap = matches.reduce((acc, row) => {
      const date = row["Date"];
      if (!acc[date]) acc[date] = {};

      const exercise = row["Exercise Name"];
      if (!acc[date][exercise]) acc[date][exercise] = -Infinity;

      const weight = row["Weight"];
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

  static options() {
    return {
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
  }
}
