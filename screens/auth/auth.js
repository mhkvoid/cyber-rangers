import { showScreen } from "../../core/router.js";
import { state, savePlayer } from "../../core/state.js";
import { updateNavigation } from "../../components/navigation/navigation.js";
import { showToast } from "../../components/toast/toast.js";

/**
 * Updates login/register text after the auth screen has been loaded.
 */
function renderAuthMode() {
  const isRegistering = state.authMode === "register";

  document.getElementById("authTitle").textContent = isRegistering
    ? "Create your operator profile."
    : "Welcome back, Operative.";

  document.getElementById("authMessage").textContent = isRegistering
    ? "No email required. Choose a name and start learning."
    : "Continue your cybersecurity journey.";

  document.getElementById("authSubmit").textContent = isRegistering
    ? "Create account"
    : "Log in";

  document.getElementById("confirmLabel").hidden = !isRegistering;

  document.getElementById("switchText").textContent = isRegistering
    ? "Already have an account?"
    : "New operative?";

  document.getElementById("switchAuthButton").textContent = isRegistering
    ? "Log in"
    : "Create account";
}

/**
 * Controls guest login, profile creation, and prototype login.
 */
export function setupAuth() {
  document.addEventListener("screenchange", (event) => {
    if (event.detail.screenId === "auth") {
      renderAuthMode();
    }
  });

  document.addEventListener("submit", (event) => {
    if (event.target.id !== "authForm") {
      return;
    }

    event.preventDefault();

    const username = document.getElementById("usernameInput").value.trim();
    const password = document.getElementById("passwordInput").value;
    const confirmation = document.getElementById("confirmInput").value;
    const message = document.getElementById("authMessage");

    if (!username || !password) {
      message.textContent = "Please enter a username and password.";
      return;
    }

    if (state.authMode === "register" && password !== confirmation) {
      message.textContent = "Passwords do not match.";
      return;
    }

    state.user = username;
    savePlayer();
    updateNavigation();
    showToast(`Welcome, ${username}!`);
    showScreen("home");
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest("#guestAuthButton")) {
      state.user = "Guest";
      savePlayer();
      updateNavigation();
      showToast("You are playing as a guest.");
      showScreen("missions");
    }

    if (event.target.closest("#switchAuthButton")) {
      state.authMode = state.authMode === "login" ? "register" : "login";
      renderAuthMode();
    }
  });
}