import {SORT_TYPE} from '../consts.js';
import AbstractView from './abstract.js';


const createSortListTemplate = (currentSortType) => (
  `<ul class="sort">
  <li><a href="#" class="sort__button ${currentSortType === SORT_TYPE.default ? 'sort__button--active' : ''}" data-sort-type="${SORT_TYPE.default}">Sort by default</a></li>
<li><a href="#" class="sort__button ${currentSortType === SORT_TYPE.byDate ? 'sort__button--active' : ''}" data-sort-type="${SORT_TYPE.byDate}">Sort by date</a></li>
<li><a href="#" class="sort__button ${currentSortType === SORT_TYPE.byRating ? 'sort__button--active' : ''}" data-sort-type="${SORT_TYPE.byRating}">Sort by rating</a></li>
</ul>`
);

export default class SortView extends AbstractView{
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortListTemplate(this._currentSortType);
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
