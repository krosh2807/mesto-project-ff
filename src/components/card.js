import { handleAddLikes, handleDeleteLikes } from "./api.js";
import { deleteCard, handleAddLike } from "./api.js";

// Функция создания карточек
export function createCard(item, openImagePopup, userId, deleteCard, handleAddLikes) {
  // Создание карточки из шаблона
  const templates = document
    .querySelector("#card-template")
    .content.querySelector(".places__item")
    .cloneNode(true);

  templates.dataset.cardId = item._id; // Передача ID карточки

  // Элементы карточки
  const cardName = templates.querySelector(".card__title");
  const cardImage = templates.querySelector(".card__image");
  const deleteButton = templates.querySelector(".card__delete-button");
  const buttonLike = templates.querySelector(".card__like-button");
  const likeCounter = templates.querySelector(".card_like-counter");

  // Установка данных карточки
  cardName.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  likeCounter.textContent = item.likes.length; // Счетчик лайков

  // Проверка, лайкнута ли карточка текущим пользователем
  if (item.likes.some((like) => like._id === userId)) {
    buttonLike.classList.add("card__like-button_is-active");
  }

  // Обработчик лайка
  buttonLike.addEventListener("click", () => handleLike(item._id, buttonLike, likeCounter));

  // Отображение кнопки удаления только для владельца карточки
  if (item.owner._id !== userId) {
    deleteButton.style.display = "none";
  } else {
    deleteButton.addEventListener("click", () => {
      deleteCard(item._id)
        .then(() => {
          templates.remove(); // Удаляем карточку из DOM после успешного удаления с сервера
        })
        .catch((err) => {
          console.log("Ошибка при удалении карточки:", err);
        });
    });    
  }

  // Обработчик открытия попапа с картинкой
  cardImage.addEventListener("click", () => openImagePopup(item));

  return templates; // Возвращение готовой карточки
}



//функция лайков карточек
export function handleLike(cardId, likeButton, likeCounter) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  if (isLiked) {
    handleDeleteLikes(cardId)
      .then((updatedItem) => {
        likeButton.classList.remove("card__like-button_is-active");
        likeCounter.textContent = updatedItem.likes.length;
      })
      .catch((err) => {
        console.log("Ошибка при добавлении лайка:", err);
      });
  } else {
    handleAddLikes(cardId)
      .then((updatedItem) => {
        likeButton.classList.add("card__like-button_is-active");
        likeCounter.textContent = updatedItem.likes.length;
      })
      .catch((err) => {
        console.log("Ошибка при удалении лайка:", err);
      });
  }
}

//обработчик подсчета лайков/клика
function handleLikeButtonClick(evt) {
  const likeButton = evt.target;
  const cardElement = likeButton.closest('.places__item');
  const likeCounter = cardElement.querySelector('.card_like-counter');
  const cardId = cardElement.dataset.cardId;

  handleLike(cardId, likeButton, likeCounter);
}
