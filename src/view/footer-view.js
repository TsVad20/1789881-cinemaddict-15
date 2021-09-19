import AbstractView from './abstract.js';
const createFooterTemplate = (film) =>(`<section class="footer__statistics">
<p>${film.length} movies inside
</p></section>`);

export default class FooterView extends AbstractView{
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFooterTemplate(this._film);
  }
}
