import {
  generateFilter
} from '../mock/filters.js';

export const createMainMenuTemplate = (films) => {
  const filters = generateFilter(films);
  return `<nav class="main-navigation">
<div class="main-navigation__items">
  <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
  <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${filters[0].count}</span></a>
  <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${filters[1].count}</span></a>
  <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${filters[2].count}</span></a>
</div>
<a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};