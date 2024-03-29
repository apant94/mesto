import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
  super(popupSelector);
  this._popupElement = document.querySelector(popupSelector);
  this._handleFormSubmit = handleFormSubmit;
  this._formElement = this._popupElement.querySelector('.popup__container');
  };

  open(card) {
    this._card = card;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._card);
    });
  }
}