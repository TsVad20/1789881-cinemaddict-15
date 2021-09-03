import {FILM_CARD_COUNT} from './consts.js';
import {generateFilmCard} from './mock/film-card-mock.js';
import HeaderContainerView from './view/header-container-view.js';
import FooterContainerView from './view/footer-container-view.js';
import {generateFilter} from './mock/filters-mock.js';
import {render, renderPosition} from './utils/render.js';
import FilmsListPresenter from './presenter/films-list-presenter.js';
import MenuContainerView from './view/menu-container-view.js';
import MainContainerView from './view/main-container-view.js';

const filmCards = new Array(FILM_CARD_COUNT).fill().map(generateFilmCard);
const filters = generateFilter(filmCards);

const body = document.querySelector('body');

const headerContainerComponent = new HeaderContainerView();
const mainContainerComponent = new MainContainerView();
const menuContainerComponent = new MenuContainerView(filters);
const footerContainerComponent = new FooterContainerView(filmCards);


render(body, headerContainerComponent, renderPosition.afterBegin); //секция header
render(headerContainerComponent, mainContainerComponent, renderPosition.afterEnd); //секция main
render(mainContainerComponent, menuContainerComponent, renderPosition.beforeEnd); //секция menu
render(mainContainerComponent, footerContainerComponent, renderPosition.afterEnd); //секция footer

const filmsListPresenter = new FilmsListPresenter(mainContainerComponent.getElement(), footerContainerComponent.getElement());

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
