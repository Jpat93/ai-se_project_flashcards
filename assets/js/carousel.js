import { hexToString, removeColorClasses } from "./colors.js";

const carouselSectionEl = document.querySelector("#carousel");
const carouselTitleEl = document.querySelector(".carousel__title");
const carouselCardEl = document.querySelector(".carousel__card");
const carouselCardTextEl = document.querySelector(".carousel__card-text");
const flipButtonEl = document.querySelector(".carousel__btn_type_flip");

const leftButtonEl = document.querySelector(".carousel__btn_type_left");
const rightButtonEl = document.querySelector(".carousel__btn_type_right");

export function renderCarouselView(deck) {
  let currentIndex = 0;
  let showingQuestion = true;

  removeColorClasses(carouselCardEl);

  const colorName = hexToString(deck.color);
  carouselCardEl.classList.add(`carousel__card_color_${colorName}`);

  function updateDisplay() {
    const currentCard = deck.cards[currentIndex];

    if (showingQuestion) {
      carouselCardTextEl.textContent = currentCard.question;
      carouselCardEl.classList.remove("carousel__card_color_white");
    } else {
      carouselCardTextEl.textContent = currentCard.answer;
      carouselCardEl.classList.add("carousel__card_color_white");
    }

    carouselTitleEl.textContent = `${deck.name} · ${currentIndex + 1}/${deck.cards.length}`;

    const isFirstCard = currentIndex === 0;
    const isLastCard = currentIndex === deck.cards.length - 1;

    leftButtonEl.disabled = isFirstCard;
    rightButtonEl.disabled = isLastCard;

    leftButtonEl.classList.toggle("carousel__btn_disabled", isFirstCard);

    rightButtonEl.classList.toggle("carousel__btn_disabled", isLastCard);
  }

  leftButtonEl.onclick = () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      showingQuestion = true;
      updateDisplay();
    }
  };

  rightButtonEl.onclick = () => {
    if (currentIndex < deck.cards.length - 1) {
      currentIndex += 1;
      showingQuestion = true;
      updateDisplay();
    }
  };

  flipButtonEl.onclick = () => {
    showingQuestion = !showingQuestion;
    updateDisplay();
  };

  updateDisplay();
  carouselSectionEl.style.display = "flex";
}
