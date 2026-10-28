(function () {
  "use strict";

  var explorer = document.querySelector("[data-publication-explorer]");
  if (!explorer) return;

  var groups = Array.prototype.slice.call(explorer.querySelectorAll("[data-filter-group]"));
  var cards = Array.prototype.slice.call(explorer.querySelectorAll("[data-publication]"));
  var sections = Array.prototype.slice.call(explorer.querySelectorAll("[data-publication-section]"));
  var resultCount = explorer.querySelector("[data-result-count]");
  var emptyState = explorer.querySelector("[data-empty-state]");
  var clearButton = explorer.querySelector("[data-clear-filters]");

  function selectedValue(group) {
    var selected = group.querySelector('[aria-pressed="true"]');
    return selected ? selected.getAttribute("data-filter-value") : "all";
  }

  function cardMatches(card, filters) {
    var technologies = (card.getAttribute("data-technology") || "").split(" ");
    return filters.technology === "all" || technologies.indexOf(filters.technology) !== -1;
  }

  function updateResults() {
    var filters = {};
    groups.forEach(function (group) {
      filters[group.getAttribute("data-filter-group")] = selectedValue(group);
    });

    var visible = 0;
    cards.forEach(function (card) {
      var matches = cardMatches(card, filters);
      card.hidden = !matches;
      if (matches) visible += 1;
    });

    sections.forEach(function (section) {
      section.hidden = !section.querySelector("[data-publication]:not([hidden])");
    });

    resultCount.textContent = "Showing " + visible + " publication" + (visible === 1 ? "" : "s");
    emptyState.hidden = visible !== 0;
  }

  groups.forEach(function (group) {
    group.addEventListener("click", function (event) {
      var button = event.target.closest("[data-filter-value]");
      if (!button) return;

      group.querySelectorAll("[data-filter-value]").forEach(function (option) {
        option.setAttribute("aria-pressed", option === button ? "true" : "false");
      });
      updateResults();
    });
  });

  clearButton.addEventListener("click", function () {
    groups.forEach(function (group) {
      group.querySelectorAll("[data-filter-value]").forEach(function (option) {
        option.setAttribute("aria-pressed", option.getAttribute("data-filter-value") === "all" ? "true" : "false");
      });
    });
    updateResults();
  });

  updateResults();
}());
