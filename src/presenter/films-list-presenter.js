import FilmsListView from '../view/films-list-view.js';
import NoFilmView from '../view/no-film-view.js';
import SortListView from '../view/sort-list-view.js';
import {remove, render, renderPosition} from '../utils/render.js';
import PopupView from '../view/popup-view.js';
import { EXTRA_FILM_LIST_CARD_COUNT, SHOW_MORE_BUTTON_STEP } from '../consts.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmCardPresenter from './film-card-presenter.js';


export default class FilmsListPresenter {
  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;
    this._sortComponent = new SortListView();
    this._filmsListComponent = new FilmsListView();
    this._noFilmComponent = new NoFilmView();
    this._popupComponent = new PopupView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this.filmCardPresenter = new FilmCardPresenter();
    this._renderedFilmCardsCount = SHOW_MORE_BUTTON_STEP;
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    //this._handleFilmChange = this._handleFilmChange.bind(this);
  }

  init(films) {
    this._filmCards = films.slice();
    this._renderFilmsBoard();
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

    this._renderFilms(this._filmsListMainContainer, 0, Math.min(this._filmCards.length, SHOW_MORE_BUTTON_STEP));

    if (this._filmCards.length > SHOW_MORE_BUTTON_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderTopRatedFilmsList() {

    this._renderFilms(this._filmListTopRatedContainer, 0, EXTRA_FILM_LIST_CARD_COUNT);

  }

  _renderMostCommentedFilmsList() {

    this._renderFilms(this._filmListMostCommentedContainer, 0, EXTRA_FILM_LIST_CARD_COUNT);

  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._filmsListMainContainer, this._renderedFilmCardsCount, this._renderedFilmCardsCount + SHOW_MORE_BUTTON_STEP);
    this._renderedFilmCardsCount += SHOW_MORE_BUTTON_STEP;

    if (this._renderedFilmCardsCount >= this._filmCards.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {

    render(this._filmsList, this._showMoreButtonComponent, renderPosition.beforeEnd);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);

  }

  _renderFilms(container,from, to) {
    this._filmCards
      .slice(from, to)
      .forEach((filmCard) => this.filmCardPresenter.init(container, filmCard));
  }

  _renderFilmsBoard() {

    this._renderSort();

    (this._filmCards.length === 0) ? this._renderNoFilms() : this._renderFilmsLists();
  }
}
