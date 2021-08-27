import FilmCardView from '../view/film-card-view.js';
import PopupView from '../view/popup-view.js';
import {remove, render, renderPosition} from '../utils/render.js';

export default class FilmCardPresenter {

  constructor(filmContainer,film) {
    this._filmContainer = filmContainer;
    this._filmCard = film;
    this._popupComponent = new PopupView();

  }

  init(filmContainer, film) {

    this._renderFilmCard(filmContainer, film);

  }

  _renderFilmCard(filmContainer, film){

    this._filmCardComponent = new FilmCardView(film);

    this._filmCardComponent.setClickHandler(()=>{
      this._renderPopup(film);
    });
    render(filmContainer, this._filmCardComponent, renderPosition.beforeEnd);
  }

  _renderPopup(film){

    const popupComponent = new PopupView(film);

    this._footerContainer = document.querySelector('.footer');

    document.querySelector('body').classList.add('hide-overflow');

    this._footerContainer.after(popupComponent.getElement());

    const onEscKeyDown = (evt) => {

      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        document.body.classList.remove('hide-overflow');
        remove(popupComponent);
        document.removeEventListener('keydown', onEscKeyDown);
      }

    };

    popupComponent.setClickHandler(()=>{
      document.body.classList.remove('hide-overflow');
      remove(popupComponent);
    });
    document.addEventListener('keydown', onEscKeyDown);
  }

}
