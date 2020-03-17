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
    
    showUserInfo:false,
    show:false,
    isLogin:false,
    type:'center',
    list:[],
    userTips:'为提供优质的服务,塔兔需获取\n以下信息',
    userInfo:{}
  },
  onLoad: function () {
    // this.login();
    this.getListShop();
    //是否授权过用户信息
    let that = this;
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              that.setData({
                userInfo: res.userInfo,
                showUserInfo: false,
              })
              wx.setStorageSync('avatarUrl',res.userInfo.avatarUrl)
            }
          })
        }
      }
    })
  },
  getUserInfo: function(e) {
    var that = this;
    if (e.detail.userInfo) {
      that.setData({
        userInfo: e.detail.userInfo,
        showUserInfo: false
      })
      wx.setStorageSync('avatarUrl',e.detail.userInfo.avatarUrl)
      let isBindPhone =  Number(wx.getStorageSync('status'));
      if(isBindPhone){
        wx.redirectTo({
          url:this.data.type == 'center'?"/pages/myCenter/myCenter":"/pages/shop/shopHome/shopHome"
        })
      }
    } else {
      console.log("获取信息失败")
      wx.showToast({
        title: "未获得信息",
        icon: 'none',
      })
    }
  },
  getListShop(){
    let params = {}
    server.postRequest(API.listShop,params).then(res => {
      if(res.code == 100){
        this.setData({ list: res.data });
      }
    })
  },
  // 校验权限
  checkAuth(e) {
    let isBindPhone =  Number(wx.getStorageSync('status'));
    this.setData({ type: e.currentTarget.dataset.type });
    wx.setStorageSync('shopId', e.currentTarget.dataset.id)
    wx.setStorageSync('shopName', e.currentTarget.dataset.shopname)
    if(this.data.type == 'home'){
      // 存储店铺主页banner图
      wx.setStorageSync('bannerUrl', e.currentTarget.dataset.banner)
    }
    if(!this.data.userInfo.avatarUrl){
      this.setData({ showUserInfo: true });
    }else if(!isBindPhone){
      this.setData({ show: true });
    }else{
      wx.redirectTo({
        url:this.data.type == 'center'?"/pages/myCenter/myCenter":"/pages/shop/shopHome/shopHome"
      })
    }
  },
  getPhoneNumber: function (e) {
    var that = this;
    // 之前开发就是因为sessionKey，是我登录的时候存的缓存，导致，只有第二次授权才能成功，第二次授权是重新登录的
    if (e.detail.iv == null || e.detail.encryptedData == null) {
        wx.showToast({
          title: "授权失败,请重新授权！",
          icon: 'none',
        })
        return false
    }
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      // 请求接口，解密回来手机号，保存起来
      let params = {
        encryptedData:e.detail.encryptedData,
        iv: e.detail.iv,
        sessionKey: wx.getStorageSync('sessionKey')
      }
      server.postRequest(API.getWXPhone,params).then(res => {
          if(res.code == 100){
            let userInfo = {
              nickname:this.data.userInfo.nickname,
              headImgUrl:this.data.userInfo.avatarUrl,
              phone:res.data.phoneNumber
            }
            server.postRequest(API.login,userInfo).then(res1 => {
              if (res1.code == 100) {
                let phone = res.data.phoneNumber
                wx.setStorageSync('phone', phone)
                wx.setStorageSync('status', res1.data.status)//是否绑定手机号
                wx.setStorageSync('userToken', res1.data.userToken)
                wx.redirectTo({
                  url:this.data.type == 'center'?"/pages/myCenter/myCenter":"/pages/shop/shopHome/shopHome"
                })
                that.setData({
                  show: false
                });
              }
            })
          }
      })
    }else{
      that.setData({
        show: false
      });
    }
  },
  onClose() {
    this.setData({ show: false });
  },
  closeUser(){
    this.setData({ showUserInfo: false });
  }
})
