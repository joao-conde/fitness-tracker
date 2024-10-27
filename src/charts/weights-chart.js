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
}
