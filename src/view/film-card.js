import { FILM_DESCRIPTION_MAX_LENGTH } from '../consts.js';

export const createFilmCardTemplate = (filmCard) =>{
  const {filmPoster, filmTitle, filmDescription, filmRating, filmReleaseDate, filmDuration, filmGenres, filmComments} = filmCard;

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
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
    </article>`;
};