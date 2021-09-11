import {FILM_CARD_COUNT} from './consts.js';
import {generateFilmCard} from './mock/film-card-mock.js';
import HeaderContainerView from './view/header-container-view.js';
import FooterContainerView from './view/footer-container-view.js';
import {render, renderPosition} from './utils/render.js';
import FilmsListPresenter from './presenter/films-list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import MainContainerView from './view/main-container-view.js';
import FilmsModel from './model/film-cards-model.js';
import FilterModel from './model/filter-model.js';

const filmCards = new Array(FILM_CARD_COUNT).fill().map(generateFilmCard);

const filmsModel = new FilmsModel();

filmsModel.setFilms(filmCards);

const filterModel = new FilterModel();

const body = document.querySelector('body');

const headerContainerComponent = new HeaderContainerView();
const mainContainerComponent = new MainContainerView();
const footerContainerComponent = new FooterContainerView(filmCards);


render(body, headerContainerComponent, renderPosition.afterBegin); //секция header
render(headerContainerComponent, mainContainerComponent, renderPosition.afterEnd); //секция main
render(mainContainerComponent, footerContainerComponent, renderPosition.afterEnd); //секция footer

const filterPresenter = new FilterPresenter(mainContainerComponent.getElement(), filterModel, filmsModel);
const filmsListPresenter = new FilmsListPresenter(mainContainerComponent.getElement(), footerContainerComponent.getElement(), filmsModel, filterModel);


filterPresenter.init();
filmsListPresenter.init();

