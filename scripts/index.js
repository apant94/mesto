const elementTemplate = document.querySelector('#element').content;
const cardsContainer = document.querySelector('.elements__list');

const popups = Array.from(document.querySelectorAll('.popup'));
const formEdit = document.querySelector('.popup__container_edit');
const formAdd = document.querySelector('.popup__container_add');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupImage = document.querySelector('.popup_image');

const btnEdit = document.querySelector('.profile__edit');
const btnAdd = document.querySelector('.profile__add');
const btnsClose = document.querySelectorAll('.popup__close');

const nameInput = popupEdit.querySelector('.popup__text_value_name');
const jobInput = popupEdit.querySelector('.popup__text_value_job');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');

const placeInput = popupAdd.querySelector('.popup__text_value_place');
const linkInput = popupAdd.querySelector('.popup__text_value_link');

const image = document.querySelector('.popup__image-item');
const imageName = document.querySelector('.popup__image-name');

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
  document.removeEventListener('keydown', closePopupByEsc);
};

// закрытие форм по нажатию esc
function closePopupByEsc (evt) {
  if(evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
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
btnsClose.forEach((item) => {
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
  const elementPhoto = card.querySelector('.element__photo');
  const elementTitle = card.querySelector('.element__title');

  elementTitle.textContent = newItem.name;
  elementPhoto.src = newItem.link;
  elementPhoto.alt = newItem.name;

  card.querySelector('.element__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active');
  });

  card.querySelector('.element__trash').addEventListener('click', (evt) => {
  evt.target.closest('.element').remove();
  });

  elementPhoto.addEventListener('click', (evt) => {
    openPopup(popupImage);
    image.src = evt.target.src;
    imageName.textContent = evt.target.closest('.element').textContent;
    image.alt = evt.target.closest('.element').textContent;
  })

  return card;
};

function renderItem(newItem) {
  cardsContainer.prepend(createItem(newItem));
};

function editFormSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupEdit);
};

formEdit.addEventListener('submit', editFormSubmitHandler);

function addFormSubmitHandler(evt) {
  const btnSubmitAdd = document.querySelector('.popup__submit-add');
  evt.preventDefault();
  renderItem({name: placeInput.value, link: linkInput.value});
  closePopup(popupAdd);
  formAdd.reset();
  btnSubmitAdd.classList.add('popup__submit_inactive');
  btnSubmitAdd.setAttribute('disabled', true);
}

formAdd.addEventListener('submit', addFormSubmitHandler); 