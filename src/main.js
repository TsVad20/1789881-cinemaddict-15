import {FILM_CARD_COUNT, FILTER_TYPE} from './consts.js';
import {generateFilmCard} from './mock/film-card-mock.js';
import HeaderContainerView from './view/header-container-view.js';
import FooterContainerView from './view/footer-container-view.js';
import {remove, render, renderPosition} from './utils/render.js';
import FilmsListPresenter from './presenter/films-list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import MainContainerView from './view/main-container-view.js';
import FilmsModel from './model/film-cards-model.js';
import FilterModel from './model/filter-model.js';
import StatisticsView from './view/stats-view.js';

const filmCards = new Array(FILM_CARD_COUNT).fill().map(generateFilmCard);

const filmsModel = new FilmsModel();

filmsModel.setFilms(filmCards);

const filterModel = new FilterModel();

const body = document.querySelector('body');

const headerContainerComponent = new HeaderContainerView(filmsModel.getFilms());
const mainContainerComponent = new MainContainerView();
const footerContainerComponent = new FooterContainerView(filmCards);

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

