import Abstract from './abstract.js';

export const createMostCommentedListTemplate = () => (`<div class="films-list__container films-list--most-commented">
</div>`);

export default class MostCommentedListView extends Abstract {

  getTemplate() {
    return createMostCommentedListTemplate();
  }
}
