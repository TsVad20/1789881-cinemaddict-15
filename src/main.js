import {FILM_CARD_COUNT} from './consts.js';
import {generateFilmCard} from './mock/film-card-mock.js';
import HeaderContainerView from './view/header-container-view.js';
import FooterContainerView from './view/footer-container-view.js';
import {generateFilter} from './mock/filters-mock.js';
import {render, renderPosition} from './utils/render.js';
import FilmsListPresenter from './presenter/films-list-presenter.js';
import MenuContainerView from './view/menu-container-view.js';
import MainContainerView from './view/main-container-view.js';

const filmCards = new Array(FILM_CARD_COUNT).fill().map(generateFilmCard);
const filters = generateFilter(filmCards);

const body = document.querySelector('body');

const headerContainerComponent = new HeaderContainerView();
const mainContainerComponent = new MainContainerView();
const menuContainerComponent = new MenuContainerView(filters);
const footerContainerComponent = new FooterContainerView(filmCards);


render(body, headerContainerComponent, renderPosition.afterBegin); //секция header
render(headerContainerComponent, mainContainerComponent, renderPosition.afterEnd); //секция main
render(mainContainerComponent, menuContainerComponent, renderPosition.beforeEnd); //секция menu
render(mainContainerComponent, footerContainerComponent, renderPosition.afterEnd); //секция footer

const filmsListPresenter = new FilmsListPresenter(mainContainerComponent.getElement(), footerContainerComponent.getElement());

filmsListPresenter.init(filmCards);
