//index.js
//获取应用实例
const app = getApp()
const server = require('../../server/server.js')
const API = require('../../server/api.js')

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    show:false,
    isLogin:true,
    list:[
      {
        url:'https://imgtest-1257418739.cos.ap-guangzhou.myqcloud.com/userFile/392/2019-04-18/87374a5f-1a86-4721-8570-322d0e7e034f.jpg',
        text:'深圳市南山区桂庙新村61-1-1'
      },
      {
        url:'https://imgtest-1257418739.cos.ap-guangzhou.myqcloud.com/userFile/392/2019-04-18/87374a5f-1a86-4721-8570-322d0e7e034f.jpg',
        text:'深圳市南山区桂庙新村61-1-1'
      },
      {
        url:'https://imgtest-1257418739.cos.ap-guangzhou.myqcloud.com/userFile/392/2019-04-18/87374a5f-1a86-4721-8570-322d0e7e034f.jpg',
        text:'深圳市南山区桂庙新村61-1-1'
      }
    ]
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow(){
    let params = {
      apikey:'0df993c66c0c636e29ecbb5344252a4a',
      start:1,
      count:10
    }
    // server.getRequest(API.getVideoPage,params).then(res => {
    // })
  },
  // 校验权限
  checkAuth() {
    if(this.data.isLogin){
      wx.navigateTo({
        url:"/pages/shop/shopHome/shopHome"
      })
    }else{
      this.setData({ show: true });
    }
  },
  getPhoneNumber: function (e) {//点击获取手机号码按钮
    var that = this;
    wx.checkSession({
      success: function () {
        var ency = e.detail.encryptedData;
        var iv = e.detail.iv;
        var sessionk = that.data.sessionKey;
        if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
          that.setData({
             show: false
          });
        } else {//同意授权
            // 请求接口，解密回来手机号，保存起来
        }
      },
      fail: function () {
        // that.wxlogin(); //重新登录
      }
    });
  },
  onClose() {
    this.setData({ show: false });
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
