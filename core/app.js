import { getById, loadFragment } from "./dom.js";
import { showScreen } from "./router.js";
import { updateNavigation, setupNavigation } from "../components/navigation/navigation.js";
import { setupMascot } from "../components/mascot/mascot.js";
import { setupToast } from "../components/toast/toast.js";

/**
 * Imports are deliberately grouped by screen.
 * Each screen controls only its own buttons and behaviour.
 */
import { setupHome } from "../screens/home/home.js";
import { setupAuth } from "../screens/auth/auth.js";
import { setupMissions } from "../screens/missions/missions.js";
import { setupGame } from "../screens/game/game.js";
import { setupResults } from "../screens/results/results.js";
import { setupProgress } from "../screens/progress/progress.js";
import { setupAchievements } from "../screens/achievements/achievements.js";
import { setupCardDeck } from "../screens/card-deck/card-deck.js";

async function startApp() {
  try {
    // Shared parts are loaded once and remain visible for the entire session.
    await loadFragment(
      "components/navigation/navigation.html",
      getById("navigationMount"),
    );
    await loadFragment(
      "components/mascot/mascot.html",
      getById("mascotMount"),
    );
    await loadFragment(
      "components/toast/toast.html",
      getById("toastMount"),
    );

    setupToast();
    setupNavigation();
    setupMascot();

    // Screen setup functions use event delegation, so they work after screens load.
    setupHome();
    setupAuth();
    setupMissions();
    setupGame();
    setupResults();
    setupProgress();
    setupAchievements();
    setupCardDeck();

    // Refresh shared information whenever the user changes screens.
    document.addEventListener("screenchange", updateNavigation);

    updateNavigation();
    await showScreen("home");
  } catch (error) {
    console.error(error);

    getById("viewport").innerHTML = `
      <section class="screen active">
        <div class="content panel">
          <h1 class="title">The app could not start.</h1>
          <p class="description">
            Please run this project with Live Server and check that every file
            is in the correct folder.
          </p>
        </div>
      </section>
    `;
  }
}

startApp();