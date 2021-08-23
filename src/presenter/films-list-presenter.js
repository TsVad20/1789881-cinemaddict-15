import FilmsListView from '../view/films-list-view.js';
import MainNavigationView from '../view/main-navigation-view.js';
import NoFilmView from '../view/no-film-view.js';
import SortListView from '../view/sort-list-view.js';
import {remove, render, renderPosition} from '../utils/render.js';
import PopupView from '../view/popup-view.js';
import { EXTRA_FILM_LIST_CARD_COUNT, SHOW_MORE_BUTTON_STEP } from '../consts.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmCardPresenter from './film-card-presenter.js';

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
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this.filmCardPresenter = new FilmCardPresenter();
  }

  init() {
    this._renderFilmsBoard();
  }

  _renderFilters() {
    render(this._filmsContainer, this._mainNavigationComponent, renderPosition.beforeEnd);
  }

  _renderSort() {
    render(this._filmsContainer, this._sortComponent, renderPosition.beforeEnd);
  }

  _renderNoFilms() {
    render(this._filmsContainer, this._noFilmComponent, renderPosition.beforeEnd);
  }

  _renderFilmsLists() {
    render(this._filmsContainer, this._filmsListComponent, renderPosition.beforeEnd);
    this._filmsList = document.querySelector('.films-list');
    this._filmsListMainContainer = this._filmsList.querySelector('.films-list--main');
    this._filmListTopRatedContainer = document.querySelector('.films-list--top-rated');
    this._filmListMostCommentedContainer = document.querySelector('.films-list--most-commented');
    this._topRaitedFilms = this._filmCards.sort((a, b) => b.filmRating - a.filmRating);
    this._mostCommentedFilms = this._filmCards.slice().sort((a,b) => b.filmComments.length - a.filmComments.length);

    this._renderMainFilmsList();

    this._renderTopRatedFilmsList();

    this._renderMostCommentedFilmsList();

  }

  _renderMainFilmsList() {

    for (let cardIndex = 0; cardIndex < Math.min(this._filmCards.length, SHOW_MORE_BUTTON_STEP); cardIndex++) {
      this.filmCardPresenter.init(this._filmsListMainContainer, this._filmCards[cardIndex]);
    }
    if (this._filmCards.length > SHOW_MORE_BUTTON_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderTopRatedFilmsList() {

    for (let cardIndex = 0; cardIndex < EXTRA_FILM_LIST_CARD_COUNT; cardIndex++) {
      this.filmCardPresenter.init(this._filmListTopRatedContainer, this._topRaitedFilms[cardIndex]);
    }
  }

  _renderMostCommentedFilmsList() {

    for (let cardIndex = 0; cardIndex < EXTRA_FILM_LIST_CARD_COUNT; cardIndex++) {
      this.filmCardPresenter.init(this._filmListMostCommentedContainer, this._mostCommentedFilms[cardIndex]);
    }
  }

  _renderShowMoreButton() {

    let renderedFilmCardsCount = SHOW_MORE_BUTTON_STEP;

    render(this._filmsList, this._showMoreButtonComponent, renderPosition.beforeEnd);

    this._showMoreButtonComponent.setClickHandler(() => {

      this._filmCards
        .slice(renderedFilmCardsCount, renderedFilmCardsCount + SHOW_MORE_BUTTON_STEP)
        .forEach((item) => this.filmCardPresenter.init(this._filmsListMainContainer, item));

      renderedFilmCardsCount += SHOW_MORE_BUTTON_STEP;

      if (renderedFilmCardsCount >= this._filmCards.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _renderFilmsBoard() {

    this._renderFilters();

    this._renderSort();

    (this._filmCards.length === 0) ? this._renderNoFilms() : this._renderFilmsLists();
  }
}
