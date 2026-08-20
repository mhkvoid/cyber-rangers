/**
 * Controls the CyberGuide mascot bubble.
 */
export function setupMascot() {
  const mascot = document.getElementById("mascotButton");

  if (!mascot) {
    return;
  }

  mascot.addEventListener("click", () => {
    const isExpanded = mascot.getAttribute("aria-expanded") === "true";

    mascot.setAttribute("aria-expanded", String(!isExpanded));
  });
}