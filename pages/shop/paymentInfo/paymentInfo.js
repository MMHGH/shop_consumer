// pages/shop/paymentInfo/paymentInfo.js
const server = require('../../../server/server.js')
const API = require('../../../server/api.js')
const tips = require("../../../utils/tips");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'',
    phone:'',
    errorMsgName:'',
    errorMsgPhone:'',
    totalPrice:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ totalPrice: options.totalPrice });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getRecentContacts();
  },
  getRecentContacts(){
    server.getRequest(API.getRecentContacts,{}).then(res => {
      if(res.code == 100){
        if(res.data){
          this.setData({
            userName: res.data.contactName,
            phone: res.data.contactNumber
          });
        }
      }
    })
  },
  getName(e){
    this.setData({ userName: e.detail });
  },
  getPhone(e){
    this.setData({ phone: e.detail });
  },
  // 付款
  payment(){
    var that=this
    this.setData({ errorMsgName: '' });
    this.setData({ errorMsgPhone: '' });
    if(!this.data.userName){
       this.setData({ errorMsgName: '请输入姓名' });
       return
    }
    if(!this.data.phone){
       this.setData({ errorMsgPhone: '请输入手机号' });
       return
    }
    if(!(/^1[34578]\d{9}$/.test(this.data.phone))){
       this.setData({ errorMsgPhone: '手机号格式错误' });
       return
    }
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        that.pay();
      },
    })
  },
  pay(){
    let params = {
        contactName:this.data.userName,
        contactNumber:this.data.phone,
        formId:'',
        shopId:wx.getStorageSync('shopId'),
    }
    server.postRequest(API.orderWxPay,params).then(res => {
      console.log('数据返回',res.data,res.data['timeStamp']);
      if(res.code == 100){
        wx.requestPayment({
          timeStamp: res.data['timeStamp'],
          nonceStr: res.data['nonceStr'],
          package: 'prepay_id='+res.data['prepayId'],
          signType: 'MD5',
          paySign: res.data['paySign'],
          success:function(successret){
              if (successret.errMsg == "requestPayment:ok") {
                  // 发送请求
                  tips.showSuccess("支付成功!"), setTimeout(function () {
                      wx.navigateTo({
                          url: "/pages/myCenter/myCenter"
                      })
                  }, 500)
              }
          },
          fail:function(res){
            if (res.errMsg == "requestPayment:fail cancel") {
              wx.showToast({title: '取消支付', icon: "success", duration: 2e3})
            }
          }
        })
      }
    })
  }
})