import { showScreen } from "../../core/router.js";
import { state } from "../../core/state.js";

function renderResults() {
  const earnedScore = document.getElementById("earnedScore");
  const badgeProgress = document.getElementById("badgeProgress");
  const newAchievements = document.getElementById("newAchievements");

  if (earnedScore) {
    earnedScore.textContent = state.score;
  }

  if (badgeProgress) {
    const starsUntilBadge = 3 - (state.stars % 3);
    const displayProgress = state.stars % 3;

    badgeProgress.textContent =
      displayProgress === 0
        ? "Badge earned! Start collecting stars for the next one."
        : `${displayProgress} / 3 stars until your next badge`;
  }

  if (newAchievements) {
    const unlocked = [];

    if (state.firstMission) unlocked.push("First defence");
    if (state.threeStars) unlocked.push("3 Stars");
    if (state.threeBadges) unlocked.push("3 Badges");

    newAchievements.textContent = unlocked.length
      ? `Unlocked: ${unlocked.join(", ")}`
      : "";
  }
}

/**
 * Controls and renders the mission-complete screen.
 */
export function setupResults() {
  document.addEventListener("screenchange", (event) => {
    if (event.detail.screenId === "results") {
      renderResults();
    }
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest("#playAgainButton")) {
      showScreen("missions");
    }
  });
}