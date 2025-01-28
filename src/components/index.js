import { openModal, closeModal, setCloseOnOverlay } from "./modal.js";
import { createCard, deleteCard, handleLike } from "./card.js";
import "/src/pages/index.css";
import { initialCards } from "./cards";

// DOM-элементы
const cardList = document.querySelector(".places__list"); // Карточка
const editProfilePopup = document.querySelector(".popup_type_edit"); // редактирование профиля
const newCardPopup = document.querySelector(".popup_type_new-card"); // Новый попап(карточка)
const imagePopup = document.querySelector(".popup_type_image"); //Изображение попапа
const profileName = document.querySelector(".profile__title"); // Имя на странице
const profileDescription = document.querySelector(".profile__description"); // Описание на странице
const nameInput = editProfilePopup.querySelector(".popup__input_type_name"); // Поле ввода имени
const descriptionInput = editProfilePopup.querySelector(".popup__input_type_description"); // Поле ввода описания
const editProfileForm = editProfilePopup.querySelector(".popup__form"); // Форма в попапе
const editProfileButton = document.querySelector(".profile__edit-button"); // Кнопка редактирования
const addCardButton = document.querySelector(".profile__add-button"); // Кнопка добавления попапа
const newCardForm = newCardPopup.querySelector(".popup__form"); // Новый попап(форма)
const cardNameInput = newCardPopup.querySelector(".popup__input_type_card-name"); // Поле ввода названия
const cardLinkInput = newCardPopup.querySelector(".popup__input_type_url"); // Поле ввода ссылки
const popupImage = imagePopup.querySelector('.popup__image'); //Изображение попапа
const popupCaption = imagePopup.querySelector('.popup__caption'); // Описание попапа

// Кнопки для открытия модальных окон
const cardImages = document.querySelectorAll(".card__image"); // Картинки карточек

// Кнопки для закрытия модальных окон
const closeButtons = document.querySelectorAll(".popup__close");

// Открытие модальных окон
addCardButton.addEventListener("click", () => openModal(newCardPopup)); // "+"

// Закрытие модальных окон (по крестику)
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closeModal(popup));
});

// Закрытие по клику на оверлей
[editProfilePopup, newCardPopup, imagePopup].forEach((popup) => {
  setCloseOnOverlay(popup);
});

// Открытие попапа с заполнением текущих данных
editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(editProfilePopup);
});

// Сохранение данных из формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editProfilePopup);
}

// Добавляем обработчик на форму
editProfileForm.addEventListener("submit", handleProfileFormSubmit);


// Обработчик отправки формы для добавления карточки
function handleNewCardSubmit(evt) {
  evt.preventDefault();

  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  const newCard = createCard(cardData, handleLike, deleteCard, openImagePopup);
  cardList.prepend(newCard);

  closeModal(newCardPopup);
}

// Добавляем обработчик на форму
newCardForm.addEventListener("submit", handleNewCardSubmit);

// Открытие попапа
addCardButton.addEventListener("click", () => {
  newCardForm.reset();
  openModal(newCardPopup);
});

// Функция открытия попапа изображения
export function openImagePopup(imageSrc, imageAlt) {
  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  popupCaption.textContent = imageAlt;

  openModal(imagePopup); // Открываем модальное окно
}

// Отображение карточек на странице
initialCards.forEach((cardData) => {
  const card = createCard(cardData, handleLike, deleteCard, openImagePopup); // Создаём карточку
  cardList.append(card); // Добавляем её в список
});