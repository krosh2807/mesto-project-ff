//настройка валидности
export const enableValidation = (config) => { 
  const formList = Array.from(document.querySelectorAll(config.formSelector)); 

  formList.forEach((formElement) => { 
    setEventListeners(formElement, config); // Убираем обработчик submit здесь, оставляем только setEventListeners
  }); 
};

//очистка формы валидации
export const clearValidation = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideErrors(formElement, inputElement, config);
  });
  toggleButtonState(inputList, buttonElement, config);
};

// отображение ошибок
const inputErrors= (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

//скрытие ошибок
const hideErrors= (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);

  errorElement.textContent = "";
};

//валидность формы
const isValid = (formElement, inputElement, config) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {

    inputErrors(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideErrors(formElement, inputElement, config);
  }
};

// Проверка валидности
const InvalidInput = (inputList) => { 
  return inputList.some((inputElement) => !inputElement.validity.valid); 
};

//кнопка на форме валидации
const toggleButtonState = (inputList, buttonElement, config) => {
  if (InvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

// обработчик валидации для полеq ввода формы
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => { 
    inputElement.addEventListener("input", () => { 
      isValid(formElement, inputElement, config); // Проверка валидности текущего инпута
      toggleButtonState(inputList, buttonElement, config); // Обновление состояния кнопки
    }); 
  });
};
