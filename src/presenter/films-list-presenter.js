import FilmsListView from '../view/films-list-view.js';
import NoFilmView from '../view/no-film-view.js';
import SortListView from '../view/sort-container-view.js';
import {remove, render, renderPosition} from '../utils/render.js';
import {EXTRA_FILM_LIST_CARD_COUNT, SHOW_MORE_BUTTON_STEP, SORT_TYPE} from '../consts.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmCardPresenter from './film-card-presenter.js';
import AllmoviesListView from '../view/all-movies-list-view.js';
import AllmoviesContainerView from '../view/allmovies-container-view.js';
import MostCommentedListView from '../view/most-commented-list-view.js';
import MostCommentedContainerView from '../view/most-commented-container-view.js';
import TopRatedListView from '../view/top-rated-list-view.js';
import TopRatedContainerView from '../view/top-rated-container-view.js';
import { updateItem } from '../utils/common.js';

export default class FilmsListPresenter {
  constructor(filmsContainer, popupContainer) {
    this._filmsContainer = filmsContainer;
    this._popupContainer = popupContainer;
    this._sortComponent = new SortListView();
    this._filmsListComponent = new FilmsListView();
    this._noFilmComponent = new NoFilmView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._renderedFilmCardsCount = SHOW_MORE_BUTTON_STEP;
    this._allMoviesContainerComponent = new AllmoviesContainerView();
    this._allMoviesListComponent = new AllmoviesListView();
    this._topRatedContainerComponent = new TopRatedContainerView();
    this._topRatedListComponent = new TopRatedListView();
    this._mostCommentedContainerComponent = new MostCommentedContainerView();
    this._mostCommentedListComponent = new MostCommentedListView;

    this._filmCardPresenter = new Map();
    this._topRatedCardPresenter = new Map();
    this._mostCommentedCardPresenter = new Map();

    this._currentSortType = SORT_TYPE.DEFAULT;

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);

    this._handleFilmCardChange = this._handleFilmCardChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

  }

  init(films) {
    this._filmCards = films.slice();
    this._sourcedfilmCards = films.slice();
    this._renderSort();
    this._renderFilmsList();
  }

  _handleModeChange() {
    this._filmCardPresenter.forEach((presenter) => presenter.resetPopup());
    this._topRatedCardPresenter.forEach((presenter) => presenter.resetPopup());
    this._mostCommentedCardPresenter.forEach((presenter) => presenter.resetPopup());
  }

  _handleFilmCardChange(updatedFilm) {
    this._filmCards = updateItem(this._filmCards, updatedFilm);
    this._sourcedfilmCards = updateItem(this._sourcedfilmCards, updatedFilm);
    if (this._filmCardPresenter.has(updatedFilm.filmId)) {
      this._filmCardPresenter.get(updatedFilm.filmId).init(updatedFilm);
    }
    if (this._topRatedCardPresenter.has(updatedFilm.filmId)) {
      this._topRatedCardPresenter.get(updatedFilm.filmId).init(updatedFilm);
    }
    if (this._mostCommentedCardPresenter.has(updatedFilm.filmId)) {
      this._mostCommentedCardPresenter.get(updatedFilm.filmId).init(updatedFilm);
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);
    this._clearFilmsList();
    this._renderFilmsList();
  }

  _renderSort() {
    render(this._filmsContainer, this._sortComponent, renderPosition.beforeEnd); //рендер сортировки
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _sortFilms(sortType){
    switch (sortType) {
      case SORT_TYPE.byDate:
        this._filmCards.sort((a, b) => b.filmReleaseDate.filmYear - a.filmReleaseDate.filmYear);
        break;
      case SORT_TYPE.byRating:
        this._filmCards.sort((a, b) => b.filmRating - a.filmRating);
        break;
      default:
        this._filmCards = this._sourcedfilmCards.slice();
    }

    this._currentSortType = sortType;
  }

  _renderFilmsList() {
    render(this._sortComponent, this._filmsListComponent, renderPosition.afterEnd); //рендер контейнера под фильмы
    (this._filmCards.length === 0) ? this._renderNoFilms(): this._renderAllMoviesContainer();
  }

  _renderNoFilms() {
    render(this._filmsListComponent, this._noFilmComponent, renderPosition.beforeEnd); //рендер заглушки
  }

  _renderAllMoviesContainer() {
    render(this._filmsListComponent, this._allMoviesContainerComponent, renderPosition.beforeEnd); //рендер Allmovies листа
    this._renderAllMoviesList();
    this._renderTopRatedContainer();
    this._renderMostCommentedContainer();
  }

  _renderAllMoviesList() {
    render(this._allMoviesContainerComponent, this._allMoviesListComponent, renderPosition.beforeEnd); //рендер Allmovies контейнера для фильмов
    this._renderFilms(this._allMoviesListComponent, 0, Math.min(this._filmCards.length, SHOW_MORE_BUTTON_STEP));

    if (this._filmCards.length > SHOW_MORE_BUTTON_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderTopRatedContainer() {
    render(this._allMoviesContainerComponent, this._topRatedContainerComponent, renderPosition.afterEnd); //рендер TopRated листа
    this._renderTopRatedList();
  }

  _renderTopRatedList() {
    render(this._topRatedContainerComponent, this._topRatedListComponent, renderPosition.beforeEnd); //рендер TopRated контейнера для фильмов
    this._renderTopRatedFilms(this._topRatedListComponent, 0, EXTRA_FILM_LIST_CARD_COUNT);

  }

  _renderMostCommentedContainer() {
    render(this._topRatedContainerComponent, this._mostCommentedContainerComponent, renderPosition.afterEnd); //рендер MostCommented листа
    this._renderMostCommentedList();
  }

  _renderMostCommentedList() {
    render(this._mostCommentedContainerComponent, this._mostCommentedListComponent, renderPosition.beforeEnd); //рендер MostCommented контейнера для фильмов
    this._renderMostCommentedFilms(this._mostCommentedListComponent, 0, EXTRA_FILM_LIST_CARD_COUNT);

  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._allMoviesListComponent, this._renderedFilmCardsCount, this._renderedFilmCardsCount + SHOW_MORE_BUTTON_STEP);
    this._renderedFilmCardsCount += SHOW_MORE_BUTTON_STEP;

    if (this._renderedFilmCardsCount >= this._filmCards.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {

    render(this._allMoviesListComponent, this._showMoreButtonComponent, renderPosition.afterEnd);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);

  }

  _clearFilmsList() {
    this._filmCardPresenter.forEach((presenter) => presenter.destroy());
    this._topRatedCardPresenter.forEach((presenter) => presenter.destroy());
    this._mostCommentedCardPresenter.forEach((presenter) => presenter.destroy());
    this._filmCardPresenter.clear();
    this._topRatedCardPresenter.clear();
    this._mostCommentedCardPresenter.clear();
    this._renderedFilmCardsCount += SHOW_MORE_BUTTON_STEP;
    remove(this._showMoreButtonComponent);
  }

  _renderFilm(container, film) {
    if (container === this._allMoviesListComponent) {
      const filmCardPresenter = new FilmCardPresenter(container, this._popupContainer, this._handleFilmCardChange, this._handleModeChange);
      filmCardPresenter.init(film);
      this._filmCardPresenter.set(film.filmId, filmCardPresenter);
    }
    if (container === this._topRatedListComponent) {
      const topRatedCardPresenter = new FilmCardPresenter(container, this._popupContainer, this._handleFilmCardChange, this._handleModeChange);
      topRatedCardPresenter.init(film);
      this._topRatedCardPresenter.set(film.filmId, topRatedCardPresenter);
    }
    if (container === this._mostCommentedListComponent) {
      const mostCommentedCardPresenter = new FilmCardPresenter(container, this._popupContainer, this._handleFilmCardChange, this._handleModeChange);
      mostCommentedCardPresenter.init(film);
      this._mostCommentedCardPresenter.set(film.filmId, mostCommentedCardPresenter);
    }
  }

  _renderFilms(container, from, to) {
    this._filmCards
      .slice(from, to)
      .forEach((filmCard) => this._renderFilm(container, filmCard));
  }

  _renderTopRatedFilms(container, from, to) {
    this._filmCards.sort((a, b) => b.filmRating - a.filmRating)
      .slice(from, to)
      .forEach((filmCard) => this._renderFilm(container, filmCard));
  }

  _renderMostCommentedFilms(container, from, to) {
    this._filmCards.sort((a, b) => b.filmComments.length - a.filmComments.length)
      .slice(from, to)
      .forEach((filmCard) => this._renderFilm(container, filmCard));
  }
}

