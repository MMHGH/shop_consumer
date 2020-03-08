// pages/myCenter/myCenter.js
const server = require('../../server/server.js')
const API = require('../../server/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    active:'',
    reasonList:[
      '不想要了',
      '拍错宝贝，重新下单',
      '门店太远，等不及'
    ],
    serviceTips:'无法取货\n联系客服',
    noTips:'空空如也\n赶紧囤点口粮吧',
    orderList: [
      {
        code:'1314',
        info:{
          date:'2020/03/20',
          isTrue:1,
          num:2,
          status:0,
          city:0
        },
        list:[
          {
            url:'https://imgtest-1257418739.cos.ap-guangzhou.myqcloud.com/userFile/392/2019-04-18/87374a5f-1a86-4721-8570-322d0e7e034f.jpg',
            brandName:'TATTOO',
            taste:'爱那个寡味'            
          },
          {
            url:'https://imgtest-1257418739.cos.ap-guangzhou.myqcloud.com/userFile/392/2019-04-18/87374a5f-1a86-4721-8570-322d0e7e034f.jpg',
            brandName:'TATTOO',
            taste:'爱那个寡味'            
          },
          {
            url:'https://imgtest-1257418739.cos.ap-guangzhou.myqcloud.com/userFile/392/2019-04-18/87374a5f-1a86-4721-8570-322d0e7e034f.jpg',
            brandName:'TATTOO',
            taste:'爱那个寡味'            
          },
        ]
      },
      {
        code:'1314',
        info:{
          date:'2020/03/20',
          isTrue:0,
          num:2,
          status:0,
          city:0
        },
        list:[
          {
            url:'https://imgtest-1257418739.cos.ap-guangzhou.myqcloud.com/userFile/392/2019-04-18/87374a5f-1a86-4721-8570-322d0e7e034f.jpg',
            brandName:'TATTOO',
            taste:'爱那个寡味'            
          },
          // {
          //   url:'https://imgtest-1257418739.cos.ap-guangzhou.myqcloud.com/userFile/392/2019-04-18/87374a5f-1a86-4721-8570-322d0e7e034f.jpg',
          //   brandName:'TATTOO',
          //   taste:'爱那个寡味'            
          // },
          // {
          //   url:'https://imgtest-1257418739.cos.ap-guangzhou.myqcloud.com/userFile/392/2019-04-18/87374a5f-1a86-4721-8570-322d0e7e034f.jpg',
          //   brandName:'TATTOO',
          //   taste:'爱那个寡味'            
          // },
        ]
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
  callUp(){
    console.log(11)
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
    let params = {
      apikey:'0df993c66c0c636e29ecbb5344252a4a',
      start:1,
      count:10
    }
    // server.getRequest(API.getVideoPage,params).then(res => {
    // })
  },
  openData(){
    console.log(11)
  },
  salesReturn(){
    this.setData({
      show: true,
      active:''
    })
  },
  consider(){
    this.setData({
      show: false,
    })
  },
  shopHome(){
    wx.navigateTo({
      url:"/pages/shop/shopHome/shopHome"
    })
  }
})