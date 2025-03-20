import { handleAddLikes, handleDeleteLikes } from "./api.js";
import { deleteCard } from "./api.js";

//функция создания карточек
export function createCard(item, openImagePopup, userId) {
  //константы для создания карточек из "массива"
  const templates = document
    .querySelector("#card-template")
    .content.querySelector(".places__item")
    .cloneNode(true);

  templates.dataset.cardId = item._id;//передача ID карточек

  //константы для карточек
  const cardName = templates.querySelector(".card__title");
  const cardImage = templates.querySelector(".card__image");
  const deleteButton = templates.querySelector(".card__delete-button");
  const buttonLike = templates.querySelector(".card__like-button");
  const likeCounter = templates.querySelector(".card_like-counter");

  //вставка инфы для карточек
  cardName.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  likeCounter.textContent = item.likes.length;//счетчик лайков

  if (item.likes.some((like) => like._id === userId)) {
    buttonLike.classList.add("card__like-button_is-active");//поставили лайк
  }

  buttonLike.addEventListener("click", handleLikeButtonClick);

  if (item.owner._id !== userId) {
    deleteButton.style.display = "none";
  } // обработчик кнопки удаления только пользователям чья карточка

  //кнопка удаления карточки
  deleteButton.addEventListener("click", () => {
    deleteCard(item._id)
      .then(() => {
        templates.remove();
      })
      .catch((err) => {
        console.log("Ошибка при удалении карточки:", err);
      });
  });

  cardImage.addEventListener("click", () => openImagePopup(item)); //картинка карточки

  return templates;//"возвращение" темплейта карточки на страницу
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
