import { getAll, loadFragment } from "./dom.js";

/**
 * Lists every SPA screen and its matching HTML file.
 * Add new screens here when expanding the project.
 */
const screens = {
  home: "screens/home/home.html",
  auth: "screens/auth/auth.html",
  missions: "screens/missions/missions.html",
  cards: "screens/card-deck/card-deck.html",
  progress: "screens/progress/progress.html",
  achievements: "screens/achievements/achievements.html",
  game: "screens/game/game.html",
  results: "screens/results/results.html",
};

let currentScreen = "";

/**
 * Loads a screen the first time it is visited, then simply shows/hides it.
 * This keeps your existing showScreen behaviour while allowing folder-based HTML.
 */
export async function showScreen(screenId) {
  const screenPath = screens[screenId];
  const viewport = document.getElementById("viewport");

  if (!screenPath || !viewport) {
    return;
  }

  let screenElement = document.getElementById(screenId);

  if (!screenElement) {
    const holder = document.createElement("div");
    await loadFragment(screenPath, holder);

    screenElement = holder.firstElementChild;

    if (!screenElement) {
      throw new Error(`Screen "${screenId}" did not contain a root element.`);
    }

    viewport.appendChild(screenElement);
  }

  getAll(".screen", viewport).forEach((screen) => {
    screen.classList.toggle("active", screen.id === screenId);
  });

  currentScreen = screenId;
  viewport.scrollTop = 0;

  document.dispatchEvent(
    new CustomEvent("screenchange", {
      detail: { screenId },
    }),
  );
}

export function getCurrentScreen() {
  return currentScreen;
}