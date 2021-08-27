import AbstractView from './abstract.js';

export const createMainBoardTemplate = () => (`<main class="main">
</main>`);

export default class MainBoardView extends AbstractView {

  getTemplate() {
    return createMainBoardTemplate();
  }
}
