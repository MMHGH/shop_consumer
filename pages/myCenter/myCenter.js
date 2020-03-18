// pages/myCenter/myCenter.js
const server = require('../../server/server.js')
const API = require('../../server/api.js')
const utils = require('../../utils/util.js')
const tips = require("../../utils/tips");
import Dialog from '@vant/weapp/dialog/dialog';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    hasOrderList:false,
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
    avatarUrl:'',

    pageNum:1,// 当前页数
    pageSize:10,
    total:0,
    time:'',
    isLoading:false,//是否加载

    items: [],
    startX: 0, //开始坐标
    startY: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      avatarUrl: wx.getStorageSync('avatarUrl')
    });
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getMemberInfo();
    this.getListMyOrders();
    this.data.time = setTimeout(()=>{
      this.getListMyOrders()
    }, 3000)
  },
  onHide: function(options) {
    var that =this;
    //清除计时器  即清除setInter
    clearTimeout(that.data.time)
  },
  onUnload: function(options) {
    var that =this;
    //清除计时器  即清除setInter
    clearTimeout(that.data.time)
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 初始化页码
    this.setData({
      pageNum: 1
    });
    this.getMemberInfo();
    this.getListMyOrders();
  },
   /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.isLoading){
      return
    }
    if (this.data.orderList.length >= this.data.total) {
      wx.showToast({
        title: `订单加载完了`,
        icon: 'none'
      })
    } else {
      // 下一页
      wx.showLoading({
        title: '加载中...',
      })
      this.setData({
        isLoading:true,
        pageNum: this.data.pageNum += 1
      });
      this.getListMyOrders();
    }
  },
  getMemberInfo(){
    let params = {}
    server.getRequest(API.getMemberInfo,params).then(res => {
      if(res.code == 100){
        this.setData({ 
          level: res.data.level, 
          point: res.data.point 
        });
      }
    })
  },
  getListMyOrders(){
    let params = {
      pageNum:this.data.pageNum,
      pageSize:this.data.pageSize,
      isToken:''
    }
    server.postRequest(API.listMyOrders, params).then(res => {
      if (res.code == 100) {
        // 关闭下拉刷新动画
        wx.stopPullDownRefresh();
        let orderList = res.data.dataList;
        orderList.length && orderList.forEach((item) => {
          item.payTime = utils.formatTime(item.payTime)
          item.isShow = false;    
        })
        // 数据追加  
        let oldList = this.data.orderList;
        if (this.data.pageNum > 1) {
          oldList.push(...orderList)
        } else {
          oldList = orderList
        }
        this.setData({
          orderList: oldList,
          total:res.data.totalCount,
          hasOrderList:!oldList.length?true:false
        })
      }
      // 回改状态
      this.setData({
        isLoading:false
      })
      wx.hideLoading();
    }).catch(err=>{
      // 回改状态
      this.setData({
        isLoading:false
      })
      wx.hideLoading();
    })
  },
  bindReveal(e){
    let index = e.currentTarget.dataset.index;
    let orderList = this.data.orderList;
    orderList.forEach((item,indx) => {
      if(indx === index){
        item.isShow = !item.isShow;
      }else{
        item.isShow = false;
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
          pageNum: 1
        })
        Dialog.alert({
          title: '提示',
          message: '退款已成功，请稍后刷新订单状态'
        }).then(() => {
          this.getMemberInfo();
          this.getListMyOrders()
        });
        // tips.showSuccess("退货成功!"), setTimeout(()=>{
        //   this.getListMyOrders()
        // }, 3000)
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