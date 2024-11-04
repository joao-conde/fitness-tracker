class Dropdown {
  constructor({ selectId, options, onChange } = {}) {
    const select = document.getElementById(selectId);
    select.onchange = (e) => onChange(e.target.value);

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
