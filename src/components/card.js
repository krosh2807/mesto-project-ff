import { initialCards } from "./cards";
import { openModal } from "./modal";

// Функция создания карточки
export function createCard(cardData, handleLike) {
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
  
    // Обработчик удаления карточки
    deleteButton.addEventListener('click', () => {
      cardElement.remove();
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

  // Функция открытия попапа изображения
export function openImagePopup(imageSrc, imageAlt) {
    const imagePopup = document.querySelector('.popup_type_image');
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupCaption = imagePopup.querySelector('.popup__caption');
  
    popupImage.src = imageSrc;
    popupImage.alt = imageAlt;
    popupCaption.textContent = imageAlt;
  
    openModal(imagePopup);
  }

// Функция удаления карточки
export function deleteCard(cardElement){
    cardElement.remove();
 }
