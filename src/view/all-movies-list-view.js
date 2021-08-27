import AbstractView from './abstract.js';

export const createAllmoviesListTemplate = () => (`<div class="films-list__container">
</div>`);

export default class AllmoviesListView extends AbstractView {

  getTemplate() {
    return createAllmoviesListTemplate();
  }
}
