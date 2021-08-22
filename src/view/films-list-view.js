import AbstractView from './abstract.js';

export const createFilmsListTemplate = () => (`<section class="films">
<section class="films-list">
  <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
  <div class="films-list__container films-list--main"></div>
</section>
<section class="films-list films-list--extra">
  <h2 class="films-list__title">Top rated</h2>
  <div class="films-list__container films-list--top-rated"></div>
</section>
<section class="films-list films-list--extra">
  <h2 class="films-list__title">Most commented</h2>
  <div class="films-list__container films-list--most-commented"></div>
</section>
</section>`);

export default class FilmsListView extends AbstractView {

  getTemplate() {
    return createFilmsListTemplate();
  }
}
