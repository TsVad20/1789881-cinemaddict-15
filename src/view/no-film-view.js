import { NO_FILM_TEXT_TYPE } from '../consts.js';
import AbstractView from './abstract.js';

const createNoFilmTemplate = (filterType) => {
  const noFilmTextValue = NO_FILM_TEXT_TYPE[filterType];

  return `<section class="films">
  <section class="films-list">
    <h2 class="films-list__title">${noFilmTextValue}</h2>
  </section>
</section>`;
};

export default class NoFilmView extends AbstractView {
  constructor(filterType) {
    super();
    this._filterType = filterType;
  }

  getTemplate() {
    return createNoFilmTemplate(this._filterType);
  }
}
