import FilmCardView from '../view/film-card-view.js';
import FilmsListView from '../view/films-list-view.js';
import MainNavigationView from '../view/main-navigation-view.js';
import NoFilmView from '../view/no-film-view.js';
import SortListView from '../view/sort-list-view.js';
import {render, renderPosition} from '../utils/render.js';
import PopupView from '../view/popup-view.js';
import { EXTRA_FILM_LIST_CARD_COUNT, SHOW_MORE_BUTTON_STEP } from '../consts.js';

export default class FilmsListPresenter {
  constructor(filmsContainer,filters,films) {
    this._filmsContainer = filmsContainer;
    this._filmsFilters = filters;
    this._filmCards = films.slice();
    this._mainNavigationComponent = new MainNavigationView(filters);
    this._sortComponent = new SortListView();
    this._filmsListComponent = new FilmsListView();
    this._noFilmComponent = new NoFilmView();
    this._popupComponent = new PopupView();
    this._footerContainer = document.querySelector('.footer');
  }

  init() {
    this._renderFilmsBoard();
  }

  _renderFilters() {
    render(this._filmsContainer, this._mainNavigationComponent.getElement(), renderPosition.beforeEnd);
  }

  _renderSort() {
    render(this._filmsContainer, this._sortComponent.getElement(), renderPosition.beforeEnd);
  }

  _renderNoFilms() {
    render(this._filmsContainer, this._noFilmComponent.getElement(), renderPosition.beforeEnd);
  }

  _renderFilmsLists() {
    render(this._filmsContainer, this._filmsListComponent.getElement(), renderPosition.beforeEnd);
  }

  _renderFilmCard(filmContainer, film){
    this._filmCardComponent = new FilmCardView(film);
    const openPopup = () => {

      const popupComponent = new PopupView(film);

      document.querySelector('body').classList.add('hide-overflow');
      this._footerContainer.appendChild(popupComponent.getElement());

      const onEscKeyDown = (evt) => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
          evt.preventDefault();
          document.body.classList.remove('hide-overflow');
          this._footerContainer.removeChild(popupComponent.getElement());
          document.removeEventListener('keydown', onEscKeyDown);
        }
      };

      popupComponent.setClickHandler(()=>{
        document.body.classList.remove('hide-overflow');
        this._footerContainer.removeChild(popupComponent.getElement());
      });
      document.addEventListener('keydown', onEscKeyDown);
    };

    this._filmCardComponent.setClickHandler(()=>{
      openPopup();
    });
    render(filmContainer, this._filmCardComponent.getElement(), renderPosition.beforeEnd);
  }

  _renderFilmsBoard() {

    this._renderFilters();

    this._renderSort();

    if (this._filmCards.length === 0) {
      this._renderNoFilms();
    } else {
      this._renderFilmsLists();

      this._filmsList = document.querySelector('.films-list');
      this._filmsListMainContainer = this._filmsList.querySelector('.films-list--main');
      this._filmListTopRatedContainer = document.querySelector('.films-list--top-rated');
      this._filmListMostCommentedContainer = document.querySelector('.films-list--most-commented');
      this._topRaitedFilms = this._filmCards.sort((a, b) => b.filmRating - a.filmRating);
      this._mostCommentedFilms = this._filmCards.slice().sort((a,b) => b.filmComments.length - a.filmComments.length);

      for (let cardIndex = 0; cardIndex < Math.min(this._filmCards.length, SHOW_MORE_BUTTON_STEP); cardIndex++) {
        this._renderFilmCard(this._filmsListMainContainer, this._filmCards[cardIndex]);
      }
      for (let cardIndex = 0; cardIndex < EXTRA_FILM_LIST_CARD_COUNT; cardIndex++) {
        this._renderFilmCard(this._filmListTopRatedContainer, this._topRaitedFilms[cardIndex]);
      }
      for (let cardIndex = 0; cardIndex < EXTRA_FILM_LIST_CARD_COUNT; cardIndex++) {
        this._renderFilmCard(this._filmListMostCommentedContainer, this._mostCommentedFilms[cardIndex]);
      }
    }
  }
}
