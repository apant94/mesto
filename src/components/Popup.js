export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._btnClose = this._popupSelector.querySelector('.popup__close');
  };

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {this._handleEscClose(evt)});
    this._popupSelector.addEventListener('click', (evt) => {this._handleOverlayClose(evt)});
  };

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => {this._handleEscClose(evt)});
    this._popupSelector.removeEventListener('click', (evt) => {this._handleOverlayClose(evt)});
  };

  _handleEscClose(evt) {
    if(evt.key === 'Escape') {
      this.close();
    };
  };

  _handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    };
  };

// вешаем событие на закрытие по крестику
  setEventListeners() {
    this._btnClose.addEventListener("click", () => this.close());
  };
}