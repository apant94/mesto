export default class Card {
  constructor({data, ownerId, handleCardClick, handleCardDelete, handleLike}, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._cardOwnerId = data.owner._id;
    this._ownerId = ownerId;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLike = handleLike;
    this._templateSelector = templateSelector;
  };

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  };

  _setEventListeners() {
    this._likeBtn.addEventListener('click', () => {
      this._handleLike(this);
    });

    this._deleteBtn.addEventListener('click', () => {
      this._handleCardDelete(this);
    });

    this._card.querySelector('.element__photo').addEventListener('click', () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  };

  generateCard() {
    this._card = this._getTemplate();
    this._card.querySelector('.element__title').textContent = this._name;
    this._photo = this._card.querySelector('.element__photo');
    this._photo.src = this._link;
    this._photo.alt = this._name;
    this._deleteBtn = this._card.querySelector('.element__trash');
    this._likeBtn = this._card.querySelector('.element__like');
    this._likeCounter = this._card.querySelector('.element__counter');
    this._setEventListeners();
    this._handleLikeBtnState();
    this._handleDeleteBtnState();
    this._handleLikeCounter(this._likes);
    return this._card;
  };

  getId() {
    return this._id;
  }

  deleteCard() {
    this._card.remove();
    this._card = null;
  }

  _handleDeleteBtnState() {
    if (this._cardOwnerId !== this._ownerId) {
      this._deleteBtn.remove();
      this._deleteBtn = null;
    }
  }

  _handleLikeBtnState() {
    if (this.isLiked()) {
      this._likeBtn.classList.add('element__like_active');
    }
  }

  _handleLikeCounter(likes) {
    this._likeCounter.textContent = likes.length;
  }

  // проверка  лайка
  isLiked() {
    return this._likes.find((like) => like._id === this._ownerId);
  }

  putLike(likes) {
    this._likeBtn.classList.add('element__like_active');
    this.isLiked(true);
    this._handleLikeCounter(likes);
    this._likes = likes;
  }

  deleteLike(likes) {
    this._likeBtn.classList.remove('element__like_active');
    this.isLiked(false);
    this._handleLikeCounter(likes);
    this._likes = likes;
  }

  // _handleLike(evt) {
  //   evt.target.classList.toggle('element__like_active');
  // };
};