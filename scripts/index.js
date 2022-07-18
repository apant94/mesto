const elementTemplate = document.querySelector('#element').content;
const elements = document.querySelector('.elements__list');
const element = document.querySelector('.element');

const popup = document.querySelector('.popup');
const popups = Array.from(document.querySelectorAll('.popup'));
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupImage = document.querySelector('.popup_image');

const btnEdit = document.querySelector('.profile__edit');
const btnAdd = document.querySelector('.profile__add');
const btnClose = document.querySelectorAll('.popup__close');

const nameInput = popupEdit.querySelector('.popup__text_value_name');
const jobInput = popupEdit.querySelector('.popup__text_value_job');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');

const placeInput = popupAdd.querySelector('.popup__text_value_place');
const linkInput = popupAdd.querySelector('.popup__text_value_link');

function renderItems() {
  initialCards.forEach(renderItem);
}

renderItems();

function openPopup(popup) {
  popup.classList.add('popup_opened');
  // вешаем событие для закрытия по эскейпу
  document.addEventListener('keydown', closePopupByEsc)
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

// закрытие форм по нажатию esc
function closePopupByEsc (evt) {
  if(evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
    document.removeEventListener('keydown', closePopupByEsc)
  };
};

btnEdit.addEventListener('click', () => {
  openPopup(popupEdit);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
});

btnAdd.addEventListener('click', () => {
  openPopup(popupAdd);
});

// закрытие формы по клику на крестик
btnClose.forEach((item) => {
  const popup = item.closest('.popup');
  item.addEventListener('click', () => {closePopup(popup)});
});

// закрытие формы по клику на оверлей
popups.forEach((item) => {
  const popup = item.closest('.popup');
  popup.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(popup);
  };
  });
});

function createItem(newItem) {
  const card = elementTemplate.querySelector('.element').cloneNode(true);
  card.querySelector('.element__title').textContent = newItem.name;
  card.querySelector('.element__photo').src = newItem.link;
  card.querySelector('.element__photo').alt = newItem.name;

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
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupEdit);
};

document.querySelector('.popup__container').addEventListener('submit', editFormSubmitHandler);

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  renderItem({name: placeInput.value, link: linkInput.value});
  closePopup(popupAdd);
}

document.querySelector('.popup__container_add').addEventListener('submit', addFormSubmitHandler); 