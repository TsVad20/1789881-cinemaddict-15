import Abstract from './abstract.js';

export const createAllMoviesContainerTemplate = () => (`<section class="films-list">
  <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
  </section>`);

export default class AllMoviesContainerView extends Abstract {

  getTemplate() {
    return createAllMoviesContainerTemplate();
  }
}
