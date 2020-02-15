//app.js

App({
  onLaunch: function() {    
    //调用API从本地缓存中获取数据
    wx.getSetting({
  success(res) {
    if (!res.authSetting['scope.record']) {
      wx.authorize({
        scope: 'scope.record',
        success () {
          // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
          wx.startRecord()
        }
      })
    }
  }
})
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
      console.log(this.globalData.userInfo,1)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          wx.setStorageSync('userInfo',res.userInfo)
          console.log('userInfo',wx.getStorageSync('userInfo'))
          typeof cb == "function" && cb(that.globalData.userInfo)
          console.log(that.globalData.userInfo, 1)
        },
         fail: function (res) {
            console.log(res)
              wx.showModal({
                  title: '程序异常',
                  content: res,
              })
          }
      })
    }
  },
  onLoad: function() {
    
  },
  globalData: {
    userInfo: null,
    location: "",
    city: '',
    address: '',
    buycar_num: 0,
    totalMoney: 0,
    totalSecond: 899,
    serverDomin: "http://ais580.com:8443/",
    version: "1.0.0",
    shareProfile: '小飞侠', // 首页转发的时候话术
  }
})
