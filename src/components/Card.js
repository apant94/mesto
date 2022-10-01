export default class Card {
  constructor(data, templateSelector, {handleCardClick, handleCardDelete}) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data.cardId;
    this._userId = data.userId;
    this._ownerId = data.ownerId;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
    this._handleCardDelete = handleCardDelete;
  };

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  };

  generateCard() {
    this._card = this._getTemplate();
    this._card.querySelector('.element__title').textContent = this._name;
    this._photo = this._card.querySelector('.element__photo');
    this._photo.src = this._link;
    this._photo.alt = this._name;
    this._deleteBtn = this._card.querySelector('.element__trash');
    this._likeCounter = this._card.querySelector('.element__counter');
    this._likeCounter.textContent = `${this._likes.length}`;
    this._setEventListeners();
    this._handleDeleteBtnState;
    return this._card;
  };

  deleteCard() {
    this._card.remove();
    this._card = null;
  }

  _handleDeleteBtnState() {
    if (this._userId !== this._ownerId) {
      this._deleteBtn.remove();
      this._deleteBtn = null;
    }
  }

  _handleLikeButton(evt) {
    evt.target.classList.toggle('element__like_active');
  };

  // _handleCardRemoveButton() {
  //   this._card.remove();
  // };

  _setEventListeners() {
    this._card.querySelector('.element__like').addEventListener('click', (evt) => {
      this._handleLikeButton(evt);
    });

    this._deleteBtn.addEventListener('click', () => {
      this._handleCardDelete();
    });

    this._card.querySelector('.element__photo').addEventListener('click', () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  };
};