async function mount() {
  const response = await fetch("data/weights.csv");
  const data = await response.text();
  const parser = new StrongCsvParser(data);

  const weightChart = new WeightsChart("weights-chart", parser.rows);
  const volumesChart = new VolumesChart("volumes-chart", parser.rows);

  document.getElementById("exercises-filter").onchange = (e) => {
    weightChart.filter(e.target.value);
    volumesChart.filter(e.target.value);
  };
}

document.addEventListener("DOMContentLoaded", async () => await mount());
