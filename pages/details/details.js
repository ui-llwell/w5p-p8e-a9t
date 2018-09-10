// pages/details/details.js

import event from '../../utils/event'
import T from '../../utils/i18n'
var sliderWidth = 40; // 需要设置slider的宽度，用于计算中间位置

Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["", "", ""],
    details:{},
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    show: false,


    allList:[
      //  0未返利1已返利 0消费1退费
      { name: '大红花', time: '2015-02-12', payIf: 0, coOrRe: 1, custome: '1000', rebatesDot: '1%', rebate: '100', credentials: '111111111111111', url: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/A-test/photo.png'},
      { name: '红花', time: '2015-02-12', payIf: 1, coOrRe: 1, custome: '2000', rebatesDot: '2%', rebate: '200', credentials: '222222222222222', url: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/A-test/photo.png'},
      { name: '花', time: '2015-02-12', payIf: 0, coOrRe: 0, custome: '3000', rebatesDot: '3%', rebate: '300', credentials: '333333333333333', url: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/A-test/photo.png'},
      { name: '大', time: '2015-02-12', payIf: 1, coOrRe: 0, custome: '4000', rebatesDot: '4%', rebate: '400', credentials: '444444444444444', url: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/A-test/photo.png'},
    ],
    customeAll:'5596800',
    refundAll: '96800',
    rebateAll: '6800',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setLanguages();

    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  setLanguages() {
    console.log('record')
    this.setData({
      details: wx.T.getLanguage().details
    });
    wx.setNavigationBarTitle({
      title: wx.T.getLanguage().details.navigationBarTitle
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  //  点击查看图片
  checkImg:function(){
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
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

  }
})