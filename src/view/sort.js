import AbstractView from './abstract.js';

const createSortTemplate = () => (
  `<ul class="sort">
<li><a href="#" class="sort__button sort__button-default sort__button--active">Sort by default</a></li>
<li><a href="#" class="sort__button sort__button-date">Sort by date</a></li>
<li><a href="#" class="sort__button sort__button-rating">Sort by rating</a></li>
</ul>`
);

export default class SortView extends AbstractView{
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate();
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  /*setSortByDefaultClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.sort__button-default').addEventListener('click', this._clickHandler);
  }

  setSortByDateClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.sort__button-date').addEventListener('click', this._clickHandler);
  }

  setSortByRatingClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.sort__button-rating').addEventListener('click', this._clickHandler);
  }*/

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  }

}
