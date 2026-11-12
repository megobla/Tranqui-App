export function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

export function qsa(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

export async function fetchJSON(path) {
  const response = await fetch(path);
  return response.json();
}

/** Sets aria-checked on the clicked chip and clears it on its siblings within the same radiogroup. */
export function selectChip(group, selectedChip) {
  qsa('[role="radio"]', group).forEach((chip) => {
    chip.setAttribute('aria-checked', String(chip === selectedChip));
  });
}

export function onChipGroupClick(group, handler) {
  group.addEventListener('click', (event) => {
    const chip = event.target.closest('[role="radio"]');
    if (!chip || !group.contains(chip)) return;
    selectChip(group, chip);
    handler(chip);
  });
}
