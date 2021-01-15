//index.js
const app = getApp();

const storagedUsername = wx.getStorageSync('username');
const storagedPassword = wx.getStorageSync('password');

Page({
  data: {
    inputAccount: storagedUsername,
    inputPassword: storagedPassword,
    username: storagedUsername,
    password: storagedPassword,
    isShowInput: (storagedUsername.length === 0) && (storagedPassword.length === 0) && true,
    isAtSchool: wx.getStorageSync('isAtSchool'),
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
        isShowInput: false,
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
    const isAtSchool = e.detail.value === 'school';
    wx.setStorage({
      data: isAtSchool,
      key: 'isAtSchool',
    });
    this.setData({
      isAtSchool: isAtSchool
    });
  }
})