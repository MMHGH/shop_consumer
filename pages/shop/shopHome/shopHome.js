// pages/shop/shopHome/shopHome.js
const server = require('../../../server/server.js')
const API = require('../../../server/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey: 0,
    swiperList:[
      {
        url:'https://imgtest-1257418739.cos.ap-guangzhou.myqcloud.com/userFile/392/2019-04-18/87374a5f-1a86-4721-8570-322d0e7e034f.jpg'
      },
      {
        url:'https://imgtest-1257418739.cos.ap-guangzhou.myqcloud.com/userFile/392/2019-04-18/87374a5f-1a86-4721-8570-322d0e7e034f.jpg'
      },
    ],
    goodList:new Array(6)
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
    this.getData();
  },
  getData(){
    let params = {
      apikey:'0df993c66c0c636e29ecbb5344252a4a',
      start:1,
      count:10
    }
    // server.getRequest(API.getVideoPage,params).then(res => {
    // })
  },
  onChange(event) {
    wx.showToast({
      icon: 'none',
      title: `切换至第${event.detail}项`
    });
  },
  toCart(){
    wx.navigateTo({
      url:"/pages/shop/cart/cart"
    })
  }
})