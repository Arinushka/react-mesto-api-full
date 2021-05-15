class Api {
  constructor(baseUrl, contentType) {
    this.baseUrl = baseUrl;
    this.contentType = contentType;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }
  getInitialCards(token) {
    return fetch(`${this.baseUrl}/cards`, {
      headers:{
        authorization: 'Bearer ' + token,
        'Content-Type': this.contentType,
      }
    })
      .then(this._checkResponse)
  }

  getUserInfo(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers:{
        authorization: 'Bearer ' + token,
        'Content-Type': this.contentType,
      }
    })
      .then(this._checkResponse)
  }

  setUserInfo(newName, newAbout) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: newName,
        about: newAbout
      })
    })
      .then(this._checkResponse)
  }

  addCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })

    })
      .then(this._checkResponse)

  }
  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,

    })
      .then(this._checkResponse)
  }
  updateAvatarImage(imageUrl) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: imageUrl
      })
    })
      .then(this._checkResponse)
  }
  addLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this.headers,

    })
      .then(this._checkResponse)
  }
  removeLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this.headers,

    })
      .then(this._checkResponse)
  }
  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.addLike(cardId)
    } else {
      return this.removeLike(cardId)
    }
  }
}
export const api = new Api(
 'http://api.hakuna.matata.nomoredomains.monster',
 'application/json'
);