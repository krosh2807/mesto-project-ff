import "../pages/index.css";
import { createCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import { profileInfo, takeCards, editProfileInfo, addCards, updatedProfileAvatar, deleteCard, handleAddLikes } from "./api.js";

// DOM-элементы
const cardList = document.querySelector(".places__list");// карточка
const editProfileButton = document.querySelector(".profile__edit-button");// кнопка реадктирования 
const addProfileButton = document.querySelector(".profile__add-button");// кнопка добавления попапа
const editProfilePopup = document.querySelector(".popup_type_edit");// редактирование профиля
const newCardPopup= document.querySelector(".popup_type_new-card"); // новый попап(карточка)
const editPopupForm= editProfilePopup.querySelector(".popup__form"); // форма в попапе
const nameInput = editPopupForm.querySelector(".popup__input_type_name"); // поле ввода имени
const descriptionInput= editPopupForm.querySelector(".popup__input_type_description"); // поле ввода описания
const profileName = document.querySelector(".profile__title"); // имя на странице
const profileDescription= document.querySelector(".profile__description"); // описание профиля
const newCardForm= newCardPopup.querySelector(".popup__form"); // форма попапа
const cardNameInput= newCardForm.querySelector(".popup__input_type_card-name"); // поле ввода названия места
const cardLinkInput= newCardForm.querySelector(".popup__input_type_url"); // поле ввода ссылки на картинку
const profileImage = document.querySelector(".profile__image"); // картинка профиля
const popupEditAvatar = document.querySelector(".popup_type_edit-avatar"); // редактирование аватара
const formEditAvatar = popupEditAvatar.querySelector(".popup__form"); // форма редактирования аватара
const inputAvatarLink = formEditAvatar.querySelector("#input_avatar-link"); // поле ввода ссылки аватара
const popupImage = document.querySelector(".popup_type_image"); // 
const popupImageContent = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");
let userId; // переменная для получения пользователя с сервера

//константы для валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//анимации попапа и закрытие его
const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');

  const buttonClosePopup = popup.querySelector('.popup__close');
  if (buttonClosePopup) {
    buttonClosePopup.addEventListener('click', () => closeModal(popup));
  }
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closeModal(popup)
    }
  });
});

//включение валидации
enableValidation(validationConfig);

Promise.all([profileInfo(), takeCards()])
  .then(([profileData, cards]) => {

    profileName.textContent = profileData.name;
    profileDescription.textContent = profileData.about;
    profileImage.style.backgroundImage = `url(${profileData.avatar})`;
    userId = profileData._id;

    cards.forEach((item) => {
      const templates = createCard(item, openImagePopup, userId, deleteCard, handleAddLikes);
      cardList.append(templates);
    });
  })
  .catch((err) => {
    console.log("Ошибка в Promise.all", err);
  });

// функция отображения попапа
function openImagePopup(item) {
  popupImageContent.src = item.link;
  popupImageContent.alt = item.name;
  popupImageCaption.textContent = item.name;

  openModal(popupImage);
}

// Функция для отображения или скрытия состояния загрузки
function renderLoading(button, isLoading, text = 'Сохранить') {
  if (isLoading) {
    button.textContent = 'Сохранение...'; // Меняем текст кнопки на время загрузки
    button.disabled = true; // Отключаем кнопку, чтобы предотвратить повторные клики
  } else {
    button.textContent = text; // Восстанавливаем оригинальный текст
    button.disabled = false; // Включаем кнопку обратно
  }
}

function submitProfileForm(evt) {
  evt.preventDefault();

  const submitButton = editPopupForm.querySelector(".popup__button");

  // Сохраняем оригинальный текст кнопки в data-атрибут, если он ещё не сохранён
  if (!submitButton.dataset.defaultText) {
    submitButton.dataset.defaultText = submitButton.textContent;
  }

  renderLoading(submitButton, true); // Передаём сначала кнопку, потом флаг загрузки

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
      renderLoading(submitButton, false); // Передаём сначала кнопку, потом флаг загрузки
    });
}

// Очищаем форму, убираем ошибки и старые значения
function resetForm(form) {
  const inputs = form.querySelectorAll("input"); // Находим все инпуты
  const errorMessages = form.querySelectorAll(".error"); // Если есть элементы с ошибками, их тоже очищаем

  // Сброс значений инпутов
  inputs.forEach(input => {
    input.value = '';
    input.classList.remove("input_error"); // Убираем классы ошибок
  });

  // Убираем текст ошибок
  errorMessages.forEach(error => {
    error.textContent = '';
  });
}

// Обработчик открытия попапа
addProfileButton.addEventListener("click", () => {
  openModal(newCardPopup); // Открываем попап
  resetForm(newCardPopup); // Сбрасываем старые значения и ошибки
});

// Обработчик отправки формы
editPopupForm.addEventListener("submit", submitProfileForm);


// обработчик очистки формы попапа
editProfileButton.addEventListener("click", () => {
  openModal(
    editProfilePopup,
    profileName,
    profileDescription,
    nameInput,
    descriptionInput
  );
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  clearValidation(editPopupForm, validationConfig);

  openModal(editProfilePopup);
});

// обработчик клика для аватара
profileImage.addEventListener("click", () => {
  openModal(popupEditAvatar);
});

// сохранение/обновление аватара
formEditAvatar.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const avatarLink = inputAvatarLink.value;
  const submitButton = formEditAvatar.querySelector(".popup__button");
  const submitButtonText = submitButton.textContent;

  submitButton.textContent = "Сохранение...";

  updatedProfileAvatar(avatarLink)
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;

      closeModal(popupEditAvatar);
    })
    .catch((err) => {
      console.log("Ошибка обновления аватара:", err);
    })
    .finally(() => {
      submitButton.textContent = submitButtonText;
    });
});

//функция создания карточки
function submitNewCardForm(evt) {
  evt.preventDefault();

  const submitButton = editPopupForm.querySelector(".popup__button");
  const submitButtonText = submitButton.textContent;

  submitButton.textContent = "Сохранение...";

  addCards(cardNameInput.value, cardLinkInput.value)
    .then((data) => {
      const cardElement = createCard(data, openImagePopup, userId, deleteCard, handleAddLikes);
      cardList.prepend(cardElement);

      newCardForm.reset();
      clearValidation(newCardForm, validationConfig);
      closeModal(newCardPopup);
    })
    .catch((err) => {
      console.log("Ошибка добавления карточки:", err);
    })
    .finally(() => {
      submitButton.textContent = submitButtonText;
    });
}

//отправка данных 
newCardForm.addEventListener("submit", submitNewCardForm);