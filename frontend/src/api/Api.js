class Api {
  constructor(options) {
    this._url = options.url;
    this._authorization = options.headers.authorization;
    this._contentType = options.headers["Content-type"];
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  addNewCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  editProfile({ name, description }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        name: name,
        about: description,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  editAvatar({ link }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        avatar: `${link}`,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}

export const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-15",
  headers: {
    authorization: "ae4fa4cf-0e81-45c0-b4da-16ce9ece8f68",
    "Content-type": "application/json",
  },
});
