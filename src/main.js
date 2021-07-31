import { filmCardTemplate } from './view/film-card.js';
import { filmsListTemplate } from './view/films-list.js';
import { filterTemplate } from './view/filters.js';
import { mainMenuTemplate } from './view/main-menu.js';
import { popupTemplate } from './view/popup.js';
import { profileRating } from './view/profile-rating.js';
import { showMoreButtonTemplate } from './view/show-more-button.js';
import { statisticsTemplate } from './view/statistics.js';

const MAIN_FILM_LIST_CARD_COUNT = 5;
const EXTRA_FILM_LIST_CARD_COUNT = 2;

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
  renderTemplate(filmListContainer, filmCardTemplate, 'beforeend');
}

renderTemplate(filmListContainer, showMoreButtonTemplate, 'afterend');

const filmListExtraContainer = document.querySelectorAll('.films-list--extra .films-list__container');
filmListExtraContainer.forEach((item)=>{
  for (let cardIndex = 0; cardIndex < EXTRA_FILM_LIST_CARD_COUNT; cardIndex++) {
    renderTemplate(item, filmCardTemplate, 'beforeend');
  }
});

renderTemplate(siteFooterElement, popupTemplate, 'afterend');
