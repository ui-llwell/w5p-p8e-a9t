// pages/record/record.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({

  /**
   * 页面的初始数据
   */
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  data: {
    tabs: ["添加消费记录", "添加退费记录"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    scanninga:'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/PurchasingAssistantShop/top_icon_scan_pink_normal@3x.png',
    scanningb: '',
    scanningc: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/PurchasingAssistantShop/top_icon_scan_blue_normal@3x.png',
    scanningd: '',
    atempFilePaths: '',
    ainput_money: '',
    ainput_text: '',
    btempFilePaths: '',
    binput_money: '',
    binput_text: '',
  },
  onLoad: function () {
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
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },


  // 添加消费记录-点击拍照或选择相册图片
  chooseimage: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#000",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },
  chooseWxImage: function (type) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res);
        that.setData({
          atempFilePaths: res.tempFilePaths[0],
        })
      }
    })
  },

  // 添加消费记录清空
  empty: function(){
    this.setData({ 
      ainput_money: '',
      ainput_text: '',
      atempFilePaths: '',
      scanningb: ''
      })
  },
  
  //添加消费记录扫描二维码 成功或失败
  toSweepOrder: function () {
    wx.scanCode({
      success: (res) => {
        console.log(111)
        this.setData({
          scanningb: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/PurchasingAssistantShop/top_icon_scan_pink_selected@3x.png',
        })
      },
      fail: (res) => {
        console.log(res);
      }
    })
  },

  //添加消费记录 图片放大缩小展示代码
  // showModal和hideModal函数可以合并为一个函数，需要在组件中设置状态值
  setModalStatus: function (e) {
    console.log("设置显示状态，1显示0不显示", e.currentTarget.dataset.status);
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export()
    })
    if (e.currentTarget.dataset.status == 1) {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation
      })
      if (e.currentTarget.dataset.status == 0) {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)
  },
  
 //**************** 
//  一下是添加退费记录.js
//*****************
//添加退费记录清空数据
emptyb: function () {
    this.setData({
      binput_money: '',
      binput_text: '',
      btempFilePaths: '',
      scanningd: ''
    })
  },

  //  添加退费记录点击拍照或选择相册图片
  chooseimageb: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#000",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImageb('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImageb('camera')
          }
        }
      }
    })
  },

  chooseWxImageb: function (type) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res);
        that.setData({
          btempFilePaths: res.tempFilePaths[0],
        })
      }
    })
  },
  
  // 添加退费记录 扫描二维码
  toSweepOrderb: function () {
    wx.scanCode({
      success: (res) => {
        this.setData({
          scanningd: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/PurchasingAssistantShop/top_icon_scan_blue_selected@3x.png',
        })
      },
      fail: (res) => {
        console.log(res);
      }
    })
  },

  // 添加退费记录 图片放大缩小展示代码
  setModalStatusb: function (e) {
    console.log("设置显示状态，1显示0不显示", e.currentTarget.dataset.status);
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export()
    })
    if (e.currentTarget.dataset.status == 1) {
      this.setData(
        {
          showModalStatusb: true
        }
      );
    }
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation
      })
      if (e.currentTarget.dataset.status == 0) {
        this.setData(
          {
            showModalStatusb: false
          }
        );
      }
    }.bind(this), 200)
  },






})
