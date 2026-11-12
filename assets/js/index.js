import { decks, getDeckByID } from "./decks.js";
import { hexToString, removeColorClasses } from "./colors.js";
import { renderCarouselView } from "./carousel.js";
import { renderDeckView } from "./deck-view.js";

const cardTemplateEl = document.querySelector("#card-template");
const notFoundSection = document.querySelector("#not-found");
const decksSelectionEl = document.querySelector("#home");
const cardContainerEl = decksSelectionEl.querySelector(".gallery__list");
const deckViewSectionEl = document.querySelector("#deck-view");
const carouselSectionEl = document.querySelector("#carousel");
const mainContentEl = document.querySelector(".page__main-content");

function createDeckEl(item) {
  const deckEl = cardTemplateEl.content.querySelector(".card").cloneNode(true);
  const deckTitleEl = deckEl.querySelector(".card__title");
  const deckCountEl = deckEl.querySelector(".card__count");
  const deleteButtonEl = deckEl.querySelector(".card__delete-btn");

  // for deck title - sets deck title with corresponding name
  deckTitleEl.textContent = item.name;

  // for delete button - remove deck when clicked
  deleteButtonEl.addEventListener("click", () => {
    deckEl.remove();
  });

  deleteButtonEl.setAttribute(
    "aria-label",
    `Delete ${item.name} deck when clicked`,
  );

  // for deck count
  deckCountEl.textContent = `${item.cards.length} cards`;

  // Remove existing color modifier
  removeColorClasses(deckEl);

  // For deck color modifier
  const deckColorName = hexToString(item.color);
  deckEl.classList.add(`card_color_${deckColorName}`);

  const deckLinkEl = deckEl.querySelector(".card__link");

  deckLinkEl.href = `#deck/${item.id}`;
  deckLinkEl.setAttribute("aria-label", `View ${item.name} deck`);

  return deckEl;
}

function renderDeckEl(item) {
  const deckEl = createDeckEl(item);
  cardContainerEl.prepend(deckEl);
}

function router() {
  const hash = window.location.hash.slice(1);

  decksSelectionEl.style.display = "none";
  deckViewSectionEl.style.display = "none";
  notFoundSection.style.display = "none";
  carouselSectionEl.style.display = "none";

  mainContentEl.classList.remove("page__main-content_location_carousel");

  if (hash === "" || hash === "home") {
    decksSelectionEl.style.display = "flex";
  } else if (hash.startsWith("deck/")) {
    const deckID = hash.slice("deck/".length);
    const deck = getDeckByID(deckID);

    if (deck) {
      renderDeckView(deck);
    } else {
      notFoundSection.style.display = "block";
    }
  } else if (hash.startsWith("carousel/")) {
    const deckID = hash.slice("carousel/".length);
    const deck = getDeckByID(deckID);

    if (deck) {
      mainContentEl.classList.add("page__main-content_location_carousel");

      renderCarouselView(deck);
    } else {
      notFoundSection.style.display = "block";
    }
  } else {
    notFoundSection.style.display = "block";
  }
}

decks.forEach(renderDeckEl);

window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", router);
