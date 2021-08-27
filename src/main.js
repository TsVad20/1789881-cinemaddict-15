import {FILM_CARD_COUNT} from './consts.js';
import {generateFilmCard} from './mock/film-card-mock.js';
import HeaderProfileSectionView from './view/header-profile-section-view.js';
import StatisticsSectionView from './view/statistics-section-view.js';
import {generateFilter} from './mock/filters-mock.js';
import {render, renderPosition} from './utils/render.js';
import FilmsListPresenter from './presenter/films-list-presenter.js';
import MenuView from './view/main-navigation-view.js';

const filmCards = new Array(FILM_CARD_COUNT).fill().map(generateFilmCard);
const filters = generateFilter(filmCards);

const headerProfileComponent = new HeaderProfileSectionView();
const menuComponent = new MenuView(filters);

const headerContainer = document.querySelector('.header');
const mainContainer = document.querySelector('.main');
const footerContainer = document.querySelector('.footer');
const footerStatisticsSection = footerContainer.querySelector('.footer__statistics');

render(headerContainer, headerProfileComponent, renderPosition.beforeEnd); //секция хедера
render(mainContainer, menuComponent, renderPosition.beforeEnd); //секция меню
render(footerStatisticsSection, new StatisticsSectionView(filmCards), renderPosition.beforeEnd); //секция статистики

const filmsListPresenter = new FilmsListPresenter(mainContainer);

filmsListPresenter.init(filmCards);

/*sortComponent.setClickHandler((evt)=>console.log(evt.target));
  sortComponent.getElement().addEventListener('click',(evt)=>console.log(evt.target));

  sortComponent.setSortByDefaultClickHandler(()=>{

    const filmCardsByDefault = filmCards.slice();

    const sortButton = document.querySelectorAll('.sort__button');

    sortButton.forEach((button) => {
      button.classList.remove('sort__button--active');
    });

    sortComponent.getElement().querySelector('.sort__button-default').classList.add('sort__button--active');

    filmCards = filmCardsByDefault.slice();

    const filmsListContainerChildren = Array.from(filmsListMainContainer.children);
    for (const value of filmsListContainerChildren) {
      value.remove();
    }

    for (const value of filmCardsByDefault.slice(0, MAIN_FILM_LIST_CARD_COUNT)) {
      renderFilmCard(filmsListMainContainer, value);
    }
  });

sortComponent.setSortByDateClickHandler(()=>{
    const sortButton = document.querySelectorAll('.sort__button');

    sortButton.forEach((button) => {
      button.classList.remove('sort__button--active');
    });

    sortComponent.getElement().querySelector('.sort__button-date').classList.add('sort__button--active');

    filmCards.sort((a, b) => b.filmReleaseDate.filmYear - a.filmReleaseDate.filmYear);

    const filmsListContainerChildren = Array.from(filmsListMainContainer.children);
    for (const value of filmsListContainerChildren) {
      value.remove();
    }

    for (const value of filmCards.slice(0, MAIN_FILM_LIST_CARD_COUNT)) {
      renderFilmCard(filmsListMainContainer, value);
    }
  });

sortComponent.setSortByRatingClickHandler(()=>{
    const sortButton = document.querySelectorAll('.sort__button');

    sortButton.forEach((button) => {
      button.classList.remove('sort__button--active');
    });

    sortComponent.getElement().querySelector('.sort__button-rating').classList.add('sort__button--active');

    filmCards.sort((a, b) => b.filmRating - a.filmRating);

    const filmsListContainerChildren = Array.from(filmsListMainContainer.children);
    for (const value of filmsListContainerChildren) {
      value.remove();
    }

    for (const value of filmCards.slice(0, MAIN_FILM_LIST_CARD_COUNT)) {
      renderFilmCard(filmsListMainContainer, value);
    }
  });
}*/
