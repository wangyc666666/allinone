var app = getApp()
var templates_js = require('../../templates/components.js');
Page({
  data: {
    block: false,
    send_price:3,
    youhui_price:0,
    canhei_price:1,
    restaurant: false,
    check: true,
    buyInfo:[],
    serverImg:app.globalData.serverDomin +'medias/',
  },
  calling: function() {
    wx.makePhoneCall({
      phoneNumber: '18316588252', 
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  onLoad:function(){
    var that=this;
    var buyInfo = wx.getStorageSync('buyInfo');
    var buycar_num = wx.getStorageSync('buycar_num');
    var totalMoney = parseInt(wx.getStorageSync('totalMoney'))+that.data.send_price - that.data.youhui_price+
        that.data.canhei_price*buycar_num;
    console.log('buyInfo',buyInfo,'totalMoney',totalMoney,that.data.send_price,that.data.youhui_price,that.data.canhei_price*buycar_num);
    that.setData({
      buyInfo:buyInfo,
      buycar_num:buycar_num,
      totalMoney:totalMoney
    })
  },
  Block: function() {
    this.setData({
      block: true
    })
  },
  takeOut: function(){
    this.setData({
      restaurant: false
    })
  },
  Cancel: function() {
    this.setData({
      block: false,
      check: true,
      restaurant: false
    })
  },
  Ok: function () {
    var that = this; 
    this.setData({
      block: false,
    })
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res);
        that.setData({                    
          restaurant: true
        })
      },
      fail: (res) => {
        that.setData({
          restaurant: false,
          check: true
        });    
      }
    })
  },
  toMyPackage: function() {
    wx.navigateTo({
      url: '../myPackage/myPackage',
    })
  },
  toMyAddress: function () {
    wx.navigateTo({
      url: '../address/address',
    })
  },
  submitOrder: function() {
    wx.requestPayment({
      'timeStamp': '',
      'nonceStr': '',
      'package': '',
      'signType': 'MD5',
      'paySign': '',
      'success': function (res) {
      },
      'fail': function (res) {
      }
    })
  }
})