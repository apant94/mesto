export default class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._btnClose = this._popupElement.querySelector('.popup__close');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
  };

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    this._popupElement.addEventListener('click', this._handleOverlayClose);
  };

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popupElement.removeEventListener('click', this._handleOverlayClose);
  };

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
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