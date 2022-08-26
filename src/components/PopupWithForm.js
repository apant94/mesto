import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
  super(popupSelector);
  this._handleFormSubmit = handleFormSubmit;
  this._formElement = this._popupSelector.querySelector('.popup__container');
  this._inputList = this._popupSelector.querySelectorAll('.popup__text');
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
    this._popupSelector.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
    });
  };

  close() {
    super.close();
    this._formElement.reset();
  };
}