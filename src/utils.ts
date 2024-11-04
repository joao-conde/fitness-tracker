export async function loadCsv(name: string): Promise<string> {
  const response = await fetch(name);
  const data = await response.text();
  return data;
}
