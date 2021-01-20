//index.js
const app = getApp();

const cwjData = {
  tw: 1,
  sfyzz: 0,
  qtqk: '',
  ymtys: 0,
};

const yqtData = {
  szgjcs: '',
  szcs: '',
  szgj: '',
  zgfxdq: 0, // 中高风险地区
  mjry: 0, //密接人员
  csmjry: 0, //曾是密接人员
  tw: 2, //体温
  sfcxtz: 0, //是否出现特征
  sfjcbh: 0, // 是否接触病患
  sfcxzysx: 0, //是否出现注意事项
  qksm: '',
  sfyyjc: 0,//是否医院检查
  jcjgqr: 0,//检查结果确认
  remark: '',
  sfjcwhry: 0, //是否接触武汉人员
  sfjchbry: 0, //是否接触河北人员
  gllx: '',
  glksrq: '',
  jcbhlx: '',
  jcbhrq: '',
  ismoved: 0, //是否移动了
  bztcyy: '',
  sftjhb: 0, //是否途径河北
  sftjwh: 0, //是否途径武汉
  sfjcjwry: 0, //是否接触境外人员
  jcjg: '',
};

Page({
  data: {
    cookies: "",
    canSignIn: false,
    isAtSchool: false,
    username: '',
    password: ''
  },

  onShow: function () {
    this.setData({
      isAtSchool: wx.getStorageSync('isAtSchool'),
      username: wx.getStorageSync('username'),
      password: wx.getStorageSync('password'),
      canSignIn: (wx.getStorageSync('username').length) > 0,
    });
  },

  signInCWJ() {
    const submitData = {};
    Object.assign(submitData, cwjData, this.data.isAtSchool ? app.globalData.commonDataAtSchool : app.globalData.commonDataAtHome);
    console.log(this.data.isAtSchool);
    console.log(submitData);
    wx.request({
      url: 'https://xxcapp.xidian.edu.cn/uc/wap/login/check',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        username: this.data.username,
        password: this.data.password,
      },
      enableCache: true,
      success(res) {
        if (res.data.e !== 0) {
          wx.showToast({
            title: res.data.m,
            icon: 'none'
          });
          return;
        }
        wx.request({
          url: 'https://xxcapp.xidian.edu.cn/xisuncov/wap/open-report/save',
          method: 'POST',
          header: {
            'cookie': res.header['Set-Cookie'],
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: submitData,
          success(res) {
            console.log(res);
            if (res.data.e === 0) {
              wx.showToast({
                title: '晨午检打卡成功!',
                icon: 'success'
              })
            } else {
              wx.showToast({
                title: res.data.m,
                icon: 'none'
              });
            }
          }
        })
      }
    });
  },

  signInYQT() {
    const submitData = {};
    Object.assign(submitData, yqtData, this.data.isAtSchool ? app.globalData.commonDataAtSchool : app.globalData.commonDataAtHome);
    console.log(this.data.isAtSchool);
    console.log(submitData);
    wx.request({
      url: 'https://xxcapp.xidian.edu.cn/uc/wap/login/check',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        username: this.data.username,
        password: this.data.password,
      },
      enableCache: true,
      success(res) {
        if (res.data.e !== 0) {
          wx.showToast({
            title: res.data.m,
            icon: 'none'
          });
          return;
        }
        wx.request({
          url: 'https://xxcapp.xidian.edu.cn/ncov/wap/default/save',
          method: 'POST',
          header: {
            'cookie': res.header['Set-Cookie'],
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: submitData,
          success(res) {
            console.log(res);
            if (res.data.e === 0) {
              wx.showToast({
                title: '疫情通打卡成功!',
                icon: 'success'
              })
            } else {
              wx.showToast({
                title: res.data.m,
                icon: 'none'
              });
            }
          }
        })
      }
    })
  }
})