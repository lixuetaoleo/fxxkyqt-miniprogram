//index.js
const app = getApp();

Page({
  data: {
    inputAccount: "",
    inputPassword: "",
    username: app.globalData.username,
    password: app.globalData.password,
    hasSavedUNandPW: app.globalData.username.length > 0 && app.globalData.password.length > 0
  },

  onLoad: function () {
    wx.getStorage({
      key: 'username'
    }).then((res)=>{
      this.setData({
        username: res.data
      })
    }).catch((err)=>{
      console.log(err)
    });

    wx.getStorage({
      key: 'password'
    }).then((res)=>{
      this.setData({
        password: res.data
      })
    }).catch((err)=>{
      console.log(err)
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