import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupElement, handleFormSubmit }) {
  super(popupElement);
  this._handleFormSubmit = handleFormSubmit;
  this._formElement = this._popupElement.querySelector('.popup__container');
  this._inputList = this._popupElement.querySelectorAll('.popup__text');
  };

  _getInputValues() {
    this._inputsValue = {}; 
    this._inputList.forEach((input) => {
      this._inputsValue[input.name] = input.value;
    });
    return this._formValue;
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
}