import AbstractObserver from '../utils/abstract-observer.js';

export default class FilmsModel extends AbstractObserver {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(films) {
    this._films = films.slice();
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.filmId === update.filmId);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addFilm(updateType, update) {
    this._films = [
      update,
      ...this._films,
    ];

    this._notify(updateType, update);
  }

  deleteFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.filmid === update.filmid);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting film');
    }

    this._films = [
      ...this._films.slice(0, index),
      ...this._films.slice(index + 1),
    ];

    this._notify(updateType);
  }

  static adaptToClient(film) {
    const adaptedFilm = {
      filmId: film.id,
      filmPoster: `images/posters/${film.film_info.poster}`,
      filmTitle: film.film_info.title,
      filmDescription: film.film_info.description,
      filmRating: film.film_info.total_rating,
      filmDuration: film.film_info.runtime,
      filmDirector: film.film_info.director,
      filmWriters: film.film_info.writers,
      filmActors: film.film_info.actors,
      filmReleaseDate: film.film_info.release.date,
      filmCountry: film.film_info.release.release_country,
      filmGenres: film.film_info.genre,
      filmAge: film.film_info.age_rating,
      filmComments: film.comments,
      usersDetails: {
        addedToWatchlist: film.user_details.watchlist,
        isArchive: film.user_details.already_watched,
        watchingDate: film.user_details.watching_date,
        isFavorite: film.user_details.favorite,
      },
    };

    return adaptedFilm;
  }
}
