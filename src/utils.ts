export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export async function loadCsv(name: string): Promise<string> {
  const response = await fetch(name);
  const data = await response.text();
  return data;
}
