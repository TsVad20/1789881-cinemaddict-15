import AbstractView from './abstract.js';

export const createFilmsListTemplate = () => (`<section class="films">
</section>`);

export default class FilmsListView extends AbstractView {

  getTemplate() {
    return createFilmsListTemplate();
  }
}
