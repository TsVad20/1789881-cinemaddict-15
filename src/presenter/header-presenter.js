import {UPDATE_TYPE} from '../consts';
import {remove, render, renderPosition} from '../utils/render.js';
import HeaderView from '../view/header-view.js';
import LoadingView from '../view/loading-view';


export default class HeaderPresenter {
  constructor(headerContainer, filmsModel) {
    this._filmsModel = filmsModel;
    this._headerContainer = headerContainer;
    this._headerComponent = null;
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._filmsModel.addObserver(this._handleModelEvent);
    this._isLoading = true;
    this._loadingComponent = new LoadingView();
  }


  init() {
    this._renderHeader();
  }

  _getFilms () {
    return this._filmsModel.getFilms();
  }

  _renderHeader() {
    if (this._isLoading) {
      return;
    }
    const films = this._getFilms();
    this._headerComponent = new HeaderView(films);
    render(this._headerContainer, this._headerComponent, renderPosition.beforeEnd); //секция header
  }

  _handleModelEvent(updateType) {
    switch (updateType) {
      case UPDATE_TYPE.init:
        remove(this._headerComponent);
        this._isLoading = false;
        this._renderHeader();
        break;
      default:
        remove(this._headerComponent);
        this._renderHeader();
        break;
    }

  }
}

