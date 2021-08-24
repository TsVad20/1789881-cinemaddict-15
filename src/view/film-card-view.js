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
    this._clickHandler = this._clickHandler.bind(this);
    this._editClickHandler = this._editClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click(evt);
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelectorAll('.film-card__title, .film-card__poster, .film-card__comments')
      .forEach((item) => item.addEventListener('click', this._clickHandler));
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.click(evt);
  }

  setEditClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelectorAll('.film-card__controls-item--add-to-watchlist, .film-card__controls-item--mark-as-watched, .film-card__controls-item--favorite')
      .forEach((item) => item.addEventListener('click', this._clickHandler));
  }
}
