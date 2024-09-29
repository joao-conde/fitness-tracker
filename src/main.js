async function mount() {
  const response = await fetch("data/weights.csv");
  const data = await response.text();
  const parser = new StrongCsvParser(data);
  new WeightsChart("weights-chart", parser.rows);
  new VolumesChart("volumes-chart", parser.rows);
}

document.addEventListener("DOMContentLoaded", async () => await mount());
