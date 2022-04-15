class Api {
    constructor({ address}) {
        this._address = address;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    }

    getInitialCards() {
        return fetch(`${this._address}/cards`, {
            headers: {
                "Authorization": getToken()
            }
        })
            .then(this._checkResponse)
    }

    getUserApiInfo() {
        return fetch(`${this._address}/users/me`, {
            headers: {
                "Authorization": getToken()
            }
        })
            .then(this._checkResponse)
    }

    sendUserApiInfo(userName, userActivity) {
        return fetch(`${this._address}/users/me`, {
            method: 'PATCH',
            headers: {
                "Authorization": getToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userName,
                about: userActivity
            })
        })
            .then(this._checkResponse)
    }

    sendCardInfo(cardName, cardLink) {
        return fetch(`${this._address}/cards`, {
            method: 'POST',
            headers: {
                "Authorization": getToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: cardName,
                link: cardLink
            })
        })
            .then(this._checkResponse)
    }

    deleteApiCard(cardId) {
        return fetch(`${this._address}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": getToken()
            }
        })
            .then(this._checkResponse)
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            return fetch(`${this._address}/cards/${cardId}/likes`, {
                method: 'DELETE',
                headers: {
                    "Authorization": getToken()
                }
            })
                .then(this._checkResponse)
        } else {
            return fetch(`${this._address}/cards/${cardId}/likes`, {
                method: 'PUT',
                headers: {
                    "Authorization": getToken(),
                    'Content-Type': 'application/json'
                }
            })
                .then(this._checkResponse)
        }
    }

    updateAvatar(link) {
        return fetch(`${this._address}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                "Authorization": getToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: link
            })
        })
            .then(this._checkResponse)
    }
}

const getToken = () => {
    return `Bearer ${localStorage.getItem('jwt')}`;
}

const apiClass = new Api({
    address: 'http://api.dankuzmenko.mesto.nomoredomains.work'
});

export default apiClass;