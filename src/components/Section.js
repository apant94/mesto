export default class Section {
  constructor({ renderer }, containerSelector) {
    // this._renderedCards = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  };

  renderItems(items) {
    this._renderedCards = items;
    this._renderedCards.forEach((item) => {
      this._renderer(item);
      })
  };

  addItem(card) {
    this._container.prepend(card);
  };
};