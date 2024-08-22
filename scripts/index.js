// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(cardData, deleteCallBack){
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
        deleteCallBack(cardElement)
    });

    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement){
   cardElement.remove();
}

// @todo: Вывести карточки на страницу
for (let i = 0; i < initialCards.length; i++){ 
    const card = createCard(initialCards[i], deleteCard)
    
    cardList.append(card); 
} 





