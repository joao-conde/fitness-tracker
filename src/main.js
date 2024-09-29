async function mount() {
  const response = await fetch("data/weights.csv");
  const data = await response.text();
  const parser = new CsvParser(data);
  new WeightsChart("weights-chart", parser.rows);
}

document.addEventListener("DOMContentLoaded", async () => await mount());
