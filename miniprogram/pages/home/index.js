//index.js
const app = getApp();

Page({
  data: {
    inputAccount: "",
    inputPassword: "",
    username: "",
    password: "",
    isShowInput: true
  },

  onLoad: function () {
    Promise.all([wx.getStorage({
      key: 'username'
    }), wx.getStorage({
      key: 'password'
    })]).then((res) => {
      console.log(res);
      this.setData({
        username: res[0].data,
        inputAccount: res[0].data,
        password: res[1].data,
        inputPassword: res[1].data,
        isShowInput: (res[0].data.length === 0) && (res[1].data.length === 0)
      });
    });
  },

  onGetUserInfo: function (e) {

  },

  onGetOpenid: function () {

  },

  // 上传图片
  doUpload: function () {

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
    wx.setStorage({
        data: this.data.inputAccount,
        key: 'username',
      })
      .then(() => {
        wx.setStorage({
            data: this.data.inputPassword,
            key: 'password',
          })
          .then(() => {
            this.setData({
              username: this.data.inputAccount,
              password: this.data.inputPassword,
              isShowInput: false
            })
          });
      });
    console.log(this.data.inputAccount, this.data.inputPassword);
  },

  handleChangeAccount() {
    this.setData({
      isShowInput: true
    });
  },

  handleAddrChange(e) {
    console.log(e.detail.value);
  }
})