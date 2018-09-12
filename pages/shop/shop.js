// pages/shop/shop.js
import T from '../../utils/i18n'
var util = require('../../utils/util.js')
import event from '../../utils/event'
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      langIndex: wx.getStorageSync('langIndex') || 0
    });
    // this.setLanguage();

    this.getShop();
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
      { lang: wx.getStorageInfoSync('langCode') },
      function (json) {
        console.log('json', json);
        if (json.success) {
          wx.setStorageSync('shopId', json.data.shopId)
          that.setData({
            shopName: json.data.shopName
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
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
  goToDetails: function () {
    wx.navigateTo({
      url: '../details/details'
    })
  }
})
