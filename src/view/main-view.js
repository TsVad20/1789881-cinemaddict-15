import Abstract from './abstract.js';

export const createMainBoardTemplate = () => (`<main class="main">
</main>`);

export default class MainView extends Abstract {

  getTemplate() {
    return createMainBoardTemplate();
  }
}
