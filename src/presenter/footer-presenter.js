import {UPDATE_TYPE} from '../consts';
import {render, renderPosition} from '../utils/render.js';
import FooterView from '../view/footer-view';
import LoadingView from '../view/loading-view';


export default class FooterPresenter {
  constructor(footerContainer, filmsModel) {
    this._filmsModel = filmsModel;
    this._footerContainer = footerContainer;
    this._footerComponent = null;
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._filmsModel.addObserver(this._handleModelEvent);
    this._isLoading = true;
    this._loadingComponent = new LoadingView();
  }


  init() {
    this._renderFooter();
  }

  _getFilms () {
    return this._filmsModel.getFilms();
  }

  _renderFooter() {
    if (this._isLoading) {
      return;
    }
    const films = this._getFilms();
    this._footerComponent = new FooterView(films);
    render(this._footerContainer, this._footerComponent, renderPosition.beforeEnd);
  }

  _handleModelEvent(updateType) {
    switch (updateType) {
      case UPDATE_TYPE.init:
        this._isLoading = false;
        this._renderFooter();
        break;
      default:
        this._renderFooter();
        break;
    }

  }
}

