import Abstract from './abstract.js';

export const createFilmsListTemplate = () => (`<section class="films">
</section>`);

export default class FilmsListView extends Abstract {

  getTemplate() {
    return createFilmsListTemplate();
  }
}
