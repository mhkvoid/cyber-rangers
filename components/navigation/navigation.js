import { getById } from "../../core/dom.js";
import { showScreen } from "../../core/router.js";
import { state, logOutPlayer } from "../../core/state.js";

/**
 * Refreshes shared player details in the navigation and other loaded screens.
 * Each check is safe because some screens are loaded only when visited.
 */
export function updateNavigation() {
  const stars = getById("stars");
  const badges = getById("badges");
  const progressStars = getById("progressStars");
  const userLabel = getById("userLabel");
  const loginButton = getById("loginButton");
  const joinButton = getById("joinButton");

  if (stars) {
    stars.textContent = state.stars;
  }

  if (badges) {
    badges.textContent = state.badges;
  }

  if (progressStars) {
    progressStars.textContent = state.stars;
  }

  if (userLabel) {
    userLabel.textContent = state.user ? `Hi, ${state.user}` : "";
    userLabel.hidden = !state.user;
  }

  if (loginButton) {
    loginButton.textContent = state.user ? "Log out" : "Log in";
  }

  if (joinButton) {
    joinButton.hidden = Boolean(state.user);
  }
}

/**
 * Adds global navigation listeners once.
 *
 * Event delegation is important here: screens are inserted later with fetch(),
 * so buttons such as "Back to missions" must be handled from document.
 */
export function setupNavigation() {
  document.addEventListener("click", async (event) => {
    const screenTrigger = event.target.closest("[data-screen]");

    if (screenTrigger) {
      event.preventDefault();

      const screenId = screenTrigger.dataset.screen;

      if (screenId) {
        await showScreen(screenId);
        updateNavigation();
      }

      return;
    }

    const loginButton = event.target.closest("#loginButton");

    if (loginButton) {
      if (state.user) {
        logOutPlayer();
        updateNavigation();
        return;
      }

      state.authMode = "login";
      await showScreen("auth");
      return;
    }

    const joinButton = event.target.closest("#joinButton");

    if (joinButton) {
      state.authMode = "register";
      await showScreen("auth");
      return;
    }

    const menuButton = event.target.closest("#menuButton");

    if (menuButton) {
      const nav = document.querySelector(".nav");

      if (!nav) {
        return;
      }

      const isOpen = !nav.classList.contains("menu-open");

      nav.classList.toggle("menu-open", isOpen);
      menuButton.setAttribute("aria-expanded", String(isOpen));
    }
  });

  /**
   * When a screen changes, update player data and close the mobile menu.
   */
  document.addEventListener("screenchange", () => {
    const nav = document.querySelector(".nav");
    const menuButton = getById("menuButton");

    nav?.classList.remove("menu-open");
    menuButton?.setAttribute("aria-expanded", "false");

    updateNavigation();
  });

  updateNavigation();
}