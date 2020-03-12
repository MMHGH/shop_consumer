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
    isLogin:false,
    type:'center',
    list:[
      // {
      //   banner:'https://imgtest-1257418739.cos.ap-guangzhou.myqcloud.com/userFile/392/2019-04-18/87374a5f-1a86-4721-8570-322d0e7e034f.jpg',
      //   text:'深圳市南山区桂庙新村61-1-1'
      // },
      // {
      //   banner:'https://imgtest-1257418739.cos.ap-guangzhou.myqcloud.com/userFile/392/2019-04-18/87374a5f-1a86-4721-8570-322d0e7e034f.jpg',
      //   text:'深圳市南山区桂庙新村61-1-1'
      // },
      // {
      //   banner:'https://imgtest-1257418739.cos.ap-guangzhou.myqcloud.com/userFile/392/2019-04-18/87374a5f-1a86-4721-8570-322d0e7e034f.jpg',
      //   text:'深圳市南山区桂庙新村61-1-1'
      // }
    ]
  },
  onLoad: function () {
    this.getListShop();
  },
  onShow(){
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
    if(isBindPhone){
      wx.navigateTo({
        url:this.data.type == 'center'?"/pages/myCenter/myCenter":"/pages/shop/shopHome/shopHome"
      })
    }else{
      this.setData({ show: true });
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
            server.postRequest(API.login,{phone:res.data.phoneNumber}).then(res1 => {
              if (res1.code == 100) {
                let phone = res.data.phoneNumber
                wx.setStorageSync('phone', phone)
                wx.setStorageSync('userToken', res1.data.userToken)
                wx.navigateTo({
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
})
