import './index.css';
import { configValidation, popupEdit, popupAdd, popupEditAvatar, popupDelete, btnEdit, btnAdd, btnEditAvatar, nameInput, jobInput, nameProfile, jobProfile, avatarProfile, popupImage } from '../utils/constants.js';
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
const userInfo = new UserInfo({ nameSelector: nameProfile, jobSelector: jobProfile, avatarSelector: avatarProfile});

// создаем карточку
const createCard = (item) => {
  const card = new Card({data: item,
    ownerId: userInfo.getUserInfo().id,
    handleCardClick: (data) => {
      imagePopup.open(data);
    },
    handleCardDelete: (card) => {
      popupDeleteCard.open(card);
    },
    handleLike: (card) => {
      if (card.isLiked()) {
        console.log(card.isLiked());
        api.deleteLike(card.getId())
        .then((res) => {
          card.deleteLike(res.likes);
        })
        .catch((err) => {
          console.log(err);
        })
      } else {
        console.log(card.isLiked());
        api.putLike(card.getId())
        .then((res) => {
          card.putLike(res.likes);
        })
        .catch((err) => {
          console.log(err);
        })
      }
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

// получаем данные профиля и карточки с сервера
Promise.all([api.getCards(), api.getProfileInfo()])
.then(([cards, userData]) => {
  userInfo.setUserInfo(userData);
  userInfo.setAvatar(userData);
  userId = userData._id;
  // выведем изначальные карточки на страницу
  cardsList.renderItems(cards)
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
      cardsList.addNewItem(newCard);
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAddCard.setLoading('Сохранение...');
    })
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
    userInfo.setUserInfo(inputValues)
    api.setProfileInfo(inputValues)
    .then(() => {
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditProfile.setLoading('Сохранение...');
    })
  }
});
popupEditProfile.setEventListeners();

// вешаем событие на кнопку редактирования профиля
btnEdit.addEventListener('click', () => {
  // потягиваем при открытии формы редактирования профиля значения из лендинга
  const info = userInfo.getUserInfo();
  nameInput.value = info.name;
  jobInput.value = info.about;
  popupEditProfile.open();
  validationPopupEdit.resetError();
  validationPopupEdit.disableButton();
});

// реализуем попап редактирования аватара
const popupAvatar = new PopupWithForm({
  popupElement: popupEditAvatar,
  handleFormSubmit: (inputValue) => {
    userInfo.setAvatar(inputValue);
    api.setAvatar(inputValue)
    .then(() => {
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatar.setLoading('Сохранение...');
    })
  }
});
popupAvatar.setEventListeners();

// вешаем событие на кнопку редактирования аватара
btnEditAvatar.addEventListener('click', () => {
  popupAvatar.open();
  validationPopupAvatar.disableButton();
  validationPopupAvatar.resetError();
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
const validationPopupAvatar = new FormValidator(configValidation, '#popup-edit-avatar');
validationPopupAvatar.enableValidation();