import './index.css';
import { configValidation, popupEdit, popupAdd, btnEdit, btnAdd, nameInput, jobInput, nameProfile, jobProfile, avatarProfile, placeInput, linkInput, popupImage } from '../utils/constants.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

// работа с сервером
const api = new Api('https://mesto.nomoreparties.co/v1/cohort-49', {
  headers: {
    authorization: 'fc816947-ecdd-436d-955b-418421d31994',
    'Content-Type': 'application/json'
  }
});

// подтягиваем данные со страницы в профиль
const userInfo = new UserInfo({ nameSelector: nameProfile, jobSelector: jobProfile, avatarSelector: avatarProfile });

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
// renderInitialCards();

// получаем данные профиля и карточки с сервера
Promise.all([api.getCards(), api.getProfileInfo()])
.then(([cards, userData]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    // userId = userInfo.getUserId(userData);
    // выведем изначальные карточки на страницу
    renderInitialCards();
})

// реализуем попап открытия фото
const imagePopup = new PopupWithImage(popupImage);
imagePopup.setEventListeners();

// реализуем попап добавления карточки
const popupAddCard = new PopupWithForm({ popupElement: popupAdd,
  handleFormSubmit: (item) => {
    const newCard = createCard({ name: placeInput.value, link: linkInput.value });
    cardsList.addItem(newCard);
    popupAddCard.close();
  }
});
popupAddCard.setEventListeners();

// вешаем событие на кнопку добавления карты
btnAdd.addEventListener('click', () => {
  popupAddCard.open();
  validationPopupAdd.disableButton();
  validationPopupAdd.resetError();
});

// реализуем форму редактирования профиля
const popupEditProfile = new PopupWithForm({ popupElement: popupEdit,
  handleFormSubmit: () => {
    userInfo.setUserInfo({ name: nameInput.value, about: jobInput.value });
    popupEditProfile.close();
  }
});
popupEditProfile.setEventListeners();

// вешаем событие на кнопку редактирования профиля
btnEdit.addEventListener('click', () => {
  // потягиваем при открытии формы редактирования профиля значения из лендинга
  // const info = userInfo.getUserInfo();
  const info = api.getProfileInfo();
  nameInput.value = info.name;
  jobInput.value = info.about;
  popupEditProfile.open();
  validationPopupEdit.resetError();
});

// ВАЛИДАЦИЯ
const validationPopupEdit = new FormValidator(configValidation, '#popup-edit');
validationPopupEdit.enableValidation();
const validationPopupAdd = new FormValidator(configValidation, '#popup-add');
validationPopupAdd.enableValidation();



