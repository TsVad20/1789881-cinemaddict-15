
import { filmCardCount, filmCardTemplate } from './view/film-card.js';
import { filmsListTemplate } from './view/films-list.js';
import {filterTemplate} from './view/filters.js';
import {mainMenuTemplate} from './view/main-menu.js';
import { profileRating } from './view/profile-rating.js';
import { showMoreButtonTemplate } from './view/show-more-button.js';
import { statisticsTemplate } from './view/statistics.js';

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer__statistics');

renderTemplate(siteFooterElement, statisticsTemplate, 'beforeend');

renderTemplate(siteMainElement, mainMenuTemplate, 'beforeend');
renderTemplate(siteMainElement, filterTemplate, 'beforeend');
renderTemplate(siteHeaderElement, profileRating, 'beforeend');
renderTemplate(siteMainElement, filmsListTemplate, 'beforeend');

const filmListContainer = document.querySelector('.films-list__container');

for (let filmCard = 0; filmCard < filmCardCount; filmCard++) {
  renderTemplate(filmListContainer, filmCardTemplate, 'beforeend');
}

renderTemplate(filmListContainer, showMoreButtonTemplate, 'afterend');

const filmListExtraContainer = document.querySelectorAll('.films-list.films-list--extra >.films-list__container');
filmListExtraContainer.forEach((item)=>{
  for (let filmCard = 0; filmCard < 2; filmCard++) {
    renderTemplate(item, filmCardTemplate, 'beforeend');
  }
});
