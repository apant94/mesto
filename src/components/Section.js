export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedCards = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  };

  addItem(card) {
    this._container.prepend(card);
  };

  renderItems() {
    this._renderedCards.forEach((item) => {
      this._renderer(item);
      })
  };
};