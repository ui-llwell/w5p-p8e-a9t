
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
    // console.log(options);
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
    
    if (this.data.shop == null) {
      if (wx.getStorageSync('langCode') == 'ko') {
        wx.showToast({
          title: '정확한 류렌QR코드 여부를 확인후 회원가입을 하시고  도움이 필요시 고겍센터에 문의를 하십시오',
          icon: 'none',
          duration: 2500
        })
      } else {
        wx.showToast({
          title: '请扫描正确的流连合作店铺码进行注册，如果有问题，请联系流连客服。',
          icon: 'none',
          duration: 2500
        })
      }
    }else{
    app.Ajax(
      'Users',
      'POST', 
      'BindShop',
      { shopCode: this.data.shop, ...e.detail.userInfo },
      function (json) {
        // console.log(json);
        if (json.success) {
          if (wx.getStorageSync('langCode') == 'ko') {
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
          if (wx.getStorageSync('langCode') == 'ko') {
            wx.showToast({
              title: '회원가입 실패 하였습니다',
              icon: 'loading',
              duration: 2500
            })
          }else{
            wx.showToast({
              title: '注册失败',
              icon: 'loading',
              duration: 2500
            })
          }
          
          console.log('注册失败')
        }

      }
    );

    }
    
  }
})
