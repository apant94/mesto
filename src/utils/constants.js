const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

const configValidation = {
  formSelector: '.popup__container',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error'
};

const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');

const btnEdit = document.querySelector('.profile__edit');
const btnAdd = document.querySelector('.profile__add');

const nameInput = popupEdit.querySelector('.popup__text_value_name');
const jobInput = popupEdit.querySelector('.popup__text_value_job');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');

const placeInput = popupAdd.querySelector('.popup__text_value_place');
const linkInput = popupAdd.querySelector('.popup__text_value_link');

const popupImage = document.querySelector('.popup_image');

export { initialCards, configValidation, popupEdit, popupAdd, btnEdit, btnAdd, nameInput, jobInput, nameProfile, jobProfile, placeInput, linkInput, popupImage }; 