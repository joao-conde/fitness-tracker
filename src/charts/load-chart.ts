class LoadChart extends LineChart {
  static SCALES = {
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
        text: "Total Load (all sets sum of weights * repetitions)",
      },
      beginAtZero: true,
    },
  };
}
