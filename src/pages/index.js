import { initialCards, cardsContainer, popups, formEdit, formAdd, popupEdit, popupAdd, btnEdit, btnAdd, btnsClose, nameInput, jobInput, nameProfile, jobProfile, placeInput, linkInput, popupImage } from '../utils/constants.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import { configValidation, FormValidator } from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';

// создаем карточку
const createCard = (item) => {
  const card = new Card({ data: item,
  handleCardClick: (data) => {
    imagePopup.open(data);
  },
  }, '#element').generateCard();
  return card;
};

// создаем секцию с карточками
const cardsList = new Section({ 
  items: initialCards,
  renderer: (card) => {
    cardsList.addItem(createCard(card));
  },
}, '.elements__list');

const renderInitialCards = () => {
  cardsList.renderItems();
};

renderInitialCards();

// попап открытия фото
const imagePopup = new PopupWithImage(popupImage);
// тут реализуется закрытие при нажатии на крестик
imagePopup.setEventListeners();

// // создаем образ карты из класса Card, вставляем его в конец массива
// const renderItem = (card) => {
//   cardsContainer.prepend(createCard(card));
// };

// // реализуем рендер для КАЖДОГО элемента массива
// const renderItems = () => {
//   initialCards.forEach((item) => {
//     renderItem(item);
//   });
// };

// // ВЫЗЫВАЕМ рендер для всех элементов массива
// renderItems(initialCards);

// функция открытия форм
// function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   // вешаем событие для закрытия по эскейпу
//   document.addEventListener('keydown', closePopupByEsc)
// };

// // функция закрытия форм
// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closePopupByEsc);
// };

// // закрытие форм по нажатию esc
// function closePopupByEsc (evt) {
//   if(evt.key === 'Escape') {
//     const popupOpened = document.querySelector('.popup_opened');
//     closePopup(popupOpened);
//   };
// };

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
// btnsClose.forEach((item) => { 
//   const popup = item.closest('.popup'); 
//   item.addEventListener('click', () => {closePopup(popup)}); 
// }); 

// // закрытие формы по клику на ОВЕРЛЕЙ
// popups.forEach((item) => {
//   item.addEventListener('click', (evt) => {
//   if (evt.target === evt.currentTarget) {
//     closePopup(item);
//     };
//   });
// });

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
  // const btnSubmitAdd = document.querySelector('.popup__submit-add');
  evt.preventDefault();
  cardsList.addItem({ name: placeInput.value, link: linkInput.value });
  closePopup(popupAdd);
  formAdd.reset();
  validationPopupAdd.toggleButtonState();
};

formAdd.addEventListener('submit', addFormSubmitHandler);

// ВАЛИДАЦИЯ
const validationPopupEdit = new FormValidator(configValidation, '#popup-edit');
validationPopupEdit.enableValidation();
const validationPopupAdd = new FormValidator(configValidation, '#popup-add');
validationPopupAdd.enableValidation();

// export { openPopup };