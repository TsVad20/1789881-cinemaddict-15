import Abstract from './abstract.js';

export const createMostCommentedContainerTemplate = () => (`<section class="films-list films-list--extra">
  <h2 class="films-list__title">Most commented</h2></section>`);

export default class MostCommentedContainerView extends Abstract {

  getTemplate() {
    return createMostCommentedContainerTemplate();
  }
}
