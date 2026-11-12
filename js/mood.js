import { qs, qsa, fetchJSON, onChipGroupClick, selectChip } from './utils.js';

function selectMoodEverywhere(moodId) {
  qsa('[data-tips-mood-chips]').forEach((group) => {
    const chip = group.querySelector(`[data-mood="${moodId}"]`);
    if (chip) selectChip(group, chip);
  });
}

function renderTip(tip) {
  qs('[data-tip-image]').src = tip.image;
  qs('[data-tip-image]').alt = tip.title;
  qs('[data-tip-title]').textContent = tip.title;
  qs('[data-tip-text]').textContent = tip.text;
  qs('[data-tips-empty]').hidden = true;
  qs('[data-tips-result]').hidden = false;
  qsa('[data-tips-cta]').forEach((cta) => { cta.hidden = false; });
}

function showEmptyState() {
  qs('[data-tips-empty]').hidden = false;
  qs('[data-tips-result]').hidden = true;
  qsa('[data-tips-cta]').forEach((cta) => { cta.hidden = true; });
}

export async function initTipsScreen() {
  const { moods } = await fetchJSON('data/tips.json');
  const groups = qsa('[data-tips-mood-chips]');

  groups.forEach((group) => {
    group.querySelectorAll('[role="radio"]').forEach((chip) => chip.setAttribute('aria-checked', 'false'));
  });
  showEmptyState();

  groups.forEach((group) => {
    if (group.dataset.wired) return;
    group.dataset.wired = 'true';
    onChipGroupClick(group, (chip) => {
      const mood = moods.find((item) => item.id === chip.dataset.mood);
      if (!mood) return;
      selectMoodEverywhere(mood.id);
      renderTip(mood);
    });
  });
}
