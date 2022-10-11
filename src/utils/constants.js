const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupEditAvatar = document.querySelector('.popup_edit-avatar')
const popupDelete = document.querySelector('.popup_delete');

const btnEdit = document.querySelector('.profile__edit');
const btnAdd = document.querySelector('.profile__add');
const btnEditAvatar = document.querySelector('.profile__edit-avatar');

const nameInput = popupEdit.querySelector('.popup__text_value_name');
const jobInput = popupEdit.querySelector('.popup__text_value_job');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const avatarProfile = document.querySelector('.profile__avatar');

const placeInput = popupAdd.querySelector('.popup__text_value_place');
const linkInput = popupAdd.querySelector('.popup__text_value_link');

const popupImage = document.querySelector('.popup_image');

export { popupEdit, popupAdd, popupEditAvatar, popupDelete, btnEdit, btnAdd, btnEditAvatar, nameInput, jobInput, nameProfile, jobProfile, avatarProfile, placeInput, linkInput, popupImage };