const WEIGHTS_DATA = "data/weights.csv";
const BODYWEIGHT_DATA = "data/bodyweight.csv";
const DATE_FORMAT_IN = "YYYY-MM-DD";
const DATE_FORMAT_OUT = "DD/MM/YYYY";

async function mount() {
  const weightsCtx = document.getElementById("weights-chart").getContext("2d");
  const bodyweightCtx = document
    .getElementById("bodyweight-chart")
    .getContext("2d");

  const weightsCsv = await loadCsv(WEIGHTS_DATA);
  const bodyweightCsv = await loadCsv(BODYWEIGHT_DATA);

  createChart(weightsCtx, weightsCsv);
  createChart(bodyweightCtx, bodyweightCsv);
}

function createChart(ctx, csv) {
  const records = parseCsv(csv);
  const datasets = groupData(records);

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          tooltipFormat: DATE_FORMAT_OUT,
          displayFormats: {
            day: DATE_FORMAT_OUT,
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
  };

  const chart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: datasets,
    },
    options: options,
  });

  return chart;
}

async function loadCsv(name) {
  const response = await fetch(name);
  const data = await response.text();
  return data;
}

function parseCsv(data) {
  const rows = data.trim().split("\n");
  const records = rows.slice(1).map((row) => {
    const columns = row.split(",");
    return {
      label: columns[0],
      y: parseFloat(columns[1]),
      x: moment(columns[2], DATE_FORMAT_IN).format(DATE_FORMAT_OUT),
    };
  });
  return records;
}

function groupData(data) {
  const groups = {};

  data.forEach(({ label, y, x }) => {
    if (!groups[label]) {
      const red = Math.random() * 255;
      const green = Math.random() * 255;
      const blue = Math.random() * 255;
      groups[label] = {
        label,
        color: `rgb(${red}, ${green}, ${blue})`,
        data: [],
      };
    }
    groups[label].data.push({ x, y });
  });

  return Object.values(groups);
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

document.addEventListener("DOMContentLoaded", async () => await mount());
