import AbstractView from './abstract.js';

export const createMainBoardTemplate = () => (`<main class="main">
</main>`);

export default class MainView extends AbstractView {

  getTemplate() {
    return createMainBoardTemplate();
  }
}
