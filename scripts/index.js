const cardsContainer = document.querySelector('.elements__list');

const popups = Array.from(document.querySelectorAll('.popup'));
const formEdit = document.querySelector('.popup__container_edit');
const formAdd = document.querySelector('.popup__container_add');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');

const btnEdit = document.querySelector('.profile__edit');
const btnAdd = document.querySelector('.profile__add');
const btnsClose = document.querySelectorAll('.popup__close');

const nameInput = popupEdit.querySelector('.popup__text_value_name');
const jobInput = popupEdit.querySelector('.popup__text_value_job');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');

const placeInput = popupAdd.querySelector('.popup__text_value_place');
const linkInput = popupAdd.querySelector('.popup__text_value_link');

const image = document.querySelector('.popup__image-item');
const imageName = document.querySelector('.popup__image-name');
const popupImage = document.querySelector('.popup_image');

import { initialCards } from './cards.js';
import Card from './Card.js';
import { configValidation, FormValidator } from './FormValidator.js';

const createCard = (item) => {
  const card = new Card(item, '#element').generateCard();
  return card;
};

// создаем образ карты из класса Card, вставляем его в конец массива
const renderItem = (card) => {
  cardsContainer.prepend(createCard(card));
};

// реализуем рендер для КАЖДОГО элемента массива
const renderItems = () => {
  initialCards.forEach((item) => {
    renderItem(item);
  });
};

// ВЫЗЫВАЕМ рендер для всех элементов массива
renderItems(initialCards);

// функция открытия форм
function openPopup(popup) {
  popup.classList.add('popup_opened');
  // вешаем событие для закрытия по эскейпу
  document.addEventListener('keydown', closePopupByEsc)
};

// функция закрытия форм
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
};

// закрытие форм по нажатию esc
function closePopupByEsc (evt) {
  if(evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  };
};

// вешаем событие на кнопку редактирования профиля
btnEdit.addEventListener('click', () => {
  openPopup(popupEdit);
  // потягиваем при открытии формы редактирования профиля значения из лендинга
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
});

// вешаем событие на кнопку добавления карты
btnAdd.addEventListener('click', () => {
  openPopup(popupAdd);
});

// закрытие формы по клику на КРЕСТИК 
btnsClose.forEach((item) => { 
  const popup = item.closest('.popup'); 
  item.addEventListener('click', () => {closePopup(popup)}); 
}); 

// закрытие формы по клику на ОВЕРЛЕЙ
popups.forEach((item) => {
  item.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(item);
    };
  });
});

// дальше вешаем слушатели с САБМИТОМ на форму редактирования профиля
function editFormSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupEdit);
};

formEdit.addEventListener('submit', editFormSubmitHandler);

// дальше вешаем слушатели с САБМИТОМ на форму добавления карты
function addFormSubmitHandler(evt) {
  const btnSubmitAdd = document.querySelector('.popup__submit-add');
  evt.preventDefault();
  renderItem({name: placeInput.value, link: linkInput.value});
  closePopup(popupAdd);
  formAdd.reset();
  validationPopupAdd.toggleButtonState();
  // btnSubmitAdd.classList.add('popup__submit_inactive');
  // btnSubmitAdd.setAttribute('disabled', true);
};

formAdd.addEventListener('submit', addFormSubmitHandler);

// ВАЛИДАЦИЯ
const validationPopupEdit = new FormValidator(configValidation, '#popup-edit');
validationPopupEdit.enableValidation();
const validationPopupAdd = new FormValidator(configValidation, '#popup-add');
validationPopupAdd.enableValidation();

export {image, imageName, popupImage, openPopup};