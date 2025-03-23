import "../pages/index.css";
import { createCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import { profileInfo, takeCards, editProfileInfo, addCards, updatedProfileAvatar, deleteCard, handleAddLikes } from "./api.js";

// DOM-элементы
const cardList = document.querySelector(".places__list");
const editProfileButton = document.querySelector(".profile__edit-button");
const addProfileButton = document.querySelector(".profile__add-button");
const editProfilePopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const editPopupForm = editProfilePopup.querySelector(".popup__form");
const nameInput = editPopupForm.querySelector(".popup__input_type_name");
const descriptionInput = editPopupForm.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const newCardForm = newCardPopup.querySelector(".popup__form");
const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url");
const profileImage = document.querySelector(".profile__image");
const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
const formEditAvatar = popupEditAvatar.querySelector(".popup__form");
const inputAvatarLink = formEditAvatar.querySelector("#input_avatar-link");
const popupImage = document.querySelector(".popup_type_image");
const popupImageContent = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");
let userId;

// Конфигурация для валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Анимация и закрытие попапов
const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");

  const buttonClosePopup = popup.querySelector(".popup__close");
  if (buttonClosePopup) {
    buttonClosePopup.addEventListener("click", () => closeModal(popup));
  }
  
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
});

// Включение валидации
enableValidation(validationConfig);

// Получение данных профиля и карточек
Promise.all([profileInfo(), takeCards()])
  .then(([profileData, cards]) => {
    profileName.textContent = profileData.name;
    profileDescription.textContent = profileData.about;
    profileImage.style.backgroundImage = `url(${profileData.avatar})`;
    userId = profileData._id;

    cards.forEach((item) => {
      const cardElement = createCard(item, openImagePopup, userId, deleteCard, handleAddLikes);
      cardList.append(cardElement);
    });
  })
  .catch((err) => {
    console.log("Ошибка в Promise.all", err);
  });

// Функция отображения попапа с изображением
function openImagePopup(item) {
  popupImageContent.src = item.link;
  popupImageContent.alt = item.name;
  popupImageCaption.textContent = item.name;

  openModal(popupImage);
}

// Функция отображения или скрытия состояния загрузки
function renderLoading(button, isLoading, text = "Сохранить") {
  button.textContent = isLoading ? "Сохранение..." : text;
  button.disabled = isLoading;
}

// Функция очистки формы перед открытием попапа
function resetForm(form) {
  form.reset();
  clearValidation(form, validationConfig);
}

// Обработчик открытия попапа для добавления карточки
addProfileButton.addEventListener("click", () => {
  resetForm(newCardForm);
  openModal(newCardPopup);
});

// Обработчик открытия попапа для редактирования профиля
editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  clearValidation(editPopupForm, validationConfig);
  openModal(editProfilePopup);
});

// Обработчик отправки формы редактирования профиля
function submitProfileForm(evt) {
  evt.preventDefault();

  const submitButton = editPopupForm.querySelector(".popup__button");
  renderLoading(submitButton, true);

  editProfileInfo(nameInput.value, descriptionInput.value)
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(editProfilePopup);
    })
    .catch((err) => {
      console.log("Ошибка при обновлении данных профиля:", err);
    })
    .finally(() => {
      renderLoading(submitButton, false);
    });
}

editPopupForm.addEventListener("submit", submitProfileForm);

// Обработчик клика для изменения аватара
profileImage.addEventListener("click", () => {
  resetForm(formEditAvatar);
  openModal(popupEditAvatar);
});

// Сохранение/обновление аватара
formEditAvatar.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const submitButton = formEditAvatar.querySelector(".popup__button");
  renderLoading(submitButton, true);

  updatedProfileAvatar(inputAvatarLink.value)
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
      closeModal(popupEditAvatar);
    })
    .catch((err) => {
      console.log("Ошибка обновления аватара:", err);
    })
    .finally(() => {
      renderLoading(submitButton, false);
    });
});

// Функция добавления новой карточки
function submitNewCardForm(evt) {
  evt.preventDefault();

  const submitButton = newCardForm.querySelector(".popup__button");
  renderLoading(submitButton, true);

  addCards(cardNameInput.value, cardLinkInput.value)
    .then((data) => {
      const cardElement = createCard(data, openImagePopup, userId, deleteCard, handleAddLikes);
      cardList.prepend(cardElement);

      newCardForm.reset(); // Очищаем поля формы, но не очищаем ошибки валидации
      closeModal(newCardPopup);
    })
    .catch((err) => {
      console.log("Ошибка добавления карточки:", err);
    })
    .finally(() => {
      renderLoading(submitButton, false);
    });
}

// Отправка данных новой карточки
newCardForm.addEventListener("submit", submitNewCardForm);
