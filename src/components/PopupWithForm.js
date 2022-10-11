import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
  super(popupSelector);
  this._handleFormSubmit = handleFormSubmit;
  this._popupElement = document.querySelector(popupSelector);
  this._formElement = this._popupElement.querySelector('.popup__container');
  this._inputList = this._popupElement.querySelectorAll('.popup__text');
  this._submitBtn = this._popupElement.querySelector('.popup__submit');
  };

  _getInputValues() {
    this._inputsValue = {}; 
    this._inputList.forEach((input) => {
      this._inputsValue[input.name] = input.value;
    });
    return this._inputsValue;
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
    });
  };

  close() {
    super.close();
    this._formElement.reset();
  };

  // стилизация кнопки при пинге во время сабмита
  setLoading(text) {
    this._submitBtn.textContent = text;
  }
}