import { qs, qsa, fetchJSON, onChipGroupClick } from './utils.js';

export async function initExercisesScreen() {
  const { items, featured } = await fetchJSON('data/exercises.json');
  const list = qs('[data-exercise-list]');
  if (!list) return;

  list.innerHTML = '';
  items
    .filter((item) => item.id !== featured)
    .forEach((item) => {
      const row = document.createElement('a');
      row.className = 'exercise-row';
      row.href = `#/exercise/${item.id}`;
      row.innerHTML = `
        <span class="icon-badge"><img src="assets/icons/icon-self-improvement.svg" alt="" /></span>
        <span class="exercise-row__label">${item.title}</span>
      `;
      list.appendChild(row);
    });
}

export async function initExerciseDetail(exerciseId) {
  const { items, steps } = await fetchJSON('data/exercises.json');
  const exercise = items.find((item) => item.id === exerciseId) || items[0];

  qs('[data-exercise-title]').textContent = exercise.title;
  qs('[data-exercise-subtitle]').textContent = exercise.subtitle;
  const image = qs('[data-exercise-image]');
  image.src = exercise.image;
  image.alt = exercise.title;

  const stepsList = qs('[data-exercise-steps]');
  stepsList.innerHTML = '';
  steps.forEach((step) => {
    const li = document.createElement('li');
    li.className = 'exercise-step';
    li.innerHTML = `
      <span class="step-number${step.number === 1 ? ' step-number--active' : ''}">${step.number}</span>
      <span>${step.text}</span>
    `;
    stepsList.appendChild(li);
  });

  const durationGroup = qs('[data-exercise-duration-chips]');
  const startButton = qs('[data-exercise-start]');
  let durationMinutes = 3;

  if (durationGroup && !durationGroup.dataset.wired) {
    durationGroup.dataset.wired = 'true';
    onChipGroupClick(durationGroup, (chip) => {
      durationMinutes = Number(chip.dataset.duration);
    });
  }
  qsa('[role="radio"]', durationGroup).forEach((chip) => {
    if (chip.getAttribute('aria-checked') === 'true') {
      durationMinutes = Number(chip.dataset.duration);
    }
  });

  if (startButton) {
    startButton.href = `#/breathing?duration=${durationMinutes}`;
    if (!startButton.dataset.wired) {
      startButton.dataset.wired = 'true';
      durationGroup?.addEventListener('click', () => {
        startButton.href = `#/breathing?duration=${durationMinutes}`;
      });
    }
  }
}
