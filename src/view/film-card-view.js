import AbstractView from './abstract.js';
import { FILM_DESCRIPTION_MAX_LENGTH } from '../consts.js';

const createFilmCardTemplate = (film) =>{
  const {filmPoster, filmTitle, filmDescription, filmRating, filmReleaseDate, filmDuration, filmGenres, filmComments, usersDetails} = film;

  const addedToWatchlistClassName = usersDetails.addedToWatchlist
    ? 'film-card__controls-item--add-to-watchlist film-card__controls-item--active'
    : 'film-card__controls-item--add-to-watchlist';

  const isArchiveClassName = usersDetails.isArchive
    ? 'film-card__controls-item--mark-as-watched film-card__controls-item--active'
    : 'film-card__controls-item--mark-as-watched';

  const isFavoriteClassName = usersDetails.isFavorite
    ? 'film-card__controls-item--favorite film-card__controls-item--active'
    : 'film-card__controls-item--favorite';

  return `<article class="film-card">
    <h3 class="film-card__title">${filmTitle}</h3>
    <p class="film-card__rating">${filmRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${filmReleaseDate.filmYear}</span>
      <span class="film-card__duration">${filmDuration}</span>
      <span class="film-card__genre">${filmGenres.slice(0,1)}</span>
    </p>
    <img src="./images/posters/${filmPoster}" alt="./images/posters/${filmPoster}" class="film-card__poster">
    <p class="film-card__description">${filmDescription.slice(0,FILM_DESCRIPTION_MAX_LENGTH - 1)}(...)</p>
    <a class="film-card__comments">${filmComments.length} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item ${addedToWatchlistClassName}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item ${isArchiveClassName}" type="button">Mark as watched</button>
      <button class="film-card__controls-item ${isFavoriteClassName}" type="button">Mark as favorite</button>
    </div>
    </article>`;
};
export default class FilmCardView extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._openPopupClickHandler = this._openPopupClickHandler.bind(this);
    this._clickAddToWatchlistHandler = this._clickAddToWatchlistHandler.bind(this);
    this._clickAlreadyWatchedHandler = this._clickAlreadyWatchedHandler.bind(this);
    this._clickAddToFavoritesHandler = this._clickAddToFavoritesHandler.bind(this);

  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _openPopupClickHandler(evt) {
    evt.preventDefault();
    this._callback.onCardClick();
  }

  _clickAddToWatchlistHandler(evt) {
    evt.preventDefault();
    this._callback.onAddToWatchlistClick();
  }

  _clickAlreadyWatchedHandler(evt) {
    evt.preventDefault();
    this._callback.onAlreadyWatchedClick();
  }

  _clickAddToFavoritesHandler(evt) {
    evt.preventDefault();
    this._callback.onAddToFavoritesClick();
  }


  setOpenPupupClickHandler(callback) {
    this._callback.onCardClick = callback;
    this. getElement().querySelector('.film-card__title').addEventListener('click', this._openPopupClickHandler);
    this. getElement().querySelector('.film-card__poster').addEventListener('click', this._openPopupClickHandler);
    this. getElement().querySelector('.film-card__comments').addEventListener('click', this._openPopupClickHandler);
  }

  setAddToWatchlistClickHandler(callback) {
    this._callback.onAddToWatchlistClick = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._clickAddToWatchlistHandler);
  }

  setAlreadyWatchedHandler(callback) {
    this._callback.onAlreadyWatchedClick = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._clickAlreadyWatchedHandler);
  }

  setAddToFavoritesHandler(callback) {
    this._callback.onAddToFavoritesClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._clickAddToFavoritesHandler);
  }
}
