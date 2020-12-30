//index.js
const app = getApp()

Page({
  data: {
    inputAccount: "",
    inputPassword: ""
  },

  onLoad: function () {},


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
  }

})