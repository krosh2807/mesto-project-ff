/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/card.js":
/*!********************************!*\
  !*** ./src/components/card.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createCard: () => (/* binding */ createCard),\n/* harmony export */   deleteCard: () => (/* binding */ deleteCard),\n/* harmony export */   handleLike: () => (/* binding */ handleLike)\n/* harmony export */ });\nfunction createCard(cardData, handleLike, deleteCard, openImagePopup) {\n  var cardTemplate = document.querySelector('#card-template').content;\n  var cardElement = cardTemplate.querySelector('.card').cloneNode(true);\n  var cardImage = cardElement.querySelector('.card__image');\n  var cardTitle = cardElement.querySelector('.card__title');\n  var deleteButton = cardElement.querySelector('.card__delete-button');\n  var likeButton = cardElement.querySelector('.card__like-button');\n\n  // Установка данных карточки\n  cardImage.src = cardData.link;\n  cardImage.alt = cardData.name;\n  cardTitle.textContent = cardData.name;\n\n  // Обработчик удаления карточки (используем переданную функцию)\n  deleteButton.addEventListener('click', function () {\n    deleteCard(cardElement);\n  });\n\n  // Обработчик лайка (вызывается переданный callback)\n  likeButton.addEventListener('click', function () {\n    handleLike(likeButton);\n  });\n\n  // Обработчик открытия попапа изображения\n  cardImage.addEventListener('click', function () {\n    openImagePopup(cardData.link, cardData.name);\n  });\n  return cardElement;\n}\n\n// Функция удаления карточки\nfunction deleteCard(cardElement) {\n  cardElement.remove();\n}\n\n// Функция лайка\nfunction handleLike(likeButton) {\n  likeButton.classList.toggle(\"card__like-button_is-active\");\n}\n\n//# sourceURL=webpack://yandex/./src/components/card.js?");

/***/ }),

/***/ "./src/components/cards.js":
/*!*********************************!*\
  !*** ./src/components/cards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initialCards: () => (/* binding */ initialCards)\n/* harmony export */ });\n\nvar initialCards = [{\n  name: \"Архыз\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg\"\n}, {\n  name: \"Челябинская область\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg\"\n}, {\n  name: \"Иваново\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg\"\n}, {\n  name: \"Камчатка\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg\"\n}, {\n  name: \"Холмогорский район\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg\"\n}, {\n  name: \"Байкал\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg\"\n}];\n\n//# sourceURL=webpack://yandex/./src/components/cards.js?");

/***/ }),

/***/ "./src/components/index.js":
/*!*********************************!*\
  !*** ./src/components/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   openImagePopup: () => (/* binding */ openImagePopup)\n/* harmony export */ });\n/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal.js */ \"./src/components/modal.js\");\n/* harmony import */ var _card_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./card.js */ \"./src/components/card.js\");\n/* harmony import */ var _src_pages_index_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../../src/pages/index.css */ \"./src/pages/index.css\");\n/* harmony import */ var _cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cards */ \"./src/components/cards.js\");\n/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./validate.js */ \"./src/components/validate.js\");\n\n\n\n\n\n\n// DOM-элементы\nvar cardList = document.querySelector(\".places__list\"); // Карточка\nvar editProfilePopup = document.querySelector(\".popup_type_edit\"); // редактирование профиля\nvar newCardPopup = document.querySelector(\".popup_type_new-card\"); // Новый попап(карточка)\nvar imagePopup = document.querySelector(\".popup_type_image\"); //Изображение попапа\nvar profileName = document.querySelector(\".profile__title\"); // Имя на странице\nvar profileDescription = document.querySelector(\".profile__description\"); // Описание на странице\nvar nameInput = editProfilePopup.querySelector(\".popup__input_type_name\"); // Поле ввода имени\nvar descriptionInput = editProfilePopup.querySelector(\".popup__input_type_description\"); // Поле ввода описания\nvar editProfileForm = editProfilePopup.querySelector(\".popup__form\"); // Форма в попапе\nvar editProfileButton = document.querySelector(\".profile__edit-button\"); // Кнопка редактирования\nvar addCardButton = document.querySelector(\".profile__add-button\"); // Кнопка добавления попапа\nvar newCardForm = newCardPopup.querySelector(\".popup__form\"); // Новый попап(форма)\nvar cardNameInput = newCardPopup.querySelector(\".popup__input_type_card-name\"); // Поле ввода названия\nvar cardLinkInput = newCardPopup.querySelector(\".popup__input_type_url\"); // Поле ввода ссылки\nvar popupImage = imagePopup.querySelector('.popup__image'); //Изображение попапа\nvar popupCaption = imagePopup.querySelector('.popup__caption'); // Описание попапа\n\n// Кнопки для открытия модальных окон\nvar cardImages = document.querySelectorAll(\".card__image\"); // Картинки карточек\n\n// Кнопки для закрытия модальных окон\nvar closeButtons = document.querySelectorAll(\".popup__close\");\n\n// Открытие модальных окон\naddCardButton.addEventListener(\"click\", function () {\n  return (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.openModal)(newCardPopup);\n}); // \"+\"\n\n// Закрытие модальных окон (по крестику)\ncloseButtons.forEach(function (button) {\n  var popup = button.closest(\".popup\");\n  button.addEventListener(\"click\", function () {\n    return (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.closeModal)(popup);\n  });\n});\n\n// Закрытие по клику на оверлей\n[editProfilePopup, newCardPopup, imagePopup].forEach(function (popup) {\n  (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.setCloseOnOverlay)(popup);\n});\n\n// Открытие попапа с заполнением текущих данных\neditProfileButton.addEventListener(\"click\", function () {\n  nameInput.value = profileName.textContent;\n  descriptionInput.value = profileDescription.textContent;\n  (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.openModal)(editProfilePopup);\n});\n\n// Сохранение данных из формы\nfunction handleProfileFormSubmit(evt) {\n  evt.preventDefault();\n  profileName.textContent = nameInput.value;\n  profileDescription.textContent = descriptionInput.value;\n  (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.closeModal)(editProfilePopup);\n}\n\n// Добавляем обработчик на форму\neditProfileForm.addEventListener(\"submit\", handleProfileFormSubmit);\n\n// Обработчик отправки формы для добавления карточки\nfunction handleNewCardSubmit(evt) {\n  evt.preventDefault();\n  var cardData = {\n    name: cardNameInput.value,\n    link: cardLinkInput.value\n  };\n  var newCard = (0,_card_js__WEBPACK_IMPORTED_MODULE_1__.createCard)(cardData, _card_js__WEBPACK_IMPORTED_MODULE_1__.handleLike, _card_js__WEBPACK_IMPORTED_MODULE_1__.deleteCard, openImagePopup);\n  cardList.prepend(newCard);\n  (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.closeModal)(newCardPopup);\n}\n\n// Добавляем обработчик на форму\nnewCardForm.addEventListener(\"submit\", handleNewCardSubmit);\n\n// Открытие попапа\naddCardButton.addEventListener(\"click\", function () {\n  newCardForm.reset();\n  (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.openModal)(newCardPopup);\n});\n\n// Функция открытия попапа изображения\nfunction openImagePopup(imageSrc, imageAlt) {\n  popupImage.src = imageSrc;\n  popupImage.alt = imageAlt;\n  popupCaption.textContent = imageAlt;\n  (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.openModal)(imagePopup); // Открываем модальное окно\n}\n\n// Отображение карточек на странице\n_cards__WEBPACK_IMPORTED_MODULE_3__.initialCards.forEach(function (cardData) {\n  var card = (0,_card_js__WEBPACK_IMPORTED_MODULE_1__.createCard)(cardData, _card_js__WEBPACK_IMPORTED_MODULE_1__.handleLike, _card_js__WEBPACK_IMPORTED_MODULE_1__.deleteCard, openImagePopup); // Создаём карточку\n  cardList.append(card); // Добавляем её в список\n});\n\n// Очистка ошибок валидации\neditProfileButton.addEventListener(\"click\", function () {\n  nameInput.value = profileName.textContent;\n  descriptionInput.value = profileDescription.textContent;\n  (0,_validate_js__WEBPACK_IMPORTED_MODULE_4__.resetValidation)(); // Очищаем ошибки\n  (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.openModal)(editProfilePopup);\n});\n\n//# sourceURL=webpack://yandex/./src/components/index.js?");

/***/ }),

/***/ "./src/components/modal.js":
/*!*********************************!*\
  !*** ./src/components/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   closeModal: () => (/* binding */ closeModal),\n/* harmony export */   openModal: () => (/* binding */ openModal),\n/* harmony export */   setCloseOnOverlay: () => (/* binding */ setCloseOnOverlay)\n/* harmony export */ });\n// Функция открытия модального окна\nfunction openModal(popup) {\n  popup.classList.add('popup_is-opened');\n  document.addEventListener('keydown', closeOnEscape); // Добавляем закрытие на Escape\n}\n\n// Функция закрытия модального окна\nfunction closeModal(modalElement) {\n  modalElement.classList.remove('popup_is-opened');\n  document.removeEventListener('keydown', closeOnEscape);\n}\n\n// Закрытие модального окна при нажатии клавиши Escape\nfunction closeOnEscape(event) {\n  if (event.key === 'Escape') {\n    var openedModal = document.querySelector('.popup_is-opened');\n    if (openedModal) {\n      closeModal(openedModal);\n    }\n  }\n}\n\n// Закрытие модального окна при клике по оверлею\nfunction setCloseOnOverlay(modalElement) {\n  modalElement.addEventListener('mousedown', function (event) {\n    if (event.target === modalElement) {\n      closeModal(modalElement);\n    }\n  });\n}\n\n//# sourceURL=webpack://yandex/./src/components/modal.js?");

/***/ }),

/***/ "./src/components/validate.js":
/*!************************************!*\
  !*** ./src/components/validate.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   resetValidation: () => (/* binding */ resetValidation)\n/* harmony export */ });\nvar nameInput = document.querySelector(\".popup__input_type_name\");\nvar descriptionInput = document.querySelector(\".popup__input_type_description\");\nvar profileForm = document.querySelector(\".popup_type_edit .popup__form\");\nvar submitButton = profileForm.querySelector(\".popup__button\");\n\n// Регулярка для проверки имени и описания (только буквы, пробелы, дефисы)\nvar namePattern = /^[a-zA-Zа-яА-ЯёЁ\\s-]+$/;\n\n// Функция показа ошибки\nvar showError = function showError(input, message) {\n  var errorElement = input.nextElementSibling;\n  input.classList.add(\"popup__input_type_error\");\n  errorElement.textContent = message;\n  errorElement.classList.add(\"popup__error_active\");\n};\n\n// Функция скрытия ошибки\nvar hideError = function hideError(input) {\n  var errorElement = input.nextElementSibling;\n  input.classList.remove(\"popup__input_type_error\");\n  errorElement.textContent = \"\";\n  errorElement.classList.remove(\"popup__error_active\");\n};\n\n// Функция проверки валидности\nvar checkInputValidity = function checkInputValidity(input) {\n  if (!input.value.trim()) {\n    showError(input, \"Это поле обязательно\");\n  } else if (input === nameInput && (input.value.length < 2 || input.value.length > 40)) {\n    showError(input, \"Имя должно быть от 2 до 40 символов\");\n  } else if (input === descriptionInput && (input.value.length < 2 || input.value.length > 200)) {\n    showError(input, \"Описание должно быть от 2 до 200 символов\");\n  } else if (!namePattern.test(input.value)) {\n    showError(input, \"Можно использовать только буквы, пробелы и дефисы\");\n  } else {\n    hideError(input);\n  }\n};\n\n// Проверка всех полей формы и блокировка кнопки\nvar toggleButtonState = function toggleButtonState() {\n  if (!profileForm.checkValidity()) {\n    submitButton.disabled = true;\n    submitButton.classList.add(\"button_inactive\");\n  } else {\n    submitButton.disabled = false;\n    submitButton.classList.remove(\"button_inactive\");\n  }\n};\n\n// Обработчики ввода\nprofileForm.addEventListener(\"input\", function (evt) {\n  checkInputValidity(evt.target);\n  toggleButtonState();\n});\n\n// Очистка ошибок при открытии формы\nvar resetValidation = function resetValidation() {\n  profileForm.reset();\n  [nameInput, descriptionInput].forEach(hideError);\n  toggleButtonState();\n};\n\n//# sourceURL=webpack://yandex/./src/components/validate.js?");

/***/ }),

/***/ "./src/pages/index.css":
/*!*****************************!*\
  !*** ./src/pages/index.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://yandex/./src/pages/index.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/components/index.js");
/******/ 	
/******/ })()
;