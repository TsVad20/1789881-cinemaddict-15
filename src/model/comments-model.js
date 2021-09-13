import AbstractObserver from '../utils/abstract-observer.js';

export default class CommentsModel extends AbstractObserver {
  constructor(films) {
    super();
    this._films = films;
    this._data = films.slice().map((film) => film.filmComments);
  }

  setData(films) {
    this._data = films.slice().map((film) => film.filmComments);
  }

  getData() {
    return this._data;
  }

  addComment(updateType, update, innerUpdate) {
    const index = this._films.findIndex((film) => film.filmId === update.filmId);
    this._data[index] = [...this._data[index], innerUpdate];
    update.filmComments = this._data[index];
    this._films[index] = update;
    this._notify(updateType, update);
  }

  deleteComment(updateType, update, innerUpdate) {
    const index = this._films.findIndex((film) => film.filmId === update.filmId);

    const subIndex = this._data[index].findIndex((comment) => comment.commentId === innerUpdate.commentId);

    if (index === -1 || subIndex === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this._data[index] = [...this._data[index].slice(0, subIndex), ...this._data[index].slice(subIndex + 1)];
    update.filmComments = this._data[index];
    this._films[index] = update;
    this._notify(updateType, update);
  }
}
