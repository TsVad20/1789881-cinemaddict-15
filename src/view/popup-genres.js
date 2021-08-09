export const createPopupGenresTemplate = (filmCard) => {
  const {
    filmGenres,
  } = filmCard;
  return filmGenres.map((item) => `<span class="film-details__genre">${item}</span>`);
};
