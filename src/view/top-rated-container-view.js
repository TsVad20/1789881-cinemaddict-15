import AbstractView from './abstract.js';

export const createTopRatedContainerTemplate = () => (`<section class="films-list films-list--extra">
  <h2 class="films-list__title">Top rated</h2></section>`);

export default class TopRatedContainerView extends AbstractView {

  getTemplate() {
    return createTopRatedContainerTemplate();
  }
}
