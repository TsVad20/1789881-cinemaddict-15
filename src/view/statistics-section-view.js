import AbstractView from './abstract.js';
const createStatisticsSectionTemplate = (film) =>(`<p>${film.length} movies inside
</p>`);

export default class StatisticsSectionView extends AbstractView{
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createStatisticsSectionTemplate(this._film);
  }
}
