document.addEventListener("DOMContentLoaded", () => mount());

function parseCsv(csv) {
  const rows = csv.trim().split("\n");
  const headers = rows[0].split(",");
  const entries = rows.slice(1).map((row) => {
    const values = row.split(",");
    return {
      exercise: values[0],
      weight: parseFloat(values[1]),
      date: moment(values[2], "YYYY-MM-DD").format("DD/MM/YYYY"),
    };
  });
  return entries;
}

function createDataset(data) {
  const groupedData = data.reduce((acc, entry) => {
    if (!acc[entry.exercise]) {
      acc[entry.exercise] = [];
    }
    acc[entry.exercise].push(entry);
    return acc;
  }, {});

  // Create chart datasets
  const datasets = Object.keys(groupedData).map((exercise) => {
    const data = groupedData[exercise];
    return {
      label: exercise,
      data: data.map((entry) => ({ x: entry.date, y: entry.weight })),
      borderColor: "red",
      borderWidth: 2,
      fill: false,
    };
  });

  return datasets;
}

function createChart(ctx, csv) {
  const data = parseCsv(csv);
  const datasets = createDataset(data);
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: datasets,
    },
    options: {
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
      },
    },
  });
  return chart;
}

function mount() {
  const weightsCtx = document.getElementById("weights-chart").getContext("2d");
  const bodyweightCtx = document
    .getElementById("bodyweight-chart")
    .getContext("2d");

  const exercisesData = `
    metric,weight,date
    Bench Press,100,2023-09-01
    Bench Press,102,2023-09-03
    Bench Press,105,2023-09-05
    Bench Press,108,2023-09-07
    Bench Press,110,2023-09-09
    Squat,120,2023-09-01
    Squat,123,2023-09-03
    Squat,125,2023-09-05
    Squat,128,2023-09-07
    Squat,130,2023-09-09
    Deadlift,150,2023-09-01
    Deadlift,152,2023-09-03
    Deadlift,155,2023-09-05
    Deadlift,158,2023-09-07
    Deadlift,160,2023-09-09
    `;

  const bodyweightData = `
    metric,weight,date
    Bodyweight,100,2023-09-01,
    Bodyweight,85,2023-09-10,
    Bodyweight,80,2023-09-20,
    Bodyweight,80,2023-09-30,
    Bodyweight,75,2023-10-10
    `;

  createChart(weightsCtx, exercisesData);
  createChart(bodyweightCtx, bodyweightData);
}
