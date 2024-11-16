export class Dropdown {
  constructor({
    selectId,
    options,
    onChange,
  }: {
    selectId: string;
    options: Array<string>;
    onChange: (value: string) => void;
  }) {
    const select = document.getElementById(selectId);
    if (!select) {
      return;
    }

    select.onchange = (e) => onChange((e.target as HTMLSelectElement).value);

    const option = document.createElement("option");
    option.value = "";
    option.textContent = "";
    select.appendChild(option);

    [...new Set(options)].sort().forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
  }
}
