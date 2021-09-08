import dayjs from 'dayjs';
import { COMMENT_EMOJIES } from '../consts.js';
import SmartView from './smart.js';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

const createCommentsTemplate = (comments) =>
  comments.map((item) => `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="${item.commentEmoji}" width="55" height="55" alt="${item.commentEmoji}">
  </span>
  <div>
    <p class="film-details__comment-text">${item.commentText}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${item.commentAuthor}</span>
      <span class="film-details__comment-day">${dayjs(item.commentDate).fromNow()}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`);

const createNewCommentTemplate = (commentEmoji, isEmoji) => (isEmoji) ?
  `<img src="images/emoji/${commentEmoji}.png" width="55" height="55" alt="emoji-${commentEmoji}">` : '';

const createEmojiesTemplate = (checkedEmoji) => `
<div class="film-details__emoji-list">
  ${COMMENT_EMOJIES.map((item) =>
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${item}" value="${item}" ${checkedEmoji === item ? 'checked' : ''}>
    <label class="film-details__emoji-label" for="emoji-${item}">
    <img src="./images/emoji/${item}.png" width="30" height="30" alt="${item}">
    </label>`).join('')}
</div>
`;

export const createPopupTemplate = (data) => {

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
    newComment,
  } = data;

  const addedToWatchlistClassName = usersDetails.addedToWatchlist ?
    'film-details__control-button film-details__control-button--watchlist film-details__control-button--active' :
    'film-details__control-button film-details__control-button--watchlist';

  const isArchiveClassName = usersDetails.isArchive ?
    'film-details__control-button film-details__control-button--watched film-details__control-button--active' :
    'film-details__control-button film-details__control-button--watched';

  const isFavoriteClassName = usersDetails.isFavorite ?
    'film-details__control-button film-details__control-button--favorite film-details__control-button--active' :
    'film-details__control-button film-details__control-button--favorite';

  const genres = filmGenres.map((item) => `<span class="film-details__genre">${item}</span>`);

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
            <td class="film-details__cell">${dayjs(filmReleaseDate).format('DD MMMM YYYY')}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Runtime</td>
            <td class="film-details__cell">${dayjs.duration(filmDuration, 'minutes').format('H[h] mm[m]')}</td>
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
      <ul class="film-details__comments-list">${createCommentsTemplate(filmComments)}</ul>
      <div class="film-details__new-comment">
        <div class="film-details__add-emoji-label">
        ${createNewCommentTemplate(newComment.emoji, newComment.isEmoji)}</div>
        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${newComment.commentDescription}</textarea>
        </label>
        ${createEmojiesTemplate(newComment.emoji)}
      </div>
    </section>
  </div>
</form>
</section>`;
};

export default class PopupView extends SmartView {
  constructor(film) {
    super();
    this._data = PopupView.parseFilmToData(film);
    this._clickCloseButtonHandler = this._clickCloseButtonHandler.bind(this);
    this._clickAddToWatchlistHandler = this._clickAddToWatchlistHandler.bind(this);
    this._clickAlreadyWatchedHandler = this._clickAlreadyWatchedHandler.bind(this);
    this._clickAddToFavoritesHandler = this._clickAddToFavoritesHandler.bind(this);

    this._emojiToggleHandler = this._emojiToggleHandler.bind(this);
    this._commentDescriptionInputHandler = this._commentDescriptionInputHandler.bind(this);
    this._setInnerHandlers();
  }

  static parseFilmToData(film) {
    return Object.assign({}, film, {
      newComment: {
        commentDescription: '',
      },
    });

  }

  reset(film) {
    this.updateData(PopupView.parseFilmToData(film));
  }

  getTemplate() {
    return createPopupTemplate(this._data);
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

  _emojiToggleHandler(evt) {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    evt.preventDefault();
    this.updateData({
      newComment: Object.assign({},
        this._data.newComment, {
          isEmoji: this._data.newComment.emoji !== evt.target.value,
          emoji: this._data.newComment.emoji === evt.target.value ? '' : evt.target.value,
        },
      ),
    });
  }

  _commentDescriptionInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      newComment: Object.assign({}, this._data.newComment, {
        commentDescription: evt.target.value,
      }),
    }, true);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setCloseButtonClickHandler(this._callback.onCloseButtonClick);
    this.setAddToWatchlistClickHandler(this._callback.onAddToWatchlistClick);
    this.setAlreadyWatchedHandler(this._callback.onAlreadyWatchedClick);
    this.setAddToFavoritesHandler(this._callback.onAlreadyWatchedClick);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.film-details__emoji-list')
      .addEventListener('click', this._emojiToggleHandler);

    this.getElement()
      .querySelector('.film-details__comment-input')
      .addEventListener('change', this._commentDescriptionInputHandler);
  }

}
