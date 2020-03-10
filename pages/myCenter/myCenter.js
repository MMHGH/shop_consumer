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
    orderAmout:'',
    memberOrder:1,
    reasonList:[
      '不想要了',
      '拍错宝贝，重新下单',
      '门店太远，等不及'
    ],
    serviceTips:'无法取货\n联系客服',
    noTips:'空空如也\n赶紧囤点口粮吧',
    orderList: [
      // {
      //   consignee: "string",
      //   createdBy: "string",
      //   createdTime: "2020-03-10T07:36:03.122Z",
      //   deliveryMoney: 0,
      //   goodsList: [
      //     {
      //       brandId: 0,
      //       brandName: "Tattoo",
      //       categoryId: 0,
      //       categoryName: "string",
      //       createdBy: 0,
      //       createdTime: "2020-03-10T07:36:03.123Z",
      //       goodsName: "string",
      //       goodsPrice: 9.9,
      //       id: 0,
      //       inventory: 0,
      //       isDel: 0,
      //       picUrl: "https://imgtest-1257418739.cos.ap-guangzhou.myqcloud.com/userFile/392/2019-04-18/87374a5f-1a86-4721-8570-322d0e7e034f.jpg",
      //       remark: "string",
      //       shopId: 0,
      //       status: 0,
      //       taste: "string",
      //       updateBy: 0,
      //       updateTime: "2020-03-10T07:36:03.123Z"
      //     },
      //     {
      //       brandId: 0,
      //       brandName: "Tattoo",
      //       categoryId: 0,
      //       categoryName: "string",
      //       createdBy: 0,
      //       createdTime: "2020-03-10T07:36:03.123Z",
      //       goodsName: "string",
      //       goodsPrice: 9.9,
      //       id: 0,
      //       inventory: 0,
      //       isDel: 0,
      //       picUrl: "https://imgtest-1257418739.cos.ap-guangzhou.myqcloud.com/userFile/392/2019-04-18/87374a5f-1a86-4721-8570-322d0e7e034f.jpg",
      //       remark: "string",
      //       shopId: 0,
      //       status: 0,
      //       taste: "string",
      //       updateBy: 0,
      //       updateTime: "2020-03-10T07:36:03.123Z"
      //     },
      //   ],
      //   goodsNumber: 0,
      //   id: "string",
      //   memberId: "string",
      //   orderAmout: 0,
      //   orderNo: "string",
      //   payAmount: 0,
      //   payStatus: 0,
      //   payTime: "2020-03-10T07:36:03.125Z",
      //   phone: "string",
      //   remark: "string",
      //   shopId: 0,
      //   tradeStatus: 0,//0-进行中,1-已完成，2-取消交易，3-订单已退费 ,
      //   verifyCode: "11",
      //   verifyUserId: 0
      // },
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
    this.getListMyOrders();
  },
  getListMyOrders(){
    let params = {
      pageNum:1,
      pageSize:500,
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
      phoneNumber: '18320745976',
    })
  },
  openLocation(e){
    console.log(111,e)
    wx.openLocation({
      longitude: Number(e.currentTarget.dataset.list.longitude),
      latitude: Number(e.currentTarget.dataset.list.latitude),
      name: e.currentTarget.dataset.list.name,
      address: e.currentTarget.dataset.list.address
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
      reason:this.data.active
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
      orderAmout:e.currentTarget.dataset.money,
      orderNo:e.currentTarget.dataset.orderno
    })
  },
  consider(){
    this.setData({
      show: false,
    })
  },
  shopHome(){
    wx.navigateTo({
      url:"pages/index/index"
    })
  }
})