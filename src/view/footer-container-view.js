import AbstractView from './abstract.js';
const createFooterTemplate = (film) =>(`<footer class="footer">
<section class="footer__logo logo logo--smaller">Cinemaddict</section>
<section class="footer__statistics"><p>${film.length} movies inside
</p></section>
</footer>`);

export default class FooterView extends AbstractView{
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFooterTemplate(this._film);
  }
}
