const configValidation = {
    formSelector: '.popup__container',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__text_type_error',
    errorClass: 'popup__text-error'
  };

class FormValidator {
  constructor(configValidation, formElement) {
    this._formSelector = configValidation.formSelector;
    this._inputSelector = configValidation.inputSelector;
    this._submitButtonSelector = configValidation.submitButtonSelector;
    this._inactiveButtonClass = configValidation.inactiveButtonClass;
    this._inputErrorClass = configValidation.inputErrorClass;
    this._errorClass = configValidation.errorClass;
    this._formElement = formElement;
  };

  // Добавляем функционал при ошибке в поле формы
_showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(this._inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this._errorClass);
};

// Прячем функционал ошибки
_hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(this._inputErrorClass);
  errorElement.classList.remove(this._errorClass);
  errorElement.textContent = '';
};

// При невалидном элементе внутри поля формы - добавляем ошибку, при валидном - прячем ошибку
_isValid (formElement, inputElement) {
  if(!inputElement.validity.valid) {
    this._showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    this._hideInputError(formElement, inputElement);
  }
};

// Проверем наличие хоть одного невалидного элемента внутри массива
_hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

// Стилизуем активную/неактивную кнопку 
_toggleButtonState(inputList, buttonElement) {
  if (this._hasInvalidInput(inputList)) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

  // устанавливаем слушатели на событие инпут
  _setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
  const buttonElement = formElement.querySelector(this._submitButtonSelector);

  // далее каждый элемент массива проверяем на валидность чтобы стилизовать поле и кнопку
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._isValid(formElement, inputElement);
      this._toggleButtonState(inputList, buttonElement);
    });
  });

  // установим изначально неактивную кнопку на все формы
  this._toggleButtonState(inputList, buttonElement);
};

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {evt.preventDefault()});
      this._setEventListeners(formElement);
    });
  };
};

export { configValidation, FormValidator };