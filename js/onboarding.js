import { qs } from './utils.js';

const NAME_STORAGE_KEY = 'tranqui:name';

export function getStoredName() {
  return localStorage.getItem(NAME_STORAGE_KEY);
}

export function renderGreeting() {
  const heading = qs('[data-home-greeting]');
  const name = getStoredName();
  heading.textContent = name ? `Bienvenida, ${name}` : 'Bienvenida';
}

function saveName(value) {
  const trimmed = value.trim();
  if (trimmed) {
    localStorage.setItem(NAME_STORAGE_KEY, trimmed);
  }
}

export function initNameScreen() {
  const form = qs('[data-name-form]');
  const input = qs('[data-name-input]');
  const skipButton = qs('[data-name-skip]');

  const existingName = getStoredName();
  if (existingName) {
    input.value = existingName;
  }

  if (!form.dataset.wired) {
    form.dataset.wired = 'true';
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      saveName(input.value);
      window.location.hash = '/inicio';
    });
    skipButton.addEventListener('click', () => {
      window.location.hash = '/inicio';
    });
  }
}
