export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  };

  renderItems(items, userId) {
    this._userId = userId;
    this._renderedCards = items;
    this._renderedCards.forEach((item) => {
      this._renderer(item);
      })
  };

  addItem(card) {
    this._container.append(card);
  };

  addNewItem(card) {
    this._container.prepend(card);
  }
};