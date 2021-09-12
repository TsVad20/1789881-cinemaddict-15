import MenuContainerView from '../view/menu-container-view.js';
import {FILTER_TYPE,  UPDATE_TYPE} from '../consts.js';
import {render, remove, replace, renderPosition} from '../utils/render.js';
import {filter} from '../utils/filter.js';

export default class FilterPresenter {
  constructor(filterContainer, filterModel, filmsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new MenuContainerView(filters, this._filterModel.getFilter());
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, renderPosition.afterBegin);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }

    this._filterModel.setFilter(UPDATE_TYPE.major, filterType);
  }

  _getFilters() {
    const films = this._filmsModel.getFilms();

    return [
      {
        type: FILTER_TYPE.ALL,
        name: 'All movies',
        count: 0,
      },
      {
        type: FILTER_TYPE.WATCHLIST,
        name: 'Watchlist',
        count: filter[FILTER_TYPE.WATCHLIST](films).length,
      },
      {
        type: FILTER_TYPE.HISTORY,
        name: 'History',
        count: filter[FILTER_TYPE.HISTORY](films).length,
      },
      {
        type: FILTER_TYPE.FAVORITES,
        name: 'Favorites',
        count: filter[FILTER_TYPE.FAVORITES](films).length,
      },
    ];
  }
}
