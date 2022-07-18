// валидация

// Добавляем функционал при ошибке в поле формы
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__text_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__text-error');
};

// Прячем функционал ошибки
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__text_type_error');
  errorElement.classList.remove('popup__text-error');
  errorElement.textContent = '';
};

// При невалидном элементе внутри поля формы - добавляем ошибку, при валидном - прячем ошибку
const isValid = (formElement, inputElement) => {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// Проверем наличие хоть одного невалидного элемента внутри массива
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

// Стилизуем активную/неактивную кнопку 
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__submit_inactive');
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove('popup__submit_inactive');
    buttonElement.removeAttribute('disabled');
  }
};

// устанавливаем слушатели на событие инпут
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__text'));
  const buttonElement = formElement.querySelector('.popup__submit');

  // установим изначально неактивную кнопку на кнопку формы add
  const buttonAdd = document.querySelector('.popup__submit-add');
  toggleButtonState(inputList, buttonAdd);

  // далее каждый элемент массива проверяем на валидность чтобы стилизовать поле и кнопку
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__container'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {evt.preventDefault()});
    setEventListeners(formElement);
  });
};

enableValidation(
//   {
//   formSelector: '.popup__container',
//   inputSelector: '.popup__text',
//   submitButtonSelector: '.popup__submit',
//   inactiveButtonClass: 'popup__submit_inactive',
//   inputErrorClass: 'popup__text_type_error',
//   errorClass: 'popup__text-error'
// }
); 