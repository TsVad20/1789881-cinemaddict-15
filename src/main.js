import {
  EXTRA_FILM_LIST_CARD_COUNT,
  FILM_CARD_COUNT,
  MAIN_FILM_LIST_CARD_COUNT
} from './consts.js';
import {
  generateFilmCard
} from './mock/film-card.js';
import {
  generatePopupCard
} from './mock/popup.js';
import {
  createFilmCardTemplate
} from './view/film-card.js';
import {
  filmsListTemplate
} from './view/films-list.js';
import {
  filterTemplate
} from './view/filters.js';
import {
  mainMenuTemplate
} from './view/main-menu.js';
import {
  createPopupCommentTemplate,
  createPopupGenresTemplate,
  createPopupTemplate
} from './view/popup.js';
import {
  profileRating
} from './view/profile-rating.js';
import {
  showMoreButtonTemplate
} from './view/show-more-button.js';
import {
  statisticsTemplate
} from './view/statistics.js';

const filmCards = new Array(FILM_CARD_COUNT).fill().map(generateFilmCard);
const popup = generatePopupCard();

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatisticsElement = document.querySelector('.footer__statistics');

renderTemplate(siteFooterStatisticsElement, statisticsTemplate, 'beforeend');

renderTemplate(siteMainElement, mainMenuTemplate, 'beforeend');
renderTemplate(siteMainElement, filterTemplate, 'beforeend');
renderTemplate(siteHeaderElement, profileRating, 'beforeend');
renderTemplate(siteMainElement, filmsListTemplate, 'beforeend');

const filmListContainer = document.querySelector('.films-list__container');

for (let cardIndex = 0; cardIndex < MAIN_FILM_LIST_CARD_COUNT; cardIndex++) {
  renderTemplate(filmListContainer, createFilmCardTemplate(filmCards[cardIndex]), 'beforeend');
}

renderTemplate(filmListContainer, showMoreButtonTemplate, 'afterend');

const filmListExtraContainer = document.querySelectorAll('.films-list--extra .films-list__container');
filmListExtraContainer.forEach((item) => {
  for (let cardIndex = 0; cardIndex < EXTRA_FILM_LIST_CARD_COUNT; cardIndex++) {
    renderTemplate(item, createFilmCardTemplate(filmCards[cardIndex]), 'beforeend');
  }
});

renderTemplate(siteFooterElement, createPopupTemplate(popup, filmCards[0]), 'afterend');

const filmDetailsCell = document.querySelectorAll('.film-details__cell');

createPopupGenresTemplate(popup).forEach((item) => {
  renderTemplate(filmDetailsCell[6], item, 'beforeend');
});

const filmDetailsCommentsList = document.querySelector('.film-details__comments-list');

filmCards[0].filmComments.forEach((item) => {
  renderTemplate(filmDetailsCommentsList, createPopupCommentTemplate(item), 'beforeend');
});
