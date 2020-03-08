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
    console.log('app.js页面触发')
  },
  login(res){
    let params = {
      code: res.code
    }
    // server.getRequest(API.getVideoPage,params).then(res => {
        // if (res.code == 100) {
        //   wx.setStorageSync('sessionkey', res.data.session_key)
        //   wx.setStorageSync('openId', res.data.openid)
        //   wx.setStorageSync('memberId', res.data.memberId)
        //   wx.setStorageSync('token', res.data.token)
        // }
    // })

  },
  globalData: {
    userInfo: null
  }
})