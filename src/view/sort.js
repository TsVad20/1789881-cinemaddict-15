import { createElement } from '../utils.js';

const createSortTemplate = () => (
  `<ul class="sort">
<li><a href="#" class="sort__button sort__button-default sort__button--active">Sort by default</a></li>
<li><a href="#" class="sort__button sort__button-date">Sort by date</a></li>
<li><a href="#" class="sort__button sort__button-rating">Sort by rating</a></li>
</ul>`
);

export default class SortView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSortTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}