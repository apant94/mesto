export default class FormValidator {
  constructor(configValidation, formElement) {
    this._formSelector = configValidation.formSelector;
    this._inputSelector = configValidation.inputSelector;
    this._submitButtonSelector = configValidation.submitButtonSelector;
    this._inactiveButtonClass = configValidation.inactiveButtonClass;
    this._inputErrorClass = configValidation.inputErrorClass;
    this._errorClass = configValidation.errorClass;
    this._formElement = document.querySelector(formElement);
  };

  // Добавляем функционал при ошибке в поле формы
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  // Прячем функционал ошибки
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  // сброс ошибок
  resetError() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    })
  };

  // При невалидном элементе внутри поля формы - добавляем ошибку, при валидном - прячем ошибку
  _isValid (inputElement) {
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  // Проверем наличие хоть одного невалидного элемента внутри массива
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  // cтилизуем неактивную кнопку
  disableButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  };

  // стилизуем активную кнопку
  _ableButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  };

  // функция изменения активности кнопки при условии
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this._ableButton();
    }
  };

  // устанавливаем слушатели на событие инпут
  _setEventListeners() {
  this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

  // далее каждый элемент массива проверяем на валидность чтобы стилизовать поле и кнопку
  this._inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._isValid(inputElement);
      this._toggleButtonState();
    });
  });

  // установим изначально неактивную кнопку на все формы
  this._toggleButtonState();
};

  enableValidation() {
    this._setEventListeners();
  };
}