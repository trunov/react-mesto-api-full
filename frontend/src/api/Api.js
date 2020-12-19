const handleOriginalResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

class Api {
  constructor(options) {
    this._url = options.url;
    this._contentType = options.headers["Content-type"];
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": this._contentType,
      },
    }).then(handleOriginalResponse);
  }

  addNewCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": this._contentType,
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(handleOriginalResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": this._contentType,
      },
   }).then(handleOriginalResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": this._contentType,
      },
    }).then(handleOriginalResponse);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": this._contentType,
      },
    }).then(handleOriginalResponse);
  }

  editProfile({ name, description }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": this._contentType,
      },
      body: JSON.stringify({
        name: name,
        about: description,
      }),
    }).then(handleOriginalResponse);
  }

  editAvatar({ link }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": this._contentType,
      },
      body: JSON.stringify({
        avatar: `${link}`,
      }),
    }).then(handleOriginalResponse);
  }
}

export const api = new Api({
  url: `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3001'}`,
  headers: {
    "Content-type": "application/json",
  },
});
