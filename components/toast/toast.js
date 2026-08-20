let hideToastTimer;

/**
 * Prepares the reusable toast notification.
 */
export function setupToast() {
  // The toast HTML is loaded before this function runs.
}

/**
 * Shows a short non-blocking message instead of window.alert().
 */
export function showToast(message) {
  const toast = document.getElementById("toast");

  if (!toast) {
    return;
  }

  clearTimeout(hideToastTimer);

  toast.textContent = message;
  toast.classList.add("show");

  hideToastTimer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}