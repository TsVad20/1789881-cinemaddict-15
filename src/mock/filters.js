const filmsFilter = {
  addedToWatchList: (films) => films.filter((film) => film.usersDetails.addedToWatchlist).length,
  isArchive: (films) => films.filter((film) => film.usersDetails.isArchive).length,
  isFavorite: (films) => films.filter((film) => film.usersDetails.isFavorite).length,
};

export const generateFilter = (films) => Object.entries(filmsFilter).map(
  ([filterName, countFilms]) => ({
    name: filterName,
    count: countFilms(films),
  }),
);
