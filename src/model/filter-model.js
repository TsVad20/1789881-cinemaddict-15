import AbstractObserver from '../utils/abstract-observer.js';
import {FILTER_TYPE} from '../consts.js';


export default class FilterModel extends AbstractObserver {
  constructor() {
    super();
    this._activeFilter = FILTER_TYPE.ALL;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
