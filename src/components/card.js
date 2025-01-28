export function createCard(cardData, handleLike, deleteCard, openImagePopup) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  // Установка данных карточки
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Обработчик удаления карточки (используем переданную функцию)
  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });

  // Обработчик лайка (вызывается переданный callback)
  likeButton.addEventListener('click', () => {
    handleLike(likeButton);
  });

  // Обработчик открытия попапа изображения
  cardImage.addEventListener('click', () => {
    openImagePopup(cardData.link, cardData.name);
  });

  return cardElement;
}

// Функция удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}

// Функция лайка
export function handleLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}