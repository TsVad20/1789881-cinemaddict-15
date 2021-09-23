import Abstract from './abstract.js';

export const createAllMoviesListTemplate = () => (`<div class="films-list__container">
</div>`);

export default class AllMoviesListView extends Abstract {

  getTemplate() {
    return createAllMoviesListTemplate();
  }
}
