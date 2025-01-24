// Функция открытия модального окна
export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeOnEscape); // Добавляем закрытие на Escape
}

// Функция закрытия модального окна
export function closeModal(modalElement) {
  modalElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeOnEscape);
}

// Закрытие модального окна при нажатии клавиши Escape
function closeOnEscape(event) {
  if (event.key === 'Escape') {
      const openedModal = document.querySelector('.popup_is-opened');
      if (openedModal) {
          closeModal(openedModal);
      }
  }
}

// Закрытие модального окна при клике по оверлею
export function setCloseOnOverlay(modalElement) {
  modalElement.addEventListener('mousedown', (event) => {
      if (event.target === modalElement) {
          closeModal(modalElement);
      }
  });
}