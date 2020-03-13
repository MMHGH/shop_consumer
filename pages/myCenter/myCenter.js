// pages/myCenter/myCenter.js
const server = require('../../server/server.js')
const API = require('../../server/api.js')
const utils = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    active:'',
    orderNo:'',
    payAmount:'',
    level:'',
    point:'',
    scrollTop: 5, // 设定触发条件的距离
    reasonList:[
      '不想要了',
      '拍错宝贝，重新下单',
      '门店太远，等不及'
    ],
    serviceTips:'无法取货\n联系客服',
    noTips:'空空如也\n赶紧囤点口粮吧',
    orderList: [],
    avatarUrl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      avatarUrl:wx.getStorageSync('avatarUrl'),
      level: wx.getStorageSync('level'),
      point: wx.getStorageSync('point')
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getListMyOrders();
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getListMyOrders();
  },
  getListMyOrders(){
    let params = {
      pageNum:1,
      pageSize:100,
      isToken:''
    }
    server.postRequest(API.listMyOrders, params).then(res => {
      if (res.code == 100) {
        let orderList = res.data.dataList;
        // let orderList = this.data.orderList;
        orderList.forEach((item) => {
          item.payTime = utils.formatTime(item.payTime)
          item.goodsList.forEach((item1,index) => {
            if(index === 0){
              item1.isShow = false;    
            }else{
              item1.isShow = true;    
            } 
          })
        })
        this.setData({
          orderList: orderList
        })
        console.log(55,this.data.orderList)
      }
    })
  },
  bindReveal(e){
    let index = e.currentTarget.dataset.index;
    let orderList = this.data.orderList;
    orderList.forEach((item,indx) => {
      if(indx === index){
        item.goodsList.forEach((item1,indx1) => {
          if(indx1 != 0){
            item1.isShow = !item1.isShow;    
          } 
        })
      }else{
        item.goodsList.forEach((item1,indx1) => {
          if(indx1 != 0){
            item1.isShow = true;    
          } 
        })
      }
    })
    this.setData({
      orderList: orderList
    })
  },
  callUp(){
    wx.makePhoneCall({
      phoneNumber: '18038032812',
    })
  },
  openLocation(e){
    let index = e.currentTarget.dataset.local;
    let orderList = this.data.orderList;
    let address = orderList[index].shop.province+orderList[index].shop.city+orderList[index].shop.area+orderList[index].shop.address;
    wx.openLocation({
      longitude: +orderList[index].shop.longitude,
      latitude: +orderList[index].shop.latitude,
      name: orderList[index].shop.shopName,
      address: address
    }) 
  },
  seleteReason(e){
    this.setData({
      active: e.currentTarget.dataset.index
    })
  },
  confirm(){
    if(this.data.active === ''){
      return
    }
    let params = {
      orderNo:this.data.orderNo,
      reason:this.data.active+1
    }
    server.postRequest(API.refund,params).then(res => {
      if(res.code == 100){
        this.setData({
          show: false,
        })
        this.getListMyOrders();
      }
    })
  },
  salesReturn(e){
    this.setData({
      show: true,
      active:'',
      payAmount:e.currentTarget.dataset.money,
      orderNo:e.currentTarget.dataset.orderno
    })
  },
  consider(){
    this.setData({
      show: false,
    })
  },
  shopHome(){
    wx.redirectTo({
      url:"/pages/index/index"
    })
  }
})