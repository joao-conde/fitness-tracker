class ExercisesFilter {
  constructor({ selectId, options, onFilter } = {}) {
    const select = document.getElementById(selectId);
    select.onchange = (e) => onFilter(e.target.value);

    [...new Set(options)].sort().forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
  }
}
