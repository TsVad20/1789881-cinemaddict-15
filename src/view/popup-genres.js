import {createElement} from '../utils.js';
const createPopupGenresTemplate = (film) => {
  const {filmGenres} = film;
  return filmGenres.map((item) => `<span class="film-details__genre">${item}</span>`).join('');
};

export default class PopupGenresView {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createPopupGenresTemplate(this._film);
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
