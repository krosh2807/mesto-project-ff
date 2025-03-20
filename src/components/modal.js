//функция открытия модального окна
export function openModal(popupElement) {
  popupElement.classList.add("popup_is-opened");
  document.addEventListener('keydown', closeOnEscape);
  }

  //функция закрытия модального окна
export function closeModal(popupElement) {
  popupElement.classList.remove("popup_is-opened");
  document.removeEventListener('keydown', closeOnEscape);
}

//функция закрытия попапа по Esc
function closeOnEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}