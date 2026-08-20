import { showScreen } from "../../core/router.js";
import { state, savePlayer } from "../../core/state.js";
import { missions } from "../../core/missions-data.js";
import { updateNavigation } from "../../components/navigation/navigation.js";

function loadQuestion() {
  const mission = missions[state.mission];
  const question = state.questions[state.questionIndex];

  if (!mission || !question) return;

  const totalQuestions = state.questions.length;

  document.getElementById("gameTitle").textContent = mission.title;
  document.getElementById("missionIntro").textContent = mission.intro;
  document.getElementById("questionText").textContent = question[0];

  const feedback = document.getElementById("feedback");
  feedback.textContent = "";
  feedback.className = "feedback";

  const progressBar = document.getElementById("missionProgress");
  progressBar.max = totalQuestions;
  progressBar.value = state.questionIndex;

  document.getElementById("progressText").textContent =
    `${state.questionIndex}/${totalQuestions}`;

  document.getElementById("nextButton").disabled = true;

  question[1].forEach((text, index) => {
    const image = document.getElementById(`optionImage${index}`);
    const optionText = document.getElementById(`optionText${index}`);
    const optionHint = document.getElementById(`optionHint${index}`);

    optionText.textContent = text;
    optionHint.textContent = question[3][index];

    if (image) {
      image.src = question[2][index];
      image.alt = text;
    }
  });

  state.locked = false;
}

function chooseAnswer(answerIndex) {
  if (state.locked) return;

  const question = state.questions[state.questionIndex];
  if (!question) return;

  state.locked = true;

  const feedback = document.getElementById("feedback");
  const nextButton = document.getElementById("nextButton");
  const isCorrect = answerIndex === question[4];

  if (isCorrect) {
    state.score += 10;
    state.rewards += 1;

    feedback.textContent = question[5];
    feedback.className = "feedback correct";
  } else {
    feedback.textContent = "Not quite. Try the safest choice.";
    feedback.className = "feedback incorrect";
  }

  nextButton.disabled = false;
}

async function nextQuestion() {
  state.questionIndex += 1;

  if (state.questionIndex >= state.questions.length) {
    // Apply permanent rewards exactly once, at mission completion.
    state.stars += state.rewards;
    state.totalScore += state.score;
    state.missionsCompleted += 1;

    // One badge for every three total stars reached.
    const earnedBadges = Math.floor(state.stars / 3);
    state.badges = Math.max(state.badges, earnedBadges);

    // Achievement unlocks.
    state.firstMission = state.missionsCompleted >= 1;
    state.threeStars = state.stars >= 3;
    state.threeBadges = state.badges >= 3;

    savePlayer();
    updateNavigation();

    await showScreen("results");

    const finalMessage = document.getElementById("finalMessage");
    const earnedStars = document.getElementById("earnedStars");

    if (finalMessage) {
      finalMessage.textContent =
        `${missions[state.mission].title} complete! Score: ${state.score}.`;
    }

    if (earnedStars) {
      earnedStars.textContent = state.rewards;
    }

    return;
  }

  loadQuestion();
}

export function setupGame() {
  document.addEventListener("screenchange", (event) => {
    if (event.detail.screenId === "game") {
      loadQuestion();
    }
  });

  document.addEventListener("click", (event) => {
    const answerCard = event.target.closest("[data-answer]");

    if (answerCard) {
      chooseAnswer(Number(answerCard.dataset.answer));
      return;
    }

    if (event.target.closest("#nextButton")) {
      nextQuestion();
    }
  });
}