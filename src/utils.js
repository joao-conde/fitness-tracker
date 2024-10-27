async function loadCsv(name) {
  const response = await fetch(name);
  const data = await response.text();
  return data;
}
