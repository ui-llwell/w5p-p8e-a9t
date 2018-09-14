//app.js

import locales from './utils/locales'
import T from './utils/i18n'

T.registerLocale(locales);
T.setLocaleByIndex(wx.getStorageSync('langIndex') || 1);
wx.T = T

App({
  onLaunch: function (options) {
    var isDebug = false;//true调试状态使用本地服务器，非调试状态使用远程服务器
    if (!isDebug) {
      //远程域名
      wx.setStorageSync('domainName', "https://wxapp.llwell.net/api/PG/")
    }
    else {
      //本地测试域名
      wx.setStorageSync('domainName', "http://192.168.0.11:55734/api/PG/")
    }
    
    // 登录
    wx.login({
      success: res => {
        
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.Ajax(
          'Open',
          'POST',
          'Login',
          { code: res.code },
          function (json) {
            // console.log('~~~',json);
            if (json.success) {
              
              wx.setStorageSync('token', json.data.token);
              // console.log(json.data.token);
              if (json.data.isReg){
                wx.switchTab({
                  url: '../record/record',
                })
              }else{
                // console.log(options);
                if (options.query.shop === undefined){
                  wx.redirectTo({
                    url: '../index/index'
                  })
                }
                
              }

            } else {
              if (wx.getStorageSync('langIndex') == 1){
                wx.showToast({
                  title: '로그인 실패 하였습니다',
                  icon: 'none',
                  duration: 1500
                })
              }else{
                wx.showToast({
                  title: '登录失败',
                  icon: 'none',
                  duration: 1500
                })
              }
              
              console.log(json.msg.code);
              console.log(json.msg.msg);
            }

          }
        );
      }
    })
  },
  Ajax: function (url, type, method, data, callback) {
    wx.showLoading({
      title: 'loading'
    });
    var send = {
      token: wx.getStorageSync('token'),
      method: method,
      lang: wx.getStorageSync('langCode'),
      param: data,
    };
    wx.request({
      url: wx.getStorageSync('domainName') + url,
      data: send,
      method: type, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json' // 默认值
      }, // 设置请求的 header
      success: function (res) {
        // 发送请求成功执行的函数
        if (typeof callback === 'function') {
          callback(res.data);
        }
      },
      fail: function (res) {
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  }
})