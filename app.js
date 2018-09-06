//app.js

import locales from './utils/locales'
import T from './utils/i18n'

T.registerLocale(locales);
T.setLocaleByIndex(wx.getStorageSync('langIndex') || 0);
wx.T = T

App({
  onLaunch: function () {
    var isDebug = true;//调试状态使用本地服务器，非调试状态使用远程服务器
    if (!isDebug) {
      //远程域名
      wx.setStorageSync('domainName', "https://wxapp.llwell.net/api/PG/")
    }
    else {
      //本地测试域名
      wx.setStorageSync('domainName', "http://localhost:54286/api/PG/")
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
            console.log(json);
            if (json.success) {
              wx.setStorageSync('token', json.data.token);
              console.log(json.data.token);
            } else {

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
      title: '加载中'
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