import Abstract from './abstract.js';

export const createTopRatedListTemplate = () => (`<div class="films-list__container films-list--top-rated">
</div>`);

export default class TopRatedListView extends Abstract {

  getTemplate() {
    return createTopRatedListTemplate();
  }
}
