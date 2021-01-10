//index.js
const app = getApp();

Page({
  data: {
    inputAccount: "",
    inputPassword: "",
    username: "",
    password: "",
    isShowInput: true,
    isAtSchool: true,
  },

  onReady: function () {
    this.setData({
      username: app.globalData.username,
      inputAccount: app.globalData.username,
      password: app.globalData.password,
      inputPassword: app.globalData.password,
      isShowInput: (app.globalData.username.length === 0) && (app.globalData.password.length === 0),
      isAtSchool: app.globalData.isAtSchool
    });
  },

  onGetUserInfo: function (e) {

  },

  onGetOpenid: function () {

  },

  handleAccountInput(e) {
    console.log(e.detail.value);
    this.setData({
      inputAccount: e.detail.value
    });
  },

  handlePasswordInput(e) {
    console.log(e.detail.value);
    this.setData({
      inputPassword: e.detail.value
    });
  },

  handleSaveUserInfo() {
    if (this.data.inputAccount.length === 0 || this.data.inputPassword.length === 0) {
      wx.showToast({
        icon: 'none',
        title: '账号密码不能为空, 请检查输入'
      })
      return;
    }
    Promise.all([wx.setStorage({
      data: this.data.inputAccount,
      key: 'username',
    }), wx.setStorage({
      data: this.data.inputPassword,
      key: 'password',
    })]).then(() => {
      this.setData({
        username: this.data.inputAccount,
        password: this.data.inputPassword,
        isShowInput: false
      })
    });
    console.log(this.data.inputAccount, this.data.inputPassword);
  },

  handleChangeAccount() {
    this.setData({
      isShowInput: true
    });
  },

  handleAddrChange(e) {
    console.log(e.detail.value === 'school');
    wx.setStorage({
      data: e.detail.value === 'school',
      key: 'isAtSchool',
    });
    this.setData({
      isAtSchool: e.detail.value === 'school'
    });
  }
})