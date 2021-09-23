import {getRating} from '../utils/statistic.js';
import Abstract from './abstract.js';

const createHeaderTemplate = (films) =>(`<section class="header__profile profile">
  <p class="profile__rating">${getRating(films)}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`);

export default class HeaderView extends Abstract {
  constructor (films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createHeaderTemplate(this._films);
  }
}
