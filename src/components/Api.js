import { info } from "autoprefixer";

export default class Api {
  constructor(baseUrl, { headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  };

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(this._checkStatus);
  };

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
      })
      .then(this._checkStatus);
  };

  setProfileInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
      })
      .then(this._checkStatus);
  };

  setCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._checkStatus);
  };

  putLike(item) {
    return fetch(`${this._baseUrl}/cards/${item._id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._checkStatus);
  };

  deleteLike(item) {
    return fetch(`${this._baseUrl}/cards/${item._id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkStatus);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkStatus);
  }
}