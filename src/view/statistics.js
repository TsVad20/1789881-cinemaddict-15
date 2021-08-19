import AbstractView from './abstract.js';
const createStatisticsTemplate = (film) =>(`<p>${film.length} movies inside
</p>`);

export default class FilmStatisticsView extends AbstractView{
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createStatisticsTemplate(this._film);
  }
}
