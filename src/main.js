import {DATA_TYPE, FILTER_TYPE, UPDATE_TYPE} from './consts.js';
import HeaderContainerView from './view/header-container-view.js';
import FooterContainerView from './view/footer-container-view.js';
import {remove, render, renderPosition} from './utils/render.js';
import FilmsListPresenter from './presenter/films-list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import MainContainerView from './view/main-container-view.js';
import FilmsModel from './model/film-cards-model.js';
import FilterModel from './model/filter-model.js';
import StatisticsView from './view/stats-view.js';
import Api from './api.js';

const AUTHORIZATION = 'Basic hS3sd4dfSwcl1sa3j';
const END_POINT = 'https://15.ecmascript.pages.academy/cinemaddict';

const api = new Api(END_POINT, AUTHORIZATION, DATA_TYPE.MOVIES);

const filmsModel = new FilmsModel();

const filterModel = new FilterModel();

const body = document.querySelector('body');

const headerContainerComponent = new HeaderContainerView(filmsModel.getFilms());
const mainContainerComponent = new MainContainerView();
//const footerContainerComponent = new FooterContainerView(filmsModel.getFilms());

const filmsListPresenter = new FilmsListPresenter(mainContainerComponent.getElement(), new FooterContainerView(filmsModel.getFilms()).getElement(), filmsModel, filterModel, api);

let statisticsComponent = null;

const handleSiteMenuClick = (target) => {

  if (target === FILTER_TYPE.STATS) {
    if (statisticsComponent!==null) {
      return;
    }
    statisticsComponent = new StatisticsView(filmsModel.getFilms());
    filmsListPresenter.destroy();
    render(mainContainerComponent, statisticsComponent, renderPosition.beforeEnd);
    return;
  }
  filmsListPresenter.init();
  if (statisticsComponent!==null) {
    remove(statisticsComponent);
  }
  statisticsComponent=null;
};

const filterPresenter = new FilterPresenter(mainContainerComponent.getElement(), filterModel, filmsModel, handleSiteMenuClick);

render(body, headerContainerComponent, renderPosition.afterBegin); //секция header
render(headerContainerComponent, mainContainerComponent, renderPosition.afterEnd); //секция main


api.getData()
  .then((films) => {
    filmsModel.setFilms(UPDATE_TYPE.init,films);
    filterPresenter.init();
    filmsListPresenter.init();
    render(mainContainerComponent, new FooterContainerView(filmsModel.getFilms()), renderPosition.afterEnd); //секция footer
  })
  .catch(() =>{
    filmsModel.setFilms(UPDATE_TYPE.init,[]);
  }  );
