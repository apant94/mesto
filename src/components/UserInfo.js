export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  };

  getUserInfo() {
    return { name: this._name.textContent,
    about: this._job.textContent,
    id: this._id };
  };

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent  = data.about;
    this._id = data._id;
  };

  setAvatar(inputValues) {
    this._avatar.style.backgroundImage = `url('${inputValues.avatar}')`;
  };
}