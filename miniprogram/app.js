//app.js
App({
  globalData: {
    commonDataAtSchool: {
      address: "陕西省西安市雁塔区电子城街道西安电子科技大学(北校区)",
      sfcyglq: 0, //是否处于隔离期
      sfzx: 1, //是否在校
      geo_api_info: {
        "type": "complete",
        "info": "SUCCESS",
        "status": 1,
        "position": {
          "Q": 34.2325,
          "R": 108.9144,
          "lng": 108.9144,
          "lat": 34.2325
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
          "street": "太白南路",
          "streetNumber": "2号",
          "country": "中国",
          "province": "陕西省",
          "city": "西安市",
          "district": "雁塔区",
        },
        "formattedAddress": "陕西省西安市雁塔区电子城街道太白南路2号西安电子科技大学(北校区)",
        "roads": [],
        "crosses": [],
        "pois": []
      },
      area: "陕西省 西安市 雁塔区",
      city: "西安市",
      province: "陕西省",
    },
  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }
    const homeAddress = wx.getStorageSync('homeAddress');
    this.globalData.commonDataAtHome = {
      address: homeAddress.completedAddress,
      sfcyglq: 0, //是否处于隔离期
      sfzx: 0, //是否在校
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
      area: `${homeAddress.province} ${homeAddress.city} ${homeAddress.district}`,
      city: homeAddress.city,
      province: homeAddress.province,
    }
    // console.log(this.globalData.commonDataAtSchool, this.globalData.commonDataAtHome);
  }
})