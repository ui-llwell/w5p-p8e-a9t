// pages/shop/shop.js
import T from '../../utils/i18n'
var util = require('../../utils/util.js')
import event from '../../utils/event'
var QRCode = require('../../utils/weapp-qrcode.js')

var qrcode;
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop: {},
    languages: ['zh', 'ko'],
    langIndex: 0,
    shopName:'',
    shopRate:'',
    shopCode:''

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      langIndex: wx.getStorageSync('langIndex') || 0
    });
    // this.setLanguage();

    // this.getShop();
  },
  
  setLanguage() {
    this.setData({
      shop: wx.T.getLanguage().shop
    });
    wx.setNavigationBarTitle({
      title: wx.T.getLanguage().shop.navigationBarTitle
    });
    wx.setTabBarItem({
      index: 0,
      text: wx.T.getLanguage().tabbar.itemText1
    });
    wx.setTabBarItem({
      index: 1,
      text: wx.T.getLanguage().tabbar.itemText2
    })
  },
  getShop: function () {
    var that = this;
    app.Ajax(
      'Shop',
      'POST',
      'GetShop',
      { lang: wx.getStorageSync('langCode') },
      function (json) {
        // console.log('json', json);
        if (json.success) {
          wx.sendSocketMessage({
            data: 'getPayState:' + json.data.shopCode
          })
          wx.setStorageSync('shopId', json.data.shopId)
          that.setData({
            shopName: json.data.shopName,
            shopRate: json.data.shopRate,
            shopCode: json.data.shopCode
          });

          qrcode = new QRCode('canvas', {
            // usingIn: this,
            text: that.data.shopCode,
            width: 230,
            height: 230,
            colorDark: "#000",
            colorLight: "white",
            correctLevel: QRCode.CorrectLevel.H,
          });


        } else {
          console.log('')
        }

      }
    );
  },
  changeLanguage: function () {
    console.log('sdsds')
    const curLangIndex = this.data.langIndex == 0 ? 1 : 0
    this.setData({
      langIndex: curLangIndex
    })
    // console.log(curLangIndex)
    wx.T.setLocaleByIndex(curLangIndex);
    this.setLanguage();
    event.emit('languageChanged');
    this.getShop();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
 

  onShow: function () {
    this.setLanguage();
    
    const that = this;
    wx.connectSocket({
      url: 'wss://wxapp.llwell.net/api/PG/ws'
    })

    wx.onSocketOpen(function (res) {
      that.getShop();

    })

    wx.onSocketMessage(function (res) {
      const that = this;
      // console.log(res);

      wx.showToast({
        title: '已付款成功',
        duration: 3000,
        success: function () {
          setTimeout(function () {
            app.Ajax(
              'Shop',
              'POST',
              'GetShop',
              { lang: wx.getStorageInfoSync('langCode')},
              function (json) {
                // console.log('GetScanCode',json);
                if (json.success) {
                  wx.sendSocketMessage({
                    data: 'getPayState:' + json.data.shopCode
                  })
                  qrcode.makeCode(json.data.shopCode)
                }
              }
            )
          }, 1500)
          // 
        }
      });
    })


  },
  onHide: function () {
    wx.closeSocket(function (rea) {
      console.log(rea)
    })
    wx.onSocketClose(function (res) {
      console.log('WebSocket 已关闭！')
    })

  },
  
  goToDetails: function () {
    wx.navigateTo({
      url: '../details/details'
    })
  }
})
