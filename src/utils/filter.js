import {FILTER_TYPE} from '../consts.js';


export const filter = {
  [FILTER_TYPE.allMovies]: (films) => films.slice(),
  [FILTER_TYPE.watchlist]: (films) => films.filter((film) => film.usersDetails.addedToWatchlist),
  [FILTER_TYPE.history]: (films) => films.filter((film) => film.usersDetails.isArchive),
  [FILTER_TYPE.favorites]: (films) => films.filter((film) => film.usersDetails.isFavorite),
};
