import AbstractView from './abstract.js';
export const createPopupTemplate = (film) => {

  const {
    filmDirector,
    filmWriters,
    filmActors,
    filmReleaseDate,
    filmCountry,
    filmAge,
    filmComments,
    filmPoster,
    filmTitle,
    filmRating,
    filmDuration,
    filmDescription,
    filmGenres,
    usersDetails,
  } = film;

  const addedToWatchlistClassName = usersDetails.addedToWatchlist
    ? 'film-details__control-button film-details__control-button--watchlist film-details__control-button--active'
    : 'film-details__control-button film-details__control-button--watchlist';

  const isArchiveClassName = usersDetails.isArchive
    ? 'film-details__control-button film-details__control-button--watched film-details__control-button--active'
    : 'film-details__control-button film-details__control-button--watched';

  const isFavoriteClassName = usersDetails.isFavorite
    ? 'film-details__control-button film-details__control-button--favorite film-details__control-button--active'
    : 'film-details__control-button film-details__control-button--favorite';

  const genres = filmGenres.map((item) => `<span class="film-details__genre">${item}</span>`);

  const comments = filmComments.map((item)=>`<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="${item.commentEmoji}" width="55" height="55" alt="${item.commentEmoji}">
  </span>
  <div>
    <p class="film-details__comment-text">${item.commentText}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${item.commentAuthor}</span>
      <span class="film-details__comment-day">${item.commentDate}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`);

  return `<section class="film-details">
<form class="film-details__inner" action="" method="get">
  <div class="film-details__top-container">
    <div class="film-details__close">
      <button class="film-details__close-btn" type="button">close</button>
    </div>
    <div class="film-details__info-wrap">
      <div class="film-details__poster">
        <img class="film-details__poster-img" src="./images/posters/${filmPoster}" alt="./images/posters/${filmPoster}">
        <p class="film-details__age">${filmAge}</p>
      </div>
      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">${filmTitle}</h3>
            <p class="film-details__title-original">Original: ${filmTitle}</p>
          </div>

          <div class="film-details__rating">
            <p class="film-details__total-rating">${filmRating}</p>
          </div>
        </div>
        <table class="film-details__table">
          <tr class="film-details__row">
            <td class="film-details__term">Director</td>
            <td class="film-details__cell">${filmDirector}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Writers</td>
            <td class="film-details__cell">${filmWriters}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Actors</td>
            <td class="film-details__cell">${filmActors}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Release Date</td>
            <td class="film-details__cell">${filmReleaseDate.filmDay} ${filmReleaseDate.filmMonth} ${filmReleaseDate.filmYear}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Runtime</td>
            <td class="film-details__cell">${filmDuration}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Country</td>
            <td class="film-details__cell">${filmCountry}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">${filmGenres.length > 1 ? 'Genres' : 'Genre'}</td>
            <td class="film-details__cell">${genres.join('')}</td>
          </tr>
        </table>
        <p class="film-details__film-description">${filmDescription}</p>
      </div>
    </div>
    <section class="film-details__controls">
      <button type="button" class="${addedToWatchlistClassName}" id="watchlist" name="watchlist">Add to watchlist</button>
      <button type="button" class="${isArchiveClassName}" id="watched" name="watched">Already watched</button>
      <button type="button" class="${isFavoriteClassName}" id="favorite" name="favorite">Add to favorites</button>
    </section>
  </div>
  <div class="film-details__bottom-container">
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${filmComments.length}</span></h3>
      <ul class="film-details__comments-list">${comments.join('')}</ul>
      <div class="film-details__new-comment">
        <div class="film-details__add-emoji-label"></div>
        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
        </label>
        <div class="film-details__emoji-list">
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
          <label class="film-details__emoji-label" for="emoji-smile">
            <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
          </label>
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
          <label class="film-details__emoji-label" for="emoji-sleeping">
            <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
          </label>
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
          <label class="film-details__emoji-label" for="emoji-puke">
            <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
          </label>
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
          <label class="film-details__emoji-label" for="emoji-angry">
            <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
          </label>
        </div>
      </div>
    </section>
  </div>
</form>
</section>`;
};

export default class PopupView extends AbstractView{
  constructor(film) {
    super();
    this._film = film;
    this._clickCloseButtonHandler = this._clickCloseButtonHandler.bind(this);
    this._clickAddToWatchlistHandler = this._clickAddToWatchlistHandler.bind(this);
    this._clickAlreadyWatchedHandler = this._clickAlreadyWatchedHandler.bind(this);
    this._clickAddToFavoritesHandler = this._clickAddToFavoritesHandler.bind(this);
  }

  getTemplate() {
    return createPopupTemplate(this._film);
  }

  _clickCloseButtonHandler(evt) {
    evt.preventDefault();
    this._callback.onCloseButtonClick();
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

  setCloseButtonClickHandler(callback) {
    this._callback.onCloseButtonClick = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._clickCloseButtonHandler);
  }

  setAddToWatchlistClickHandler(callback) {
    this._callback.onAddToWatchlistClick = callback;
    this.getElement().querySelector('#watchlist').addEventListener('click', this._clickAddToWatchlistHandler);
  }

  setAlreadyWatchedHandler(callback) {
    this._callback.onAlreadyWatchedClick = callback;
    this.getElement().querySelector('#watched').addEventListener('click', this._clickAlreadyWatchedHandler);
  }

  setAddToFavoritesHandler(callback) {
    this._callback.onAddToFavoritesClick = callback;
    this.getElement().querySelector('#favorite').addEventListener('click', this._clickAddToFavoritesHandler);
  }
}
