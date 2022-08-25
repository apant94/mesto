// import {  image, imageName, popupImage } from '../utils/constants.js';
// import { openPopup } from '../pages/index.js';

export default class Card {
  constructor({data, handleCardClick}, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
  };

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  };

  generateCard() {
    this._card = this._getTemplate();
    this._card.querySelector('.element__title').textContent = this._name;
    this._photo = this._card.querySelector('.element__photo');
    this._photo.src = this._link;
    this._photo.alt = this._name;
    this._setEventListeners();
    return this._card;
  };

  _handleLikeButton(evt) {
    evt.target.classList.toggle('element__like_active');
  };

  _handleCardRemoveButton() {
    this._card.remove();
  };

  // _handleCardPhoto() {
  //   openPopup(popupImage);
  //   image.src = this._link;
  //   imageName.textContent = this._name;
  //   image.alt = this._name;
  // };

  _setEventListeners() {
    this._card.querySelector('.element__like').addEventListener('click', (evt) => {
      this._handleLikeButton(evt);
    });

    this._card.querySelector('.element__trash').addEventListener('click', () => {
      this._handleCardRemoveButton();
    });

    this._card.querySelector('.element__photo').addEventListener('click', () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  };
};