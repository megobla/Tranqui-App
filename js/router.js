import { qs, qsa } from './utils.js';
import { initBreathingScreen } from './breathing.js';
import { initWeeklyTip } from './audio.js';
import { initExercisesScreen, initExerciseDetail } from './exercises.js';
import { initTipsScreen } from './mood.js';
import { initNameScreen, renderGreeting } from './onboarding.js';

function parseHash() {
  const raw = window.location.hash.replace(/^#\/?/, '');
  if (!raw) return { route: 'welcome', param: null, query: new URLSearchParams() };

  const [pathPart, queryPart] = raw.split('?');
  const segments = pathPart.split('/').filter(Boolean);
  const query = new URLSearchParams(queryPart || '');

  if (segments[0] === 'exercise' && segments[1]) {
    return { route: 'exercise', param: segments[1], query };
  }
  return { route: segments[0] || 'welcome', param: null, query };
}

function goTo(route) {
  window.location.hash = `/${route}`;
}

async function renderRoute() {
  const { route, param, query } = parseHash();
  const knownRoutes = ['welcome', 'name', 'inicio', 'breathing', 'exercises', 'exercise', 'tips'];
  const activeRoute = knownRoutes.includes(route) ? route : 'welcome';

  qsa('.app-view').forEach((view) => {
    const isActive = view.dataset.route === activeRoute;
    view.classList.toggle('is-active', isActive);
    view.classList.remove('is-visible');
    view.setAttribute('aria-hidden', String(!isActive));
  });

  const enteringView = qs(`.app-view[data-route="${activeRoute}"]`);
  if (enteringView) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => enteringView.classList.add('is-visible'));
    });
  }

  switch (activeRoute) {
    case 'name':
      initNameScreen();
      break;
    case 'inicio':
      renderGreeting();
      initWeeklyTip();
      break;
    case 'breathing': {
      const duration = Number(query.get('duration')) || null;
      await initBreathingScreen(duration);
      break;
    }
    case 'exercises':
      await initExercisesScreen();
      break;
    case 'exercise':
      await initExerciseDetail(param);
      break;
    case 'tips':
      await initTipsScreen();
      break;
    default:
      break;
  }

  const heading = enteringView && qs('h1', enteringView);
  if (heading) {
    heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: true });
  }
}

export function initRouter() {
  window.addEventListener('hashchange', renderRoute);

  const welcomeButton = qs('[data-welcome-continue]');
  if (welcomeButton) {
    welcomeButton.addEventListener('click', () => goTo('name'));
  }

  renderRoute();
}
