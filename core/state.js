/**
 * Persistent player data.
 *
 * This file stores progress that should remain after a browser refresh.
 * Passwords are deliberately not saved because this is a learning prototype,
 * not a real authentication system.
 */

const STORAGE_KEY = "cyberSafeMissionsPlayer";

const defaultPlayer = {
  stars: 0,
  badges: 0,
  user: "",
  missionsCompleted: 0,
  totalScore: 0,

  // Achievements (live unlock states)
  firstMission: false,
  threeStars: false,
  threeBadges: false,
};

/**
 * Reads saved player data safely.
 * If storage is empty or damaged, the app starts with default values.
 */
function readSavedPlayer() {
  try {
    const savedPlayer = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return {
      ...defaultPlayer,
      ...savedPlayer,
    };
  } catch {
    return { ...defaultPlayer };
  }
}

export const state = {
  ...readSavedPlayer(),

  // Temporary game-round data. These values reset when a new mission starts.
  authMode: "login",
  mission: "",
  questions: [],
  questionIndex: 0,
  score: 0,
  rewards: 0,
  locked: false,
};

/**
 * Saves only long-term player progress.
 * Temporary mission questions are intentionally excluded.
 */
export function savePlayer() {
  const playerToSave = {
    stars: state.stars,
    badges: state.badges,
    user: state.user,
    missionsCompleted: state.missionsCompleted,
    totalScore: state.totalScore,

    // Achievements
    firstMission: state.firstMission,
    threeStars: state.threeStars,
    threeBadges: state.threeBadges,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(playerToSave));
}

/**
 * Logs out the visible user but preserves learning progress.
 */
export function logOutPlayer() {
  state.user = "";
  savePlayer();
}