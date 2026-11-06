import { decks, getDeckByID } from "./decks.js";
import { hexToString, removeColorClasses } from "./colors.js";
import { renderCarouselView } from "./carousel.js";

const cardTemplateEl = document.querySelector("#card-template");
const cardContainerEl = document.querySelector(".decks__list");
const notFoundSection = document.querySelector("#not-found");
const decksSelectionEl = document.querySelector("#decks");
const carouselSectionEl = document.querySelector("#carousel");
const mainContentEl = document.querySelector(".page__main-content");

function createDeckEl(item) {
  const deckEl = cardTemplateEl.content.querySelector(".deck").cloneNode(true);
  const deckTitleEl = deckEl.querySelector(".deck__title");
  const deckCountEl = deckEl.querySelector(".deck__count");
  const deleteButtonEl = deckEl.querySelector(".deck__delete-btn");

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
  deckEl.classList.add(`deck_color_${deckColorName}`);

  const deckLinkEl = deckEl.querySelector(".deck__link");

  deckLinkEl.href = `#carousel/${item.id}`;
  deckLinkEl.setAttribute("aria-label", `Study ${item.name}`);

  return deckEl;
}

function renderDeckEl(item) {
  const deckEl = createDeckEl(item);
  cardContainerEl.prepend(deckEl);
}

function router() {
  const hash = window.location.hash.slice(1);

  decksSelectionEl.style.display = "none";
  notFoundSection.style.display = "none";
  carouselSectionEl.style.display = "none";

  mainContentEl.classList.remove("page__main-content_location_carousel");

  if (hash === "" || hash === "home") {
    decksSelectionEl.style.display = "flex";
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
