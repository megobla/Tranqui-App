import { qs } from './utils.js';

const WEEKLY_TIP_SRC = 'audio/music/consejo-semana.mp3';

/** Thin wrapper around a single HTMLAudioElement: play/pause, loop, volume fade. */
class AudioManager {
  constructor() {
    this.element = new Audio();
  }

  isPlaying(src) {
    return !this.element.paused && this.element.src.endsWith(src);
  }

  async play(src) {
    if (!this.element.src.endsWith(src)) {
      this.element.src = src;
    }
    try {
      await this.element.play();
    } catch {
      // Autoplay can be blocked, or the audio file may not exist yet — fail silently in the UI.
    }
  }

  pause() {
    this.element.pause();
  }
}

export const audioManager = new AudioManager();

function setPlayButtonState(button, playing) {
  button.setAttribute('aria-pressed', String(playing));
  button.setAttribute('aria-label', playing ? 'Pausar el consejo de la semana' : 'Reproducir el consejo de la semana');
  const icon = qs('[data-icon-play]', button);
  if (icon) {
    icon.src = playing ? 'assets/icons/icon-pause.svg' : 'assets/icons/icon-play.svg';
  }
}

export function initWeeklyTip() {
  const button = qs('[data-weekly-tip-play]');
  if (!button || button.dataset.wired) return;
  button.dataset.wired = 'true';
  button.addEventListener('click', async () => {
    const playing = button.getAttribute('aria-pressed') === 'true';
    if (playing) {
      audioManager.pause();
      setPlayButtonState(button, false);
    } else {
      await audioManager.play(WEEKLY_TIP_SRC);
      setPlayButtonState(button, true);
    }
  });
}
