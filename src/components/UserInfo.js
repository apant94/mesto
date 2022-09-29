export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = nameSelector;
    this._job = jobSelector;
    this._avatar = avatarSelector;
  };

  getUserInfo() {
    return { name: this._name.textContent,
    about: this._job.textContent };
  };

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent  = data.about;
  };

  // setUserInfo({name, about}) {
  //   this._name.textContent = name;
  //   this._job.textContent  = about;
  // };

  setUserAvatar(inputValues) {
    this._avatar.style.backgroundImage = `url('${inputValues.avatar}')`
  };
}