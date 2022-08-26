import { initialCards, popupEdit, popupAdd, btnEdit, btnAdd, nameInput, jobInput, nameProfile, jobProfile, placeInput, linkInput, popupImage } from '../utils/constants.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import { configValidation, FormValidator } from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

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

// выведем изначальные карточки на страницу
renderInitialCards();

// реализуем попап открытия фото
const imagePopup = new PopupWithImage(popupImage);
imagePopup.setEventListeners();

// реализуем попап добавления карточки
const addPopup = new PopupWithForm({ popupSelector: popupAdd,
  handleFormSubmit: (item) => {
    const newCard = createCard({ name: placeInput.value, link: linkInput.value });
    cardsList.addItem(newCard);
    addPopup.close();
  }
});
addPopup.setEventListeners();

// вешаем событие на кнопку добавления карты
btnAdd.addEventListener('click', () => {
  addPopup.open();
});

// реализуем попап редактирования профиля
// подтягиваем данные со страницы в форму
const userInfo = new UserInfo({ nameSelector: nameProfile, jobSelector: jobProfile });
const editPopup = new PopupWithForm({ popupSelector: popupEdit,
  handleFormSubmit: () => {
    userInfo.setUserInfo({ name: nameInput.value, job: jobInput.value });
    editPopup.close();
  }
});
editPopup.setEventListeners();

// вешаем событие на кнопку редактирования профиля
btnEdit.addEventListener('click', () => {
  // потягиваем при открытии формы редактирования профиля значения из лендинга
  const info = userInfo.getUserInfo();
  nameInput.value = info.name;
  jobInput.value = info.job;
  editPopup.open();
});

// ВАЛИДАЦИЯ
const validationPopupEdit = new FormValidator(configValidation, '#popup-edit');
validationPopupEdit.enableValidation();
const validationPopupAdd = new FormValidator(configValidation, '#popup-add');
validationPopupAdd.enableValidation();

