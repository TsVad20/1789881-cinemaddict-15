import FilmsListView from '../view/films-list-view.js';
import NoFilmView from '../view/no-film-view.js';
import SortView from '../view/sort-view.js';
import {remove, render, renderPosition} from '../utils/render.js';
import {EXTRA_FILM_LIST_CARD_COUNT, FILTER_TYPE, MODE, SHOW_MORE_BUTTON_STEP, SORT_TYPE, UPDATE_TYPE, USER_ACTION} from '../consts.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmCardPresenter from './film-card-presenter.js';
import AllmoviesListView from '../view/all-movies-list-view.js';
import AllmoviesContainerView from '../view/allmovies-container-view.js';
import MostCommentedListView from '../view/most-commented-list-view.js';
import MostCommentedContainerView from '../view/most-commented-container-view.js';
import TopRatedListView from '../view/top-rated-list-view.js';
import TopRatedContainerView from '../view/top-rated-container-view.js';
import {filter} from '../utils/filter.js';
import CommentsModel from '../model/comments-model.js';
import LoadingView from '../view/loading-view.js';

export default class FilmsListPresenter {
  constructor(filmsContainer, popupContainer, filmsModel, filterModel, api) {
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._commentsModel = new CommentsModel(this._filmsModel.getFilms());
    this._filmsContainer = filmsContainer;
    this._popupContainer = popupContainer;
    this._sortComponent = null;
    this._filmsListComponent = new FilmsListView();
    this._noFilmComponent = null;
    this._showMoreButtonComponent = null;
    this._renderedFilmCardsCount = SHOW_MORE_BUTTON_STEP;
    this._allMoviesContainerComponent = new AllmoviesContainerView();
    this._allMoviesListComponent = new AllmoviesListView();
    this._topRatedContainerComponent = new TopRatedContainerView();
    this._topRatedListComponent = new TopRatedListView();
    this._mostCommentedContainerComponent = new MostCommentedContainerView();
    this._mostCommentedListComponent = new MostCommentedListView;
    this._loadingComponent = new LoadingView();
    this._api = api;

    this._filmCardPresenter = new Map();
    this._topRatedCardPresenter = new Map();
    this._mostCommentedCardPresenter = new Map();

    this._currentSortType = SORT_TYPE.default;
    this._filterType = FILTER_TYPE.ALL;
    this._mode = MODE.DEFAULT;
    this._isLoading = true;

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);

    this._handleModeChange = this._handleModeChange.bind(this);

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
  }

  init() {
    if (this._mode !== MODE.DEFAULT) {
      return;
    }
    this._renderFilmsList();
    this._renderTopRatedContainer();
    this._renderMostCommentedContainer();

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._commentsModel.addObserver(this._handleModelEvent);
    this._mode = MODE.INIT;
  }

  _getFilms() {
    this._filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filteredFilms = filter[this._filterType](films);

    switch (this._currentSortType) {
      case SORT_TYPE.byDate:
        return filteredFilms.slice().sort((a, b) => b.filmReleaseDate.filmYear - a.filmReleaseDate.filmYear);
      case SORT_TYPE.byRating:
        return filteredFilms.slice().sort((a, b) => b.filmRating - a.filmRating);
    }
    return filteredFilms;
  }

  _handleModeChange() {
    this._filmCardPresenter.forEach((presenter) => presenter.resetPopup());
    this._topRatedCardPresenter.forEach((presenter) => presenter.resetPopup());
    this._mostCommentedCardPresenter.forEach((presenter) => presenter.resetPopup());
    document.body.classList.add('hide-overflow');
  }

  _handleViewAction(actionType, updateType, update, innerUpdate = null) {
    switch (actionType) {
      case USER_ACTION.updateFilm:
        this._api.updateData(update).then((response) => {
          this._filmsModel.updateFilm(updateType, response);
        });
        break;
      case USER_ACTION.addComment:
        this._commentsModel.addComment(updateType, update, innerUpdate);
        break;
      case USER_ACTION.deleteComment:
        this._commentsModel.deleteComment(updateType, update, innerUpdate);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UPDATE_TYPE.patch:
        if (this._filterType !== FILTER_TYPE.ALL) {
          this._clearFilmsList({resetRenderedFilmCardsCount: true});
          this._renderAllMoviesList();
        }
        if (this._filmCardPresenter.has(data.filmId)) {
          this._filmCardPresenter.get(data.filmId).init(data);
        }
        if (this._topRatedCardPresenter.has(data.filmId)) {
          this._topRatedCardPresenter.get(data.filmId).init(data);
        }
        if (this._mostCommentedCardPresenter.has(data.filmId)) {
          this._mostCommentedCardPresenter.get(data.filmId).init(data);
        }
        break;
      case UPDATE_TYPE.minor:
        this._clearFilmsList();
        this._renderAllMoviesList();
        break;
      case UPDATE_TYPE.major:
        this._clearFilmsList({
          resetRenderedFilmCardsCount: true,
          resetSortType: true,
        });
        this._renderAllMoviesList();
        break;
      case UPDATE_TYPE.init:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderAllMoviesContainer();
        this._renderTopRatedContainer();
        this._renderMostCommentedContainer();
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearFilmsList({resetRenderedFilmCardsCount: true});
    this._renderAllMoviesList();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new SortView(this._currentSortType);
    render(this._filmsListComponent, this._sortComponent, renderPosition.afterBegin); //рендер сортировки
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilmsList() {
    const films = this._getFilms();
    const filmsCount = films.length;
    render(this._filmsContainer, this._filmsListComponent, renderPosition.beforeEnd); //рендер контейнера под фильмы
    (filmsCount === 0) ? this._renderNoFilms(): this._renderAllMoviesContainer();
  }

  _renderLoading() {
    render(this._filmsListComponent, this._loadingComponent, renderPosition.afterBegin);
  }

  _renderNoFilms() {
    this._noFilmComponent = new NoFilmView(this._filterType);
    render(this._filmsListComponent, this._noFilmComponent, renderPosition.beforeEnd); //рендер заглушки
  }

  _renderAllMoviesContainer() {
    render(this._filmsListComponent, this._allMoviesContainerComponent, renderPosition.beforeEnd); //рендер Allmovies листа
    this._renderAllMoviesList();
  }

  _renderAllMoviesList() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }
    const filmsCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmsCount, SHOW_MORE_BUTTON_STEP));
    this._renderSort();
    render(this._allMoviesContainerComponent, this._allMoviesListComponent, renderPosition.beforeEnd); //рендер Allmovies контейнера для фильмов

    if (filmsCount === 0) {
      this._noFilmComponent = new NoFilmView(this._filterType);
      remove(this._sortComponent);//
      render(this._allMoviesContainerComponent, this._noFilmComponent, renderPosition.beforeEnd);
    } else {
      this._renderFilms(this._allMoviesListComponent, films);

      if (filmsCount > SHOW_MORE_BUTTON_STEP) {
        this._renderShowMoreButton();
      }
    }
  }

  _renderTopRatedContainer() {
    render(this._allMoviesContainerComponent, this._topRatedContainerComponent, renderPosition.afterEnd); //рендер TopRated листа
    this._renderTopRatedList();
  }

  _renderTopRatedList() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }
    render(this._topRatedContainerComponent, this._topRatedListComponent, renderPosition.beforeEnd); //рендер TopRated контейнера для фильмов
    const films = this._getFilms();
    this._renderTopRatedFilms(this._topRatedListComponent, films);

  }

  _renderMostCommentedContainer() {
    render(this._topRatedContainerComponent, this._mostCommentedContainerComponent, renderPosition.afterEnd); //рендер MostCommented листа
    this._renderMostCommentedList();
  }

  _renderMostCommentedList() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }
    render(this._mostCommentedContainerComponent, this._mostCommentedListComponent, renderPosition.beforeEnd); //рендер MostCommented контейнера для фильмов
    const films = this._getFilms();
    this._renderMostCommentedFilms(this._mostCommentedListComponent, films);

  }

  _handleShowMoreButtonClick() {
    const films = this._getFilms();
    const filmsCount = films.length;
    const newRenderedFilmsCount = Math.min(filmsCount, this._renderedFilmCardsCount + SHOW_MORE_BUTTON_STEP);
    this._renderFilms(this._allMoviesListComponent, films.slice(this._renderedFilmCardsCount, newRenderedFilmsCount));
    this._renderedFilmCardsCount = newRenderedFilmsCount;

    if (this._renderedFilmCardsCount >= filmsCount) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {

    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }

    this._showMoreButtonComponent = new ShowMoreButtonView();

    render(this._allMoviesListComponent, this._showMoreButtonComponent, renderPosition.afterEnd);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);

  }

  _clearFilmsList({resetRenderedFilmCardsCount = false, resetSortType = false} = {}) {
    const filmsCount = this._getFilms().length;
    this._filmCardPresenter.forEach((presenter) => presenter.destroy());
    this._filmCardPresenter.clear();

    remove(this._showMoreButtonComponent);
    remove(this._loadingComponent);
    remove(this._sortComponent);

    if (this._noFilmComponent) {
      remove(this._noFilmComponent);
    }

    if (resetRenderedFilmCardsCount) {
      this._renderedFilmCardsCount = SHOW_MORE_BUTTON_STEP;
    } else {
      this._renderedFilmCardsCount = Math.min(filmsCount, this._renderedFilmCardsCount);
    }

    if (resetSortType) {
      this._currentSortType = SORT_TYPE.default;
    }
    document.body.classList.remove('hide-overflow');
  }

  _clearListTopRaited() {
    this._topRatedCardPresenter.forEach((presenter) => presenter.destroy());
    remove(this._topRatedContainerComponent);
  }

  _clearListMostComment() {
    this._mostCommentedCardPresenter.forEach((presenter) => presenter.destroy());
    remove(this._mostCommentedContainerComponent);
  }

  _renderFilm(container, film) {
    if (container === this._allMoviesListComponent) {
      const filmCardPresenter = new FilmCardPresenter(container, this._popupContainer, this._handleViewAction, this._handleModeChange);
      filmCardPresenter.init(film);
      this._filmCardPresenter.set(film.filmId, filmCardPresenter);
    }
    if (container === this._topRatedListComponent) {
      const topRatedCardPresenter = new FilmCardPresenter(container, this._popupContainer, this._handleViewAction, this._handleModeChange);
      topRatedCardPresenter.init(film);
      this._topRatedCardPresenter.set(film.filmId, topRatedCardPresenter);
    }
    if (container === this._mostCommentedListComponent) {
      const mostCommentedCardPresenter = new FilmCardPresenter(container, this._popupContainer, this._handleViewAction, this._handleModeChange);
      mostCommentedCardPresenter.init(film);
      this._mostCommentedCardPresenter.set(film.filmId, mostCommentedCardPresenter);
    }
  }

  _renderFilms(container, films) {
    films.forEach((filmCard) => this._renderFilm(container, filmCard));
  }

  _renderTopRatedFilms(container, films) {
    const topRatedFilms = films.slice().sort((a, b) => b.filmRating - a.filmRating);
    topRatedFilms.slice(0, EXTRA_FILM_LIST_CARD_COUNT).forEach((filmCard) => this._renderFilm(container, filmCard));
  }

  _renderMostCommentedFilms(container, films) {
    const mostCommentedFilms = films.slice().sort((a, b) => b.filmComments.length - a.filmComments.length);
    mostCommentedFilms.slice(0, EXTRA_FILM_LIST_CARD_COUNT).forEach((filmCard) => this._renderFilm(container, filmCard));
  }

  destroy() {
    this._clearFilmsList({resetRenderedMovieCount: true, resetSortType: true});
    this._mode = MODE.DEFAULT;
    this._clearListTopRaited();
    this._clearListMostComment();
    this._filmsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
    this._commentsModel.removeObserver(this._handleModelEvent);
  }
}
