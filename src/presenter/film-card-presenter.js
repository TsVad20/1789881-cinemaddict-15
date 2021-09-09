import FilmCardView from '../view/film-card-view.js';
import PopupView from '../view/popup-view.js';
import {
  hidePopup,
  remove,
  render,
  renderPosition,
  replace,
  showPopup
} from '../utils/render.js';
import {USER_ACTION, UPDATE_TYPE} from '../consts.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class FilmCardPresenter {

  constructor(filmContainer, popupContainer, changeData, changeMode) {
    this._filmContainer = filmContainer;
    this._popupContainer = popupContainer;

    this._filmCardComponent = null;
    this._popupComponent = null;

    this._mode = Mode.DEFAULT;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);
    this._escKeydownHandler = this._escKeydownHandler.bind(this);

    this._handlePopupCloseButtonClick = this._handlePopupCloseButtonClick.bind(this);
    this._handleAddToWatchlistClick = this._handleAddToWatchlistClick.bind(this);
    this._handleAddToFavoritesClick = this._handleAddToFavoritesClick.bind(this);
    this._handleAlreadyWatchedClick = this._handleAlreadyWatchedClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevPopupComponent = this._popupComponent;

    this._filmCardComponent = new FilmCardView(film);
    this._popupComponent = new PopupView(film);

    this._filmCardComponent.setOpenPopupClickHandler(this._handleFilmCardClick);
    this._filmCardComponent.setAddToWatchlistClickHandler(this._handleAddToWatchlistClick);
    this._filmCardComponent.setAddToFavoritesHandler(this._handleAddToFavoritesClick);
    this._filmCardComponent.setAlreadyWatchedHandler(this._handleAlreadyWatchedClick);
    this._popupComponent.setCloseButtonClickHandler(this._handlePopupCloseButtonClick);
    this._popupComponent.setAddToWatchlistClickHandler(this._handleAddToWatchlistClick);
    this._popupComponent.setAddToFavoritesHandler(this._handleAddToFavoritesClick);
    this._popupComponent.setAlreadyWatchedHandler(this._handleAlreadyWatchedClick);

    if (prevFilmCardComponent === null || prevPopupComponent === null) {
      render(this._filmContainer, this._filmCardComponent, renderPosition.beforeEnd);
      return;
    }

    replace(this._filmCardComponent, prevFilmCardComponent);

    if (this._mode === Mode.EDITING) {
      replace(this._popupComponent, prevPopupComponent);
    }

    remove(prevFilmCardComponent);
    remove(prevPopupComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._popupComponent);
  }

  resetPopup() {
    if (this._mode !== Mode.DEFAULT) {
      this._popupComponent.reset(this._film);
      this._hidePopup();
    }
  }

  _escKeydownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._popupComponent.reset(this._film);
      this._hidePopup();
    }
  }

  _hidePopup() {
    hidePopup(this._popupContainer, this._popupComponent);
    document.removeEventListener('keydown', this._escKeydownHandler);
    this._mode = Mode.DEFAULT;
  }

  _showPopup() {
    showPopup(this._popupContainer, this._popupComponent);
    document.addEventListener('keydown', this._escKeydownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _handleFilmCardClick() {
    if (this._mode !== Mode.EDITING) {
      this._showPopup();
    }
  }

  _handlePopupCloseButtonClick() {
    this._popupComponent.reset(this._film);
    this._hidePopup();
  }

  _handleAddToWatchlistClick() {
    this._changeData(
      USER_ACTION.UPDATE_FILM,
      UPDATE_TYPE.MINOR,
      Object.assign(

        {},

        this._film,

        {

          usersDetails: {

            ...this._film.usersDetails,

            addedToWatchlist: !this._film.usersDetails.addedToWatchlist,

          },

        },

      ),

    );

  }


  _handleAddToFavoritesClick() {
    this._changeData(
      USER_ACTION.UPDATE_FILM,
      UPDATE_TYPE.MINOR,
      Object.assign(

        {},

        this._film,

        {

          usersDetails: {

            ...this._film.usersDetails,

            isFavorite: !this._film.usersDetails.isFavorite,

          },

        },

      ),

    );

  }

  _handleAlreadyWatchedClick() {
    this._changeData(
      USER_ACTION.UPDATE_FILM,
      UPDATE_TYPE.MINOR,
      Object.assign(

        {},

        this._film,

        {

          usersDetails: {

            ...this._film.usersDetails,

            isArchive: !this._film.usersDetails.isArchive,

          },

        },

      ),

    );

  }
}
