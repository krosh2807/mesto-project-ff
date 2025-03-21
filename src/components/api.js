//РАБОТА С СЕРВЕРОМ
const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-34",//ссылка для сервера
  headers: {
    authorization: "253f6dd3-6bb6-448c-947b-857cc4c9e44d",//мой токен
    "Content-Type": "application/json",
  },
};

// обработка ответа с сервера
export function getResponseServer(response) {
  if (response.ok) {
    return response.json();// обработка успешного ответа
  }
  return Promise.reject(`Ошибка: ${response.status}`);
}

//ПОЛЬЗОВАТЕЛИ
// информация о пользователе с сервера
export const profileInfo= () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  })
    .then(getResponseServer)//ошибка
};

// обновление аватара пользователя с сервера
export const updatedProfileAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  })
    .then(getResponseServer)//ошибка
};

// редактирование профиля с сервера
export const  editProfileInfo= (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then(getResponseServer)//ошибка
};


//КАРТОЧКИ
// карточки с сервера
export const takeCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  })
    .then(getResponseServer)//ошибка
};

// добавление новой карточки с сервера
export const addCards= (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then(getResponseServer)//ошибка
};

//удаление карточки с сервера
export function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, { 
    method: "DELETE",
    headers: config.headers,
  }).then(getResponseServer);
}


//подсчет лайков
export const handleAddLikes= (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then(getResponseServer)//ошибка
};

//удаление лайков с карточки
export const handleDeleteLikes= (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(getResponseServer)//ошибка
};
