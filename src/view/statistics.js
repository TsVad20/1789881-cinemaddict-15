import {createElement} from '../utils.js';
const createStatisticsTemplate = (film) =>(`<p>${film.length} movies inside
</p>`);

export default class FilmStatisticsView {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createStatisticsTemplate(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
