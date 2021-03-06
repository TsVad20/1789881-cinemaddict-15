import AbstractView from './abstract.js';

export const createAllmoviesContainerTemplate = () => (`<section class="films-list">
  <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
  </section>`);

export default class AllmoviesContainerView extends AbstractView {

  getTemplate() {
    return createAllmoviesContainerTemplate();
  }
}
