export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = nameSelector;
    this._job = jobSelector;
    this._avatar = avatarSelector;
  };

  getUserInfo() {
    return { name: this._name.textContent,
    about: this._job.textContent,
    // avatar: this._avatar.src,
    id: this._id };
  };

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent  = data.about;
    // this._avatar.src = data.avatar;
    this._id = data._id;
  };

  setAvatar(inputValues) {
    this._avatar.style.backgroundImage = `url('${inputValues.avatar}')`;
  };
}