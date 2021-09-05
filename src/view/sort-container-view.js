import {SORT_TYPE} from '../consts.js';
import AbstractView from './abstract.js';


const createSortListTemplate = () => (
  `<ul class="sort">
<li><a href="#" class="sort__button sort__button-default sort__button--active" data-sort-type="${SORT_TYPE.default}">Sort by default</a></li>
<li><a href="#" class="sort__button sort__button-date" data-sort-type="${SORT_TYPE.byDate}">Sort by date</a></li>
<li><a href="#" class="sort__button sort__button-rating" data-sort-type="${SORT_TYPE.byRating}">Sort by rating</a></li>
</ul>`
);

export default class SortListView extends AbstractView{
  constructor() {
    super();
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortListTemplate();
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}
