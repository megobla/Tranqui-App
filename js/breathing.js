import { qs, fetchJSON, onChipGroupClick } from './utils.js';

let cycleTimeoutId = null;
let sessionEndTime = 0;

function resetOrb(firstPhase) {
  qs('[data-breathing-phase-label]').textContent = firstPhase.label;
  qs('[data-breathing-phase-duration]').textContent = `${firstPhase.seconds} segundos`;
}

function stopSession(phases, playButton) {
  clearTimeout(cycleTimeoutId);
  cycleTimeoutId = null;
  playButton.setAttribute('aria-pressed', 'false');
  playButton.setAttribute('aria-label', 'Comenzar sesión de respiración');
  resetOrb(phases[0]);
}

function runPhase(phases, index, playButton) {
  if (Date.now() >= sessionEndTime) {
    stopSession(phases, playButton);
    return;
  }
  const phase = phases[index % phases.length];
  qs('[data-breathing-phase-label]').textContent = phase.label;
  qs('[data-breathing-phase-duration]').textContent = `${phase.seconds} segundos`;
  cycleTimeoutId = setTimeout(() => runPhase(phases, index + 1, playButton), phase.seconds * 1000);
}

export async function initBreathingScreen(initialDurationMinutes) {
  const config = await fetchJSON('data/breathing.json');
  resetOrb(config.phases[0]);

  const durationGroup = qs('[data-breathing-duration-chips]');
  const playButton = qs('[data-breathing-play]');
  let durationMinutes = initialDurationMinutes || config.defaultDurationMinutes;

  if (durationGroup) {
    const target = durationGroup.querySelector(`[data-duration="${durationMinutes}"]`);
    if (target) {
      durationGroup.querySelectorAll('[role="radio"]').forEach((chip) => chip.setAttribute('aria-checked', String(chip === target)));
    }
    if (!durationGroup.dataset.wired) {
      durationGroup.dataset.wired = 'true';
      onChipGroupClick(durationGroup, (chip) => {
        durationMinutes = Number(chip.dataset.duration);
        if (cycleTimeoutId) stopSession(config.phases, playButton);
      });
    }
  }

  if (playButton) {
    playButton.onclick = () => {
      const active = playButton.getAttribute('aria-pressed') === 'true';
      if (active) {
        stopSession(config.phases, playButton);
        return;
      }
      playButton.setAttribute('aria-pressed', 'true');
      playButton.setAttribute('aria-label', 'Detener sesión de respiración');
      sessionEndTime = Date.now() + durationMinutes * 60 * 1000;
      runPhase(config.phases, 0, playButton);
    };
  }
}
