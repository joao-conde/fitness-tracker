const WEIGHTS_DATA = "data/weights.csv";
const BODYWEIGHT_DATA = "data/bodyweight.csv";

const CHART_TYPE = "line";
const DATE_FORMAT = "DD/MM/YYYY";

document.addEventListener("DOMContentLoaded", async () => await mount());

async function mount() {
  const weightsCtx = document.getElementById("weights-chart").getContext("2d");
  const bodyweightCtx = document
    .getElementById("bodyweight-chart")
    .getContext("2d");

  const exercisesData = await loadCsv(WEIGHTS_DATA);
  const bodyweightData = await loadCsv(BODYWEIGHT_DATA);

  createChart(weightsCtx, exercisesData);
  createChart(bodyweightCtx, bodyweightData);
}

async function loadCsv(name) {
  const response = await fetch(name);
  const data = await response.text();
  return data;
}

function createChart(ctx, csv) {
  const records = parseCsv(csv);
  const datasets = createDataset(records);
  const chart = new Chart(ctx, {
    type: CHART_TYPE,
    data: {
      datasets: datasets,
    },
    options: {
      scales: {
        x: {
          type: "time",
          time: {
            unit: "day",
            tooltipFormat: DATE_FORMAT,
            displayFormats: {
              day: DATE_FORMAT,
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

function parseCsv(data) {
  const rows = data.trim().split("\n");
  const records = rows.slice(1).map((row) => {
    const columns = row.split(",");
    return {
      label: columns[0],
      y: parseFloat(columns[1]),
      x: moment(columns[2], "YYYY-MM-DD").format(DATE_FORMAT),
    };
  });
  return records;
}

function createDataset(data) {
  const groupedData = data.reduce((acc, entry) => {
    if (!acc[entry.label]) {
      acc[entry.label] = [];
    }
    acc[entry.label].push(entry);
    return acc;
  }, {});

  const datasets = Object.keys(groupedData).map((label) => {
    const data = groupedData[label];

    const red = Math.random() * 255;
    const green = Math.random() * 255;
    const blue = Math.random() * 255;

    return {
      label: label,
      data: data.map((entry) => ({ x: entry.x, y: entry.y })),
      color: `rgb(${red}, ${green}, ${blue})`,
    };
  });

  return datasets;
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}
