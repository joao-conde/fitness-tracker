class VolumesChart extends LineChart {
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
        text: "Repetitions",
      },
      beginAtZero: true,
    },
  };
}