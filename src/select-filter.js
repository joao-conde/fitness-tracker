/**
 * A filter class that populates the HTML <select> element with
 * the options given and an all option.
 */
class SelectFilter {
  constructor({ selectId, options, onFilter } = {}) {
    const select = document.getElementById(selectId);
    select.onchange = (e) => onFilter(e.target.value);

    const option = document.createElement("option");
    option.value = "";
    option.textContent = "all";
    select.appendChild(option);

    [...new Set(options)].sort().forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
  }
}
