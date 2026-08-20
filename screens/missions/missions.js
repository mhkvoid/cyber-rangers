import { showScreen } from "../../core/router.js";
import { state } from "../../core/state.js";
import { missions } from "../../core/missions-data.js";

/**
 * Uses Fisher-Yates shuffling instead of random sort.
 * This gives a more reliable random question order.
 */
function shuffleQuestions(questions) {
  const shuffled = [...questions];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}

/**
 * Starts a fresh mission round using the selected mission data.
 */
function startMission(missionName) {
  const selectedMission = missions[missionName];

  if (!selectedMission) {
    return;
  }

  state.mission = missionName;
  state.questions = shuffleQuestions(selectedMission.questions);
  state.questionIndex = 0;
  state.score = 0;
  state.rewards = 0;
  state.locked = false;

  showScreen("game");
}

/**
 * Controls mission-card clicks.
 */
export function setupMissions() {
  document.addEventListener("click", (event) => {
    const missionCard = event.target.closest("[data-mission]");

    if (missionCard) {
      startMission(missionCard.dataset.mission);
    }
  });
}