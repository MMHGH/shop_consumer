// pages/shop/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio:'1',
    cartListL:[
      {
        checked:true,
        url:'https://imgtest-1257418739.cos.ap-guangzhou.myqcloud.com/userFile/392/2019-04-18/87374a5f-1a86-4721-8570-322d0e7e034f.jpg',
        name:'青瓜味',
        prize:'￥99.99'
      },
      {
        checked:false,
        url:'https://imgtest-1257418739.cos.ap-guangzhou.myqcloud.com/userFile/392/2019-04-18/87374a5f-1a86-4721-8570-322d0e7e034f.jpg',
        name:'青瓜味',
        prize:'￥99.99'
      },
    ]
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  onChangeChecked(event) {
    this.setData({
      radio: event.detail
    });
  },
  onChangeNum(value) {
    setTimeout(() => {
      this.setData({ value });
    }, 500);
  },
  payment(){
    // 进入付款信息
    wx.navigateTo({
      url:"/pages/shop/paymentInfo/paymentInfo"
    })
  }
})