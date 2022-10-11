import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
  super(popupSelector);
  this._popupElement = document.querySelector(popupSelector);
  this._image = this._popupElement.querySelector('.popup__image-item');
  this._imageName = this._popupElement.querySelector('.popup__image-name');
  };

  open(data) {
    this._imageName.textContent = data.name;
    this._image.src = data.link;
    this._image.alt = data.name;
    super.open();
  };
}