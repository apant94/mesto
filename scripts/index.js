const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const elementTemplate = document.querySelector('#element').content;
const elements = document.querySelector('.elements__list');
const element = document.querySelector('.element');

const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupImage = document.querySelector('.popup_image');

const editBtn = document.querySelector('.profile__edit');
const addBtn = document.querySelector('.profile__add');
const closeBtn = document.querySelectorAll('.popup__close');

const nameInput = popupEdit.querySelector('.popup__text_value_name');
const jobInput = popupEdit.querySelector('.popup__text_value_job');
const getName = document.querySelector('.profile__name');
const getJob = document.querySelector('.profile__job');

const placeInput = popupAdd.querySelector('.popup__text_value_place');
const linkInput = popupAdd.querySelector('.popup__text_value_link');

function renderItems() {
  initialCards.forEach(renderItem);
}

renderItems();

function openPopup(popup) {
  popup.classList.add('popup_opened');
  nameInput.value = getName.textContent;
  jobInput.value = getJob.textContent;
};
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

editBtn.addEventListener('click', () => {openPopup(popupEdit)});
addBtn.addEventListener('click', () => {openPopup(popupAdd)});
closeBtn.forEach((item) => {
  const popup = item.closest('.popup');
  item.addEventListener('click', () => {closePopup(popup)});
});

function createItem(newItem) {
  const card = elementTemplate.querySelector('.element').cloneNode(true);
  card.querySelector('.element__title').textContent = newItem.name;
  card.querySelector('.element__photo').src = newItem.link;
  elements.append(card);

  card.querySelector('.element__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active');
  });

  card.querySelector('.element__trash').addEventListener('click', (evt) => {
  evt.target.closest('.element').remove();
  });

  card.querySelector('.element__photo').addEventListener('click', (evt) => {
    openPopup(popupImage);
    document.querySelector('.popup__image-item').src = evt.target.src;
    document.querySelector('.popup__image-name').textContent = evt.target.closest('.element').textContent;
  })

  return card;
};

function renderItem(newItem) {
  elements.prepend(createItem(newItem));
};

function editFormSubmitHandler(evt) {
  evt.preventDefault();
  getName.textContent = nameInput.value;
  getJob.textContent = jobInput.value;
  closePopup(popupEdit);
};

document.querySelector('.popup__container').addEventListener('submit', editFormSubmitHandler);

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  renderItem({name: placeInput.value, link: linkInput.value});
  closePopup(popupAdd);
}

document.querySelector('.popup__container_add').addEventListener('submit', addFormSubmitHandler); 