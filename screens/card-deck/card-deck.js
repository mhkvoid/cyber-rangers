const STORAGE_KEY = "cyberSafeMissionsReviewedCards";

function getReviewedCards() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveReviewedCards(reviewedCards) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviewedCards));
}

function renderCardDeck() {
  const reviewedCards = getReviewedCards();

  document.querySelectorAll(".deck-card").forEach((card) => {
    const isReviewed = reviewedCards.includes(card.dataset.cardId);

    card.classList.toggle("reviewed", isReviewed);
    card.classList.remove("flipped");
  });

  const reviewedCount = document.getElementById("reviewedCount");
  if (reviewedCount) {
    reviewedCount.textContent = reviewedCards.length;
  }
}

function resetReviewedCards() {
  const confirmed = window.confirm("Reset all reviewed card progress?");
  if (!confirmed) return;

  localStorage.removeItem(STORAGE_KEY);
  renderCardDeck();
}

export function setupCardDeck() {
  document.addEventListener("screenchange", (event) => {
    if (event.detail.screenId === "cards") {
      renderCardDeck();
    }
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest("#resetReviewedCardsButton")) {
      resetReviewedCards();
      return;
    }

    const card = event.target.closest(".deck-card");
    if (!card) return;

    card.classList.toggle("flipped");

    const reviewedCards = getReviewedCards();
    const cardId = card.dataset.cardId;

    if (!reviewedCards.includes(cardId)) {
      reviewedCards.push(cardId);
      saveReviewedCards(reviewedCards);
    }

    renderCardDeck();
    card.classList.add("flipped");
  });
}