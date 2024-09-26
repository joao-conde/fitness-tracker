const WEIGHTS_DATA = "data/weights.csv";

async function mount() {
  const weightsCtx = document.getElementById("weights-chart").getContext("2d");
  const weightsCsv = await loadCsv(WEIGHTS_DATA);
  createChart(weightsCtx, weightsCsv);
}

function createChart(ctx, csv) {
  const strong = new Strong(csv);

  const options = {
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
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  console.log(strong.groupMax);

  const chart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: strong.chartData(),
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

document.addEventListener("DOMContentLoaded", async () => await mount());
