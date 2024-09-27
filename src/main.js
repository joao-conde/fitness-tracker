async function mount() {
  const weightsChart = new TrackerChart("weights-chart", "data/weights.csv");
  await weightsChart.load();
}

document.addEventListener("DOMContentLoaded", async () => await mount());
