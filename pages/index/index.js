
// /pages/index/index.js
import T from '../../utils/i18n'
var util = require('../../utils/util.js')
import event from '../../utils/event'
//获取应用实例
const app = getApp()

Page({
  data: {
    shop: null,
    language: '',
    index: {},
    languages: ['zh', 'ko'],
    langIndex: 0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onShow: function () {
    this.setLanguage();
  },
  onLoad: function (options) {
    this.setData({
      langIndex: wx.getStorageSync('langIndex') || 0
    });
    this.setLanguage();
    console.log(options);
    this.setData({
      shop: options.shop
    })
    // ...
  },
  setLanguage() {
    this.setData({
      index: wx.T.getLanguage().index
    });
    wx.setNavigationBarTitle({
      title: wx.T.getLanguage().index.navigationBarTitle
    });
  },
  //事件处理函数
  bindGetUserInfo: function (e) {
    var that = this;
    //此处授权得到userInfo
    // console.log(e.detail.userInfo);
    //接下来写业务代码
    app.Ajax(
      'Users',
      'POST', 
      'BindShop',
      { shopCode: this.data.shop, ...e.detail.userInfo },
      function (json) {
        // console.log(json);
        if (json.success) {
          if (wx.getStorageSync('langIndex') == 1) {
            wx.showToast({
              title: '회원가입 되었습니다',
              duration: 1500
            })
          }else{
            wx.showToast({
              title: '注册成功',
              duration: 1500
            })
          }
          
          wx.switchTab({
            url: '../record/record',
          })

        } else {
          if (wx.getStorageSync('langIndex') == 1) {
            wx.showToast({
              title: '회원가입 실패 하였습니다',
              icon: 'loading',
              duration: 1500
            })
          }else{
            wx.showToast({
              title: '注册失败',
              icon: 'loading',
              duration: 1500
            })
          }
          
          console.log('ssssssss')
        }

      }
    );
    //最后，记得返回刚才的页面
    // wx.navigateBack({
    //   delta: 1
    // })
    
  }
})
