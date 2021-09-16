import {getRating} from '../utils/statistic.js';
import AbstractView from './abstract.js';

const createHeaderTemplate = (films) =>(`<header class="header">
  <h1 class="header__logo logo">Cinemaddict</h1>
  <section class="header__profile profile">
  <p class="profile__rating">${getRating(films)}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>
</header>`);

export default class HeaderView extends AbstractView {
  constructor (films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createHeaderTemplate(this._films);
  }
}
