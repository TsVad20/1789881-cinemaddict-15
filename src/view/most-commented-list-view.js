import AbstractView from './abstract.js';

export const createMostCommentedListTemplate = () => (`<div class="films-list__container films-list--most-commented">
</div>`);

export default class MostCommentedListView extends AbstractView {

  getTemplate() {
    return createMostCommentedListTemplate();
  }
}
