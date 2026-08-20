import { state, savePlayer } from "../../core/state.js";
import { updateNavigation } from "../../components/navigation/navigation.js";

function renderProgress() {
  document.getElementById("total-stars").textContent = state.stars;
  document.getElementById("badges-count").textContent = state.badges;
  document.getElementById("missions-completed").textContent =
    state.missionsCompleted;
  document.getElementById("total-score").textContent = state.totalScore;

  const badgesContainer = document.getElementById("badges-list");

  if (badgesContainer) {
    badgesContainer.innerHTML = "";
  }
}

function resetProgress() {
  const confirmed = window.confirm(
    "Reset all stars, badges, missions, score, and achievements?",
  );

  if (!confirmed) return;

  state.stars = 0;
  state.badges = 0;
  state.missionsCompleted = 0;
  state.totalScore = 0;
  state.firstMission = false;
  state.threeStars = false;
  state.threeBadges = false;

  savePlayer();
  updateNavigation();
  renderProgress();
}

export function setupProgress() {
  document.addEventListener("screenchange", (event) => {
    if (event.detail.screenId === "progress") {
      renderProgress();
    }
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest("#resetProgressButton")) {
      resetProgress();
    }
  });
}