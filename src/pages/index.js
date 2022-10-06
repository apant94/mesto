import './index.css';
import { configValidation, popupEdit, popupAdd, popupDelete, btnEdit, btnAdd, nameInput, jobInput, nameProfile, jobProfile, avatarProfile, popupImage } from '../utils/constants.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

// работа с сервером
const api = new Api('https://mesto.nomoreparties.co/v1/cohort-51', {
  headers: {
    authorization: '38d1ddce-71b0-4527-b8f7-2e586ecd1edf',
    'Content-Type': 'application/json'
  }
});

let userId;

// подтягиваем данные со страницы в профиль
const userInfo = new UserInfo({ nameSelector: nameProfile, jobSelector: jobProfile, avatarSelector: avatarProfile });

// создаем карточку
const createCard = (item, userId) => {
  const card = new Card({data: item,
    ownerId: userId,
    handleCardClick: (data) => {
      imagePopup.open(data);
    },
    handleCardDelete: (card) => {
      popupDeleteCard.open(card);
    },
  }, '#element').generateCard();
  return card;
};

// создаем секцию с карточками
const cardsList = new Section({ 
  renderer: (card) => {
    cardsList.addItem(createCard(card));
  },
}, '.elements__list');

// функция загрузки изначальный карточек
const renderInitialCards = (cards, userData) => {
  cardsList.renderItems(cards, userData._id);
};

// получаем данные профиля и карточки с сервера
Promise.all([api.getCards(), api.getProfileInfo()])
.then(([cards, userData]) => {
  userInfo.setUserInfo(userData);
  userId = userData._id;
  // userInfo.setUserAvatar(userData);
  // выведем изначальные карточки на страницу
  renderInitialCards(cards, userId);
});

// реализуем попап открытия фото
const imagePopup = new PopupWithImage(popupImage);
imagePopup.setEventListeners();

// реализуем попап добавления карточки
const popupAddCard = new PopupWithForm({ popupElement: popupAdd,
  handleFormSubmit: (cardData) => {
    api.setCard(cardData)
    .then((card) => {
      const newCard = createCard(card, userId);
      cardsList.addItem(newCard);
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    // const newCard = createCard({ name: placeInput.value, link: linkInput.value });
    // cardsList.addItem(newCard);
    // popupAddCard.close();
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
const popupEditProfile = new PopupWithForm({ 
  popupElement: popupEdit,
  handleFormSubmit: (inputValues) => {
    userInfo.setUserInfo(inputValues);
 // userInfo.setUserInfo({ name: nameInput.value, about: jobInput.value });
    api.setProfileInfo(inputValues)
    .then((res) => {
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(err);
    });
  }
  // handleFormSubmit: () => {
  //   userInfo.setUserInfo({ name: nameInput.value, about: jobInput.value });
  //   popupEditProfile.close();
  // }
});
popupEditProfile.setEventListeners();

// вешаем событие на кнопку редактирования профиля
btnEdit.addEventListener('click', () => {
  // потягиваем при открытии формы редактирования профиля значения из лендинга
  const info = userInfo.getUserInfo();
  // setUserInfo(userInfo.getUserInfo());
  nameInput.value = info.name;
  jobInput.value = info.about;
  popupEditProfile.open();
  validationPopupEdit.resetError();
});

// реализуем форму удаления карточки
const popupDeleteCard = new PopupWithConfirm({
  popupElement: popupDelete,
  handleFormSubmit: (card) => {
    api.deleteCard(card.getId())
    .then(() => {
      card.deleteCard();
      popupDeleteCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
  }
});
popupDeleteCard.setEventListeners();

// ВАЛИДАЦИЯ
const validationPopupEdit = new FormValidator(configValidation, '#popup-edit');
validationPopupEdit.enableValidation();
const validationPopupAdd = new FormValidator(configValidation, '#popup-add');
validationPopupAdd.enableValidation();



