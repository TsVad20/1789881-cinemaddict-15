import FilmCardView from '../view/film-card-view.js';
import PopupView from '../view/popup-view.js';
import {
  remove,
  render,
  renderPosition,
  replace
} from '../utils/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class FilmCardPresenter {

  constructor(filmContainer, changeData) {
    this._filmContainer = filmContainer;
    this._filmCardComponent = null;
    this._popupComponent = null;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

    this._mode = Mode.DEFAULT;

    this._changeData = changeData;
    //this._changeMode = changeMode;
  }

  init(film) {
    this._film = film;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevPopupComponent = this._popupComponent;

    this._filmCardComponent = new FilmCardView(film);
    this._popupComponent = new PopupView(film);

    if (prevFilmCardComponent === null|| prevPopupComponent === null) {
      this._renderFilmCard(this._filmContainer, film);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._popupComponent, prevPopupComponent);
    }

    remove(prevFilmCardComponent);
    remove(prevPopupComponent);
    //this._renderFilmCard(filmContainer, film);
  }

  destroy() {
    remove(this._filmCardComponent);
  }

  resetView(film) {
    if (this._mode !== Mode.DEFAULT) {
      this._removePopup(film);
    }
  }

  _renderFilmCard(filmContainer,film) {
    this._film = film;
    this._filmContainer = filmContainer;
    this._filmCardComponent.setOpenPupupClickHandler(() => {
      this._renderPopup(film);
    });
    this._filmCardComponent.setAddToFavoritesHandler(() => {
      this._changeData(Object.assign({}, this._film.usersDetails, {isFavorite: !this._film.usersDetails.isFavorite}));
    });
    //this._changeMode();
    //console.log(this._changeMode());
    this._mode = Mode.EDITING;
    render(this._filmContainer, this._filmCardComponent, renderPosition.beforeEnd);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      document.body.classList.remove('hide-overflow');
      remove(this._popupComponent);
    }
  }

  _renderPopup(film) {
    this._film = film;
    this._footerContainer = document.querySelector('.footer');
    document.querySelector('body').classList.add('hide-overflow');
    this._footerContainer.after(this._popupComponent.getElement());
    this._removePopup();
  }

  _removePopup(film) {
    this._film = film;
    this._popupComponent.setCloseButtonClickHandler(() => {
      document.body.classList.remove('hide-overflow');
      remove(this._popupComponent);
      document.removeEventListener('keydown', this._escKeyDownHandler);
    });
    this._mode = Mode.DEFAULT;
    document.addEventListener('keydown', this._escKeyDownHandler);

  }
  /*_handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._task,
        {
          isFavorite: !this._task.isFavorite,
        },
      ),
    );
  }*/
}
