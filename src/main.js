import {AUTHORIZATION, DATA_TYPE, END_POINT, FILTER_TYPE, UPDATE_TYPE} from './consts.js';
import {remove, render, renderPosition} from './utils/render.js';
import FilmsListPresenter from './presenter/films-list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilmsModel from './model/film-cards-model.js';
import FilterModel from './model/filter-model.js';
import StatisticsView from './view/stats-view.js';
import Api from './api.js';
import FooterView from './view/footer-view.js';
import MainView from './view/main-view.js';
import HeaderView from './view/header-view.js';

const api = new Api(END_POINT, AUTHORIZATION, DATA_TYPE.MOVIES);

const filmsModel = new FilmsModel();

const filterModel = new FilterModel();

const header = document.querySelector('header');
const footer = document.querySelector('footer');

const mainContainerComponent = new MainView();

const filmsListPresenter = new FilmsListPresenter(mainContainerComponent, footer, filmsModel, filterModel, api);

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

render(header, mainContainerComponent, renderPosition.afterEnd); //секция main


filmsListPresenter.init();

api.getData()
  .then((films) => {
    filmsModel.setFilms(UPDATE_TYPE.init,films);
    filterPresenter.init();
    render(header, new HeaderView(filmsModel.getFilms()), renderPosition.beforeEnd); //секция header
    render(footer, new FooterView(filmsModel.getFilms()), renderPosition.beforeEnd); //секция footer
  })
  .catch(() =>{
    filmsModel.setFilms(UPDATE_TYPE.init,[]);
    render(header, new HeaderView(filmsModel.getFilms()), renderPosition.beforeEnd); //секция header
    render(footer, new FooterView(filmsModel.getFilms()), renderPosition.beforeEnd); //секция footer
  }  );
