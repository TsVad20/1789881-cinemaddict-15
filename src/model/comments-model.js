import AbstractObserver from '../utils/abstract-observer.js';

export default class CommentsModel extends AbstractObserver {
  constructor(films) {
    super();
    this._films = films;
    this._comments = films.slice().map((film) => film.filmComments);
  }

  setComments(films) {
    this._comments = films.slice().map((film) => film.filmComments);
  }

  getData() {
    return this._comments;
  }

  addComment(updateType, update, innerUpdate) {
    const index = this._films.findIndex((film) => film.filmId === update.filmId);
    this._comments[index] = [...this._comments[index], innerUpdate];
    update.filmComments = this._comments[index];
    this._films[index] = update;
    this._notify(updateType, update);
  }

  deleteComment(updateType, update, innerUpdate) {
    const index = this._films.findIndex((film) => film.filmId === update.filmId);

    const subIndex = this._comments[index].findIndex((comment) => comment.id === innerUpdate.id);

    if (index === -1 || subIndex === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this._comments[index] = [...this._comments[index].slice(0, subIndex), ...this._comments[index].slice(subIndex + 1)];
    update.filmComments = this._comments[index];
    this._films[index] = update;
    this._notify(updateType, update);
  }

  static adaptToClient(comment) {
    const adaptedComment = {
      id: comment.id,
      author: comment.author,
      emotion: comment.emotion,
      date: comment.date,
      comment: comment.comment,
    };
    return adaptedComment;
  }

  static adaptToServer(comment) {
    const adaptedComment = {
      comment: comment.comment,
      emotion: comment.emotion,
    };
    return adaptedComment;
  }

}
