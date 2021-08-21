import {EXTRA_FILM_LIST_CARD_COUNT, FILM_CARD_COUNT, MAIN_FILM_LIST_CARD_COUNT, SHOW_MORE_BUTTON_STEP} from './consts.js';
import {generateFilmCard} from './mock/film-card.js';
import FilmCardView from './view/film-card.js';
import FilmsListView from './view/films-list.js';
import SortView from './view/sort.js';
import SiteMenuView from './view/main-menu.js';
import PopupView from './view/popup.js';
import HeaderProfileView from './view/profile-rating.js';
import ShowMoreButtonView from './view/show-more-button.js';
import FilmStatisticsView from './view/statistics.js';
import {render, renderPosition} from './render.js';
import {generateFilter} from './mock/filters.js';
import NoFilmView from './view/no-film.js';

const sortComponent = new SortView();
const headerProfileComponent = new HeaderProfileView();
const filmsListComponent = new FilmsListView();
const showMoreButtonComponent = new ShowMoreButtonView();

const filmCards = new Array(FILM_CARD_COUNT).fill().map(generateFilmCard);

const filters = generateFilter(filmCards);

const topRaitedFilms = filmCards.sort((a, b) => b.filmRating - a.filmRating);
const mostCommentedFilms = filmCards.slice().sort((a,b) => b.filmComments.length - a.filmComments.length);

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatisticsElement = document.querySelector('.footer__statistics');

render(siteFooterStatisticsElement, new FilmStatisticsView(filmCards).getElement(), renderPosition.beforeEnd);

render(siteMainElement, new SiteMenuView(filters).getElement(), renderPosition.beforeEnd);

render(siteMainElement, sortComponent.getElement(), renderPosition.beforeEnd);

render(siteHeaderElement, headerProfileComponent.getElement(), renderPosition.beforeEnd);

if (filmCards.length === 0) {
  render(siteMainElement, new NoFilmView().getElement(), renderPosition.beforeEnd);
} else {
  render(siteMainElement, filmsListComponent.getElement(), renderPosition.beforeEnd);

  const filmsList = document.querySelector('.films-list');
  const filmsListMainContainer = filmsList.querySelector('.films-list--main');
  const filmListTopRatedContainer = document.querySelector('.films-list--top-rated');
  const filmListMostCommentedContainer = document.querySelector('.films-list--most-commented');

  const renderFilmCard = (filmContainer, film) =>{

    const filmCardComponent = new FilmCardView(film);

    const openPopup = () => {

      const popupComponent = new PopupView(film);

      document.querySelector('body').classList.add('hide-overflow');
      siteFooterElement.appendChild(popupComponent.getElement());

      const onEscKeyDown = (evt) => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
          evt.preventDefault();
          document.body.classList.remove('hide-overflow');
          siteFooterElement.removeChild(popupComponent.getElement());
          document.removeEventListener('keydown', onEscKeyDown);
        }
      };

      popupComponent.setClickHandler(()=>{
        document.body.classList.remove('hide-overflow');
        siteFooterElement.removeChild(popupComponent.getElement());
      });
      document.addEventListener('keydown', onEscKeyDown);
    };

    filmCardComponent.setClickHandler(()=>{
      openPopup();
    });

    render(filmContainer, filmCardComponent.getElement(), renderPosition.beforeEnd);
  };

  for (let cardIndex = 0; cardIndex < Math.min(filmCards.length, SHOW_MORE_BUTTON_STEP); cardIndex++) {
    renderFilmCard(filmsListMainContainer, filmCards[cardIndex]);
  }

  if (filmCards.length > SHOW_MORE_BUTTON_STEP) {
    let renderedFilmCardsCount = SHOW_MORE_BUTTON_STEP;

    render(filmsList, showMoreButtonComponent.getElement(), renderPosition.beforeEnd);

    showMoreButtonComponent.setClickHandler(() => {

      filmCards
        .slice(renderedFilmCardsCount, renderedFilmCardsCount + SHOW_MORE_BUTTON_STEP)
        .forEach((item) => renderFilmCard(filmsListMainContainer, item));

      renderedFilmCardsCount += SHOW_MORE_BUTTON_STEP;

      if (renderedFilmCardsCount >= filmCards.length) {
        showMoreButtonComponent.getElement().remove();
      }
    });
  }

  for (let cardIndex = 0; cardIndex < EXTRA_FILM_LIST_CARD_COUNT; cardIndex++) {
    renderFilmCard(filmListTopRatedContainer, topRaitedFilms[cardIndex]);
  }

  for (let cardIndex = 0; cardIndex < EXTRA_FILM_LIST_CARD_COUNT; cardIndex++) {
    renderFilmCard(filmListMostCommentedContainer, mostCommentedFilms[cardIndex]);
  }

  sortComponent.setClickHandler((evt)=>console.log(evt.target));
  //sortComponent.getElement().addEventListener('click',(evt)=>console.log(evt.target));

  /*sortComponent.setSortByDefaultClickHandler(()=>{

    const filmCardsByDefault = filmCards.slice();

    const sortButton = document.querySelectorAll('.sort__button');

    sortButton.forEach((button) => {
      button.classList.remove('sort__button--active');
    });

    sortComponent.getElement().querySelector('.sort__button-default').classList.add('sort__button--active');

    //filmCards = filmCardsByDefault.slice();

    const filmsListContainerChildren = Array.from(filmsListMainContainer.children);
    for (const value of filmsListContainerChildren) {
      value.remove();
    }

    for (const value of filmCardsByDefault.slice(0, MAIN_FILM_LIST_CARD_COUNT)) {
      renderFilmCard(filmsListMainContainer, value);
    }
  });*/

  /*sortComponent.setSortByDateClickHandler(()=>{
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
  });*/

  /*sortComponent.setSortByRatingClickHandler(()=>{
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
  });*/
}
