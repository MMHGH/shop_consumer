// pages/shop/paymentInfo/paymentInfo.js
const server = require('../../../server/server.js')
const API = require('../../../server/api.js')

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
    var that=this;
    let params = {
        openid:res.data,
        fee: that.data.totalPrice, //支付金额
        details: that.data.goodsList[0].goods_name,//支付商品的名称
    }
    server.postRequest(API.orderWxPay,params).then(res => {
      if(result.data){
        wx.requestPayment({
          timeStamp: result.data['timeStamp'],
          nonceStr: result.data['nonceStr'],
          package: result.data['package'],
          signType: 'MD5',
          paySign: result.data['paySign'],
          success:function(successret){
              console.log('支付成功');
              if (res.errMsg == "requestPayment:ok") {
                // 发送请求
                // server.getRequest(API.getVideoPage,params).then(res => {
                  setTimeout(function () {
                      wx.navigateTo({
                          url: "/pages/myCenter/myCenter"
                      })
                  }, 500)
                // })
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