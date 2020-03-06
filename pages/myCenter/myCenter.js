// pages/myCenter/myCenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:'无法取货\n联系客服'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  callUp(){
    console.log(11)
    wx.makePhoneCall({
      phoneNumber: '18320745976',
    })
  }
})