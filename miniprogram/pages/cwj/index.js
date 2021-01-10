//index.js
const app = getApp();
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
  },

  onLoad: function () {},


  onGetUserInfo: function (e) {

  },

  onGetOpenid: function () {

  },

  testdaka() {
    console.log('fdaf');
    const that = this;
    wx.request({
      url: 'https://xxcapp.xidian.edu.cn/uc/wap/login/check',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        username: '',
        password: ''
      },
      enableCache: true,
      success(res) {
        console.log(res);
        // that.setData({
        //   cookies: res.header['Set-Cookie']
        // })
        // console.log(that.data.cookies);
        wx.request({
          url: 'https://xxcapp.xidian.edu.cn/xisuncov/wap/open-report/save',
          method: 'POST',
          header: {
            'cookie': res.header['Set-Cookie'],
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: that.data.submitData,
          success(res) {
            console.log(res);
          }
        })
      }
    })
  }
})