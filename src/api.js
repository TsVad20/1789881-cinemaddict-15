import FilmsModel from './model/film-cards-model.js';
const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};

export default class Api {
  constructor(endPoint, authorization, dataType) {
    this._endPoint = endPoint;
    this._authorization = authorization;
    this._dataType = dataType;
  }

  getData() {
    return this._load({url: `${this._dataType}`})
      .then(Api.toJSON)
      .then((films) => films.map(FilmsModel.adaptToClient));
  }

  getComments(filmId) {
    return this._load({url: `comments/${filmId}`})
      .then(Api.toJSON);
  }

  updateData(data) {
    return this._load({
      url: `${this._dataType}/${data.filmId}`,
      method: Method.PUT,
      body: JSON.stringify(FilmsModel.adaptToServer(data)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON)
      .then(FilmsModel.adaptToClient);
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) {
    headers.append('Authorization', this._authorization);

    return fetch(
      `${this._endPoint}/${url}`,
      {method, body, headers},
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN ||
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
