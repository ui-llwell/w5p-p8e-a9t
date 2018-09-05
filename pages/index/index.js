
// /pages/index/index.js
import T from '../../utils/i18n'
var util = require('../../utils/util.js')
import event from '../../utils/event'
//获取应用实例
const app = getApp()

Page({
  data: {
    language: '',
    index: {},
    languages: ['zh', 'ko'],
    langIndex: 0,
  },
  onLoad: function () {
    this.setData({
      langIndex: wx.getStorageSync('langIndex')
    });
    this.setLanguage();
    // ...
  },
  setLanguage() {
    console.log('sss',wx.T.getLanguage())
    this.setData({
      index: wx.T.getLanguage().index
    });
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  ss:function(){
    wx.navigateTo({
      url: '../test/test'
    })
  },
  change:function(){
    const curLangIndex = this.data.langIndex == 0 ? 1 : 0
    this.setData({
      langIndex: curLangIndex
    })
    console.log(curLangIndex)
    wx.T.setLocaleByIndex(curLangIndex);
    this.setLanguage();
    event.emit('languageChanged');
    // wx.T.setLocale(this.data.lang[this.data.langIndex])
    //   this.setData({
    //     index: wx.T._('index'),
    //   })
  },
 
  // onLoad: function () {
  //   console.log(wx.getStorageSync('langIndex'))
  //   this.setData({
  //     langIndex: wx.getStorageSync('langIndex')
  //   });
  //   this.setLanguage();

  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse){
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  // },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
