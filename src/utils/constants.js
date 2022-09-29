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
const popupDelete = document.querySelector('.popup_delete');

const btnEdit = document.querySelector('.profile__edit');
const btnAdd = document.querySelector('.profile__add');

const nameInput = popupEdit.querySelector('.popup__text_value_name');
const jobInput = popupEdit.querySelector('.popup__text_value_job');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const avatarProfile = document.querySelector('.profile__avatar');

const placeInput = popupAdd.querySelector('.popup__text_value_place');
const linkInput = popupAdd.querySelector('.popup__text_value_link');

const popupImage = document.querySelector('.popup_image');

export { configValidation, popupEdit, popupAdd, popupDelete, btnEdit, btnAdd, nameInput, jobInput, nameProfile, jobProfile, avatarProfile, placeInput, linkInput, popupImage }; 