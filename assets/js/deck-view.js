import { hexToString } from "./colors.js";

const deckViewSectionEl = document.querySelector("#deck-view");
const deckTitleEl = deckViewSectionEl.querySelector(".gallery__title");
const cardListEl = deckViewSectionEl.querySelector(".gallery__list");
const practiceButtonEl = deckViewSectionEl.querySelector(
  ".gallery__practice-btn",
);
const flashcardTemplateEl = document.querySelector("#flashcard-template");

function createFlashcardEl(deck, card) {
  const flashcardEl = flashcardTemplateEl.content
    .querySelector(".card")
    .cloneNode(true);
  const cardTitleEl = flashcardEl.querySelector(".card__title");
  const flipButtonEl = flashcardEl.querySelector(".card__flip");
  const deleteButtonEl = flashcardEl.querySelector(".card__delete-btn");
  const colorName = hexToString(deck.color);

  let showingQuestion = true;
  cardTitleEl.textContent = card.question;
  flashcardEl.classList.add(`card_color_${colorName}`);

  flipButtonEl.addEventListener("click", () => {
    showingQuestion = !showingQuestion;
    cardTitleEl.textContent = showingQuestion ? card.question : card.answer;
    flashcardEl.classList.toggle("card_color_white", !showingQuestion);
    flipButtonEl.setAttribute(
      "aria-label",
      showingQuestion ? "Show answer" : "Show question",
    );
  });

  deleteButtonEl.addEventListener("click", () => {
    const cardIndex = deck.cards.indexOf(card);
    if (cardIndex !== -1) {
      deck.cards.splice(cardIndex, 1);
    }
    flashcardEl.remove();
  });

  return flashcardEl;
}

export function renderDeckView(deck) {
  deckTitleEl.textContent = deck.name;
  cardListEl.replaceChildren(
    ...deck.cards.map((card) => createFlashcardEl(deck, card)),
  );
  practiceButtonEl.onclick = () => {
    window.location.hash = `carousel/${deck.id}`;
  };
  deckViewSectionEl.style.display = "flex";
}
