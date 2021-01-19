//index.js
const app = getApp();

const isAtSchool = wx.getStorageSync('isAtSchool');
const homeAddress = wx.getStorageSync('homeAddress');
const dataAtHome = {
  sfzx: 0,
  tw: 1,
  area: `${homeAddress.province} ${homeAddress.city} ${homeAddress.district}`,
  city: homeAddress.city,
  province: homeAddress.province,
  address: homeAddress.completedAddress,
  geo_api_info: {
    "type": "complete",
    "info": "SUCCESS",
    "status": 1,
    "position": {
      "Q": homeAddress.latitude,
      "R": homeAddress.longitude,
      "lng": homeAddress.longitude,
      "lat": homeAddress.latitude
    },
    "message": "Get ipLocation success.Get address success.",
    "location_type": "ip",
    "accuracy": null,
    "isConverted": true,
    "addressComponent": {
      "citycode": "",
      "adcode": "",
      "neighborhoodType": "",
      "neighborhood": "",
      "building": "",
      "buildingType": "",
      "street": homeAddress.street,
      "streetNumber": "2号",
      "country": "中国",
      "province": homeAddress.province,
      "city": homeAddress.city,
      "district": homeAddress.district,
    },
    "formattedAddress": homeAddress.completedAddress,
    "roads": [],
    "crosses": [],
    "pois": []
  },
  sfcyglq: 0,
  sfyzz: 0,
  qtqk: '',
  ymtys: 0,
};
const dataAtSchool = {
  sfzx: 1,
  tw: 1,
  area: "陕西省 西安市 雁塔区",
  city: "西安市",
  province: "陕西省",
  address: "陕西省西安市雁塔区电子城街道西安电子科技大学(北校区)",
  geo_api_info: {
    "type": "complete",
    "info": "SUCCESS",
    "status": 1,
    "position": {
      "Q": 34.2325,
      "R": 108.91436399999999,
      "lng": 108.9144,
      "lat": 34.2325
    },
    "message": "Get ipLocation success.Get address success.",
    "location_type": "ip",
    "accuracy": null,
    "isConverted": true,
    "addressComponent": {
      "citycode": "029",
      "adcode": "610113",
      "businessAreas": [{
        "name": "电子城",
        "id": "610113",
        "location": {
          "Q": 34.205716,
          "R": 108.91483199999999,
          "lng": 108.914832,
          "lat": 34.205716
        }
      }],
      "neighborhoodType": "",
      "neighborhood": "",
      "building": "",
      "buildingType": "",
      "street": "太白南路",
      "streetNumber": "2号",
      "country": "中国",
      "province": "陕西省",
      "city": "西安市",
      "district": "雁塔区",
      "township": "电子城街道"
    },
    "formattedAddress": "陕西省西安市雁塔区电子城街道太白南路2号西安电子科技大学(北校区)",
    "roads": [],
    "crosses": [],
    "pois": []
  },
  sfcyglq: 0,
  sfyzz: 0,
  qtqk: '',
  ymtys: 0,
};

Page({
  data: {
    cookies: "",
    canSignIn: false,
  },

  onShow: function () {
    this.setData({
      canSignIn: (wx.getStorageSync('username').length) > 0,
    });
  },

  testdaka() {
    const submitData = isAtSchool ? dataAtSchool : dataAtHome;
    const username = wx.getStorageSync('username');
    const password = wx.getStorageSync('password');
    console.log(submitData);
    wx.request({
      url: 'https://xxcapp.xidian.edu.cn/uc/wap/login/check',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        username,
        password,
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
                title: '打卡成功!',
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