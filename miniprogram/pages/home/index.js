//index.js
const app = getApp();

const addressReg = /.+?(省|市|自治区|自治州|县|区|路|号)/g;
const storagedUsername = wx.getStorageSync('username');
const storagedPassword = wx.getStorageSync('password');

function splitAddressString(address) {
  return address.length > 0 ? address.match(addressReg) : [];
}

Page({
  data: {
    inputAccount: storagedUsername,
    inputPassword: storagedPassword,
    username: storagedUsername,
    password: storagedPassword,
    isShowInput: (storagedUsername.length === 0) && (storagedPassword.length === 0) && true,
    isAtSchool: wx.getStorageSync('isAtSchool'),
    homeAddress: {
      latitude: 1.0,
      longitude: 1.0,
      province: '',
      city: '',
      district: '',
      township: '',
      street: '',
      streetNumber: ''
    },
    completedAddress: wx.getStorageSync('homeAddress').completedAddress,
    showImportantInfo: false,
    oneButton: [{text: '我知道了'}],
  },

  onGetUserInfo: function (e) {

  },

  onGetOpenid: function () {

  },

  onShareAppMessage(res) {
    return {
      title: '疫情通打卡助手',
      path: '/pages/index/index',
    };
  },

  handleAccountInput(e) {
    // console.log(e.detail.value);
    this.setData({
      inputAccount: e.detail.value
    });
  },

  handlePasswordInput(e) {
    // console.log(e.detail.value);
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
      // return;
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
        isShowInput: this.data.inputAccount.length === 0 ? true : false,
      })
    });
    // console.log(this.data.inputAccount, this.data.inputPassword);
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
  },
  setLocation() {
    wx.chooseLocation().then((res, err) => {
      // console.log(res);
      const splittedAddress = splitAddressString(res.address);
      // console.log(splittedAddress);
      wx.setStorage({
        data: {
          latitude: res.latitude,
          longitude: res.longitude,
          province: splittedAddress[0],
          city: splittedAddress[1],
          district: splittedAddress[2],
          street: splittedAddress[3],
          streetNumber: splittedAddress[4],
          completedAddress: res.address + res.name
        },
        key: 'homeAddress',
      }).then(() => {
        this.setData({
          homeAddress: {
            latitude: res.latitude,
            longitude: res.longitude,
            province: splittedAddress[0],
            city: splittedAddress[1],
            district: splittedAddress[2],
            street: splittedAddress[3],
            streetNumber: splittedAddress[4],
          },
          completedAddress: res.address + res.name
        }, () => {
          // console.log(this.data.homeAddress)
        });
      });
    });
  },

  handleSetHomeAddress(e) {
    const that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              that.setLocation();
            }
          })
        } else {
          that.setLocation();
        }
      }
    });
  },

  handleShowImportantInfo() {
    this.setData({
      showImportantInfo: true
    });
  },

  handleDiglogIKnow(e) {
    this.setData({
      showImportantInfo: false
    });
  }
})