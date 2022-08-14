export default class Card {
    constructor(data, templateSelector) {
      this._name = data.name;
      this._link = data.link;
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

    _setEventListeners() {
      const image = document.querySelector('.popup__image-item');
      const imageName = document.querySelector('.popup__image-name');
      const popupImage = document.querySelector('.popup_image');

      this._card.querySelector('.element__like').addEventListener('click', (evt) => {
        evt.target.classList.toggle('element__like_active');
      });

      this._card.querySelector('.element__trash').addEventListener('click', (evt) => {
        this._card.remove();
        });

      this._card.querySelector('.element__photo').addEventListener('click', (evt) => {
        openPopup(popupImage);
        image.src = this._link;
        imageName.textContent = this._name;
        image.alt = this._name;
      });
    };
  };