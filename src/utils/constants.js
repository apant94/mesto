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

export { initialCards, cardsContainer, popups, formEdit, formAdd, popupEdit, popupAdd, btnEdit, btnAdd, btnsClose, nameInput, jobInput, nameProfile, jobProfile, placeInput, linkInput, image, imageName, popupImage }; 