/**
 * Small DOM helpers used throughout the project.
 * Keeping them here prevents repeated document queries in every screen file.
 */

export const getById = (id) => document.getElementById(id);

export const getAll = (selector, parent = document) => [
  ...parent.querySelectorAll(selector),
];

/**
 * Loads an HTML fragment into a chosen element.
 * This requires Live Server because browsers block fetch() from file:// URLs.
 */
export async function loadFragment(url, mountElement) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Could not load: ${url}`);
  }

  mountElement.innerHTML = await response.text();
}

/**
 * Updates text only when the target exists.
 * This makes screens safe to load independently.
 */
export function setText(id, value) {
  const element = getById(id);

  if (element) {
    element.textContent = value;
  }
}