import Popup from './Popup.js';
import { image, imageName } from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
  super(popupSelector);
  };

  open(data) {
    imageName.textContent = data.name;
    image.src = data.link;
    image.alt = data.name;
    super.open();
  };
}