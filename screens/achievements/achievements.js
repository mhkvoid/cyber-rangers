/**
 * Achievements screen setup.
 *
 * Renders live unlock states for: first mission, 3 stars, 3 badges.
 */
import { state } from "../../core/state.js";

export function setupAchievements() {
  document.addEventListener("screenchange", (event) => {
    if (event.detail.screenId !== "achievements") return;

    setAchievementState("first-mission", state.firstMission);
    setAchievementState("three-stars", state.threeStars);
    setAchievementState("three-badges", state.threeBadges);
  });
}

function setAchievementState(id, unlocked) {
  const el = document.getElementById(id);
  if (!el) return;

  el.classList.toggle("unlocked", unlocked);
  el.classList.toggle("locked", !unlocked);

  const statusEl = el.querySelector(".status");
  if (statusEl) {
    statusEl.textContent = unlocked ? "Unlocked" : "Locked";
  }
}