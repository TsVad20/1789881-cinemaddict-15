import {DATA_TYPE, FILTER_TYPE} from './consts.js';
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

//const filmCards = new Array(FILM_CARD_COUNT).fill().map(generateFilmCard);


const api = new Api(END_POINT, AUTHORIZATION, DATA_TYPE.MOVIES);

const filmsModel = new FilmsModel();

api.getData().then((films) => {
  console.log(films);
  filmsModel.setFilms(films);
});


const filterModel = new FilterModel();

const body = document.querySelector('body');

const headerContainerComponent = new HeaderContainerView(filmsModel.getFilms());
const mainContainerComponent = new MainContainerView();
const footerContainerComponent = new FooterContainerView(filmsModel.getFilms());

const filmsListPresenter = new FilmsListPresenter(mainContainerComponent.getElement(), footerContainerComponent.getElement(), filmsModel, filterModel);

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
render(mainContainerComponent, footerContainerComponent, renderPosition.afterEnd); //секция footer

filterPresenter.init();
filmsListPresenter.init();

