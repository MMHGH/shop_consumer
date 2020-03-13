//app.js
const server = require('./server/server.js')
const API = require('./server/api.js')

App({
  onLaunch: function () {
    
  },
  onShow(){
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.login(res);
      }
    })
  },
  login(res){
    server.postRequest(API.getSessionKey,{code:res.code}).then(res => {
        if (res.code == 100) {
          wx.setStorageSync('sessionKey', res.data.session_key)
          wx.setStorageSync('openid', res.data.openid)
          server.postRequest(API.login,{}).then(res1 => {
            if (res1.code == 100) {
              wx.setStorageSync('userToken', res1.data.userToken)
              wx.setStorageSync('level', res1.data.level)
              wx.setStorageSync('point', res1.data.point)
              wx.setStorageSync('status', res1.data.status)//是否绑定手机号
            }
          })
        }
    })
  },
  globalData: {
    userInfo: null
  }
})