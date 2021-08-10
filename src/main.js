import {EXTRA_FILM_LIST_CARD_COUNT, FILM_CARD_COUNT, MAIN_FILM_LIST_CARD_COUNT, SHOW_MORE_BUTTON_STEP} from './consts.js';
import {generateFilmCard} from './mock/film-card.js';
import {createFilmCardTemplate} from './view/film-card.js';
import FilmsListView from './view/films-list.js';
import SortView from './view/sort.js';
import SiteMenuView from './view/main-menu.js';
import PopupView, { createPopupTemplate } from './view/popup.js';
import {createPopupGenresTemplate} from './view/popup-genres.js';
import {createPopupCommentTemplate} from './view/popup-comment.js';
import HeaderProfileView from './view/profile-rating.js';
import ShowMoreButtonView from './view/show-more-button.js';
import {statisticsTemplate} from './view/statistics.js';
import {renderElement, renderPosition, renderTemplate} from './utils.js';

const siteMenuComponent = new SiteMenuView();
const sortComponent = new SortView();
const headerProfileComponent = new HeaderProfileView();
const filmsListComponent = new FilmsListView();
const showMoreButtonComponent = new ShowMoreButtonView();

let filmCards = new Array(FILM_CARD_COUNT).fill().map(generateFilmCard);

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatisticsElement = document.querySelector('.footer__statistics');

renderTemplate(siteFooterStatisticsElement, statisticsTemplate, 'beforeend');

renderElement(siteMainElement, siteMenuComponent.getElement(), renderPosition.beforeEnd);

renderElement(siteMainElement, sortComponent.getElement(), renderPosition.beforeEnd);

renderElement(siteHeaderElement, headerProfileComponent.getElement(), renderPosition.beforeEnd);

renderElement(siteMainElement, filmsListComponent.getElement(), renderPosition.beforeEnd);

const filmsList = document.querySelector('.films-list');
const filmsListContainer = document.querySelector('.films-list__container');

const openPopup = (film) => {
  const filmCard = document.querySelector('.film-card:last-child');

  filmCard.addEventListener('click', (evt) => {
    if (document.body.classList.contains('modal-open')) {
      return;
    }
    if (evt.target.classList.contains('film-card__title') || evt.target.classList.contains('film-card__poster')) {
      document.body.classList.add('modal-open');
      //renderTemplate(siteFooterElement, createPopupTemplate(film), renderPosition.afterEnd);

      renderElement(siteFooterElement, new PopupView(film).getElement(), renderPosition.afterEnd);

      const filmDetailsCell = document.querySelectorAll('.film-details__cell');
      createPopupGenresTemplate(film).forEach((item) => {
        renderTemplate(filmDetailsCell[6], item, 'beforeend');
      });

      const filmDetailsCommentsList = document.querySelector('.film-details__comments-list');
      film.filmComments.forEach((item) => {
        renderTemplate(filmDetailsCommentsList, createPopupCommentTemplate(item), 'beforeend');
      });

      const closePopupButton = document.querySelector('.film-details__close-btn');

      const filmDetails = document.querySelector('.film-details');
      closePopupButton.addEventListener('click', () => {
        document.body.classList.remove('modal-open');
        filmDetails.remove();
      });
    }
  });
};
for (let cardIndex = 0; cardIndex < MAIN_FILM_LIST_CARD_COUNT; cardIndex++) {
  renderTemplate(filmsListContainer, createFilmCardTemplate(filmCards[cardIndex]), 'beforeend');
  openPopup(filmCards[cardIndex]);
}
renderElement(filmsList, showMoreButtonComponent.getElement(), renderPosition.beforeEnd);

const showMoreButton = document.querySelector('.films-list__show-more');

showMoreButton.addEventListener('click', () => {
  const showMoreFilmsArray = filmCards.slice(filmsListContainer.children.length, filmsListContainer.children.length + SHOW_MORE_BUTTON_STEP);

  for (const value of showMoreFilmsArray) {
    renderTemplate(filmsListContainer, createFilmCardTemplate(value), 'beforeend');
    openPopup(value);
  }
  if (filmsListContainer.children.length >= filmCards.length) {
    showMoreButton.classList.add('visually-hidden');
  }
});

const filmListExtraContainer = document.querySelectorAll('.films-list--extra .films-list__container');
filmListExtraContainer.forEach((item) => {
  for (let cardIndex = 0; cardIndex < EXTRA_FILM_LIST_CARD_COUNT; cardIndex++) {
    renderTemplate(item, createFilmCardTemplate(filmCards[cardIndex]), 'beforeend');
    openPopup(filmCards[cardIndex]);
  }
});

const sortByDefaultHandler = () => {

  const filmCardsByDefault = filmCards.slice();

  const renderDefaultFilmsList = (evt) => {

    evt.preventDefault();
    const sortButton = document.querySelectorAll('.sort__button');

    sortButton.forEach((button) => {
      button.classList.remove('sort__button--active');
    });

    evt.target.classList.add('sort__button--active');

    filmCards = filmCardsByDefault.slice();

    const filmsListContainerChildren = Array.from(filmsListContainer.children);
    for (const value of filmsListContainerChildren) {
      value.remove();
    }

    for (const value of filmCards.slice(0, FILM_CARD_COUNT)) {
      renderTemplate(filmsListContainer, createFilmCardTemplate(value), 'beforeend');
      openPopup(value);
    }
  };
  const sortByDefaultButton = document.querySelector('.sort__button-default');
  sortByDefaultButton.addEventListener('click', renderDefaultFilmsList);
};

sortByDefaultHandler();

const sortByDateHandler = (evt) => {

  evt.preventDefault();
  const sortButton = document.querySelectorAll('.sort__button');

  sortButton.forEach((button) => {
    button.classList.remove('sort__button--active');
  });

  evt.target.classList.add('sort__button--active');
  filmCards.sort((a, b) => b.filmReleaseDate.filmYear - a.filmReleaseDate.filmYear);

  const filmsListContainerChildren = Array.from(filmsListContainer.children);
  for (const value of filmsListContainerChildren) {
    value.remove();
  }

  for (const value of filmCards.slice(0, FILM_CARD_COUNT)) {
    renderTemplate(filmsListContainer, createFilmCardTemplate(value), 'beforeend');
    openPopup(value);
  }
};

const sortByDateButton = document.querySelector('.sort__button-date');
sortByDateButton.addEventListener('click', sortByDateHandler);

const sortByRatingHandler = (evt) => {

  evt.preventDefault();
  const sortButton = document.querySelectorAll('.sort__button');

  sortButton.forEach((button) => {
    button.classList.remove('sort__button--active');
  });

  evt.target.classList.add('sort__button--active');
  filmCards.sort((a, b) => b.filmRating - a.filmRating);

  const filmsListContainerChildren = Array.from(filmsListContainer.children);
  for (const value of filmsListContainerChildren) {
    value.remove();
  }

  for (const value of filmCards.slice(0, FILM_CARD_COUNT)) {
    renderTemplate(filmsListContainer, createFilmCardTemplate(value), 'beforeend');
    openPopup(value);
  }
};

const sortByRatingButton = document.querySelector('.sort__button-rating');
sortByRatingButton.addEventListener('click', sortByRatingHandler);
