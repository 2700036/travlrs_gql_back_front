class TravlrsApi {
  constructor({ address }) {
    this._address = address;
  }

  getAppInfo() {
    return Promise.all([this.getCardList(), this.getUserInfo()]);
  }

  getCardList() {
    return fetch(`${this._address}/cards`, {
      headers: {
        authorization: localStorage.getItem('jwt'),
      },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
      .then((res) => res.reverse())
      .catch((err) => console.log(`Загрузка карточек: ${err}`));
  }

  getUsers() {
    return fetch(`${this._address}/users`, {
      headers: {
        authorization: localStorage.getItem('jwt'),
      },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
      .catch((err) => console.log(`Загрузка друзей: ${err}`));
  }

  addCard({ name, link }) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: {
        authorization: localStorage.getItem('jwt'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
      .then((res) => res[0])
      .catch((err) => {
        console.log(`Добавление карточки: ${err}`);
        throw err;
      });
  }

  removeCard(cardID) {
    return fetch(`${this._address}/cards/${cardID}`, {
      method: 'DELETE',
      headers: {
        authorization: localStorage.getItem('jwt'),
      },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
      .catch((err) => console.log(`При удалении карточки: ${err}`));
  }

  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      headers: {
        authorization: localStorage.getItem('jwt'),
      },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
      .catch((err) => console.log(`Загрузка информации о пользователе: ${err}`));
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: localStorage.getItem('jwt'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
      .catch((err) => console.log(`При обновлении информации о пользователе: ${err}`));
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: localStorage.getItem('jwt'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar,
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
      .catch((err) => console.log(`При изменении аватара пользователя: ${err}`));
  }

  changeLikeCardStatus(cardID, like) {
    return fetch(`${this._address}/cards/likes/${cardID}`, {
      method: like ? 'PUT' : 'DELETE',
      headers: {
        authorization: localStorage.getItem('jwt'),
        'Content-Type': 'application/json',
      },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
      .then((res) => res[0])
      .catch((err) => console.log(`Изменения статуса лайка: ${err}`));
  }

  register (email, password, name) {    
    return fetch(`${this._address}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password, name})
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  };
  authorize (email, password){    
    return fetch(`${this._address}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then((response) => response.json())
      .then((data) => {           
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return data;
        } else {
          return data;
        }
      })
      .catch((err) => {
        console.log(err);
        
      });
  };
  checkToken (token){
    return fetch(`${this._address}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then(res=>{
        if(!res.message){
          return res
        };
        throw res.message 
      })
      .catch((err)=>{
        console.log(err);
        throw err
      })
  };
}

const travlrsApi = new TravlrsApi({
  address: 'https://travlrsapi.herokuapp.com',
});

export default travlrsApi;
