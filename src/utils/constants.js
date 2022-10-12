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
const btnEditAvatar = document.querySelector('.profile__edit-avatar');

const nameInput = popupEdit.querySelector('.popup__text_value_name');
const jobInput = popupEdit.querySelector('.popup__text_value_job');

export { configValidation, popupEdit, popupAdd, btnEdit, btnAdd, btnEditAvatar, nameInput, jobInput };