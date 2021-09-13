import {FILTER_TYPE} from '../consts.js';


export const filter = {
  [FILTER_TYPE.ALL]: (films) => films.slice(),
  [FILTER_TYPE.WATCHLIST]: (films) => films.filter((film) => film.usersDetails.addedToWatchlist),
  [FILTER_TYPE.HISTORY]: (films) => films.filter((film) => film.usersDetails.isArchive),
  [FILTER_TYPE.FAVORITES]: (films) => films.filter((film) => film.usersDetails.isFavorite),
};
