import AbstractView from './abstract.js';

export default class SmartView extends AbstractView {
  constructor() {
    super();
    this._data = {};
  }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }
    this._data = Object.assign({},this._data,update);

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();
    const newElement = this.getElement();
    const currentScroll = prevElement.scrollTop;
    parent.replaceChild(newElement, prevElement);
    newElement.scrollTop = currentScroll;
    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }
}
