import { showScreen } from "../../core/router.js";
import { state, savePlayer } from "../../core/state.js";
import { updateNavigation } from "../../components/navigation/navigation.js";

/**
 * Controls actions shown only on the home screen.
 */
export function setupHome() {
  document.addEventListener("click", (event) => {
    if (event.target.closest("#startButton")) {
      showScreen("missions");
    }

    if (event.target.closest("#guestButton")) {
      state.user = "Guest";
      savePlayer();
      updateNavigation();
      showScreen("missions");
    }
  });
}