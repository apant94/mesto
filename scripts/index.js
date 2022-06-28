const editBtn = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const closeBtn = popup.querySelector('.popup__close');

const nameInput = popup.querySelector('.popup__text_value_name');
const jobInput = popup.querySelector('.popup__text_value_job');

const getName = document.querySelector('.profile__name');
const getJob = document.querySelector('.profile__job');

const formElement = popup.querySelector('.popup__container');

function openForm() {
  popup.classList.add('popup_opened');
  nameInput.value = getName.textContent;
  jobInput.value = getJob.textContent;
}

editBtn.addEventListener('click', openForm);

function closeForm() {
  popup.classList.remove('popup_opened');
}
  
closeBtn.addEventListener('click', closeForm);

function formSubmitHandler(evt) {
  evt.preventDefault();
  getName.textContent = nameInput.value;
  getJob.textContent = jobInput.value;
  closeForm();
}

formElement.addEventListener('submit', formSubmitHandler); 