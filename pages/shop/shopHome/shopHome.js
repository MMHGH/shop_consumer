// pages/shop/shopHome/shopHome.js
const server = require('../../../server/server.js')
const API = require('../../../server/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey: 0,
    brandId:'',
    activeBrand:0,
    categoryActive:0,
    brandList:[],
    categoryList:[],
    goodList:[],
    swiperList:[
      {
        url:'https://imgtest-1257418739.cos.ap-guangzhou.myqcloud.com/userFile/392/2019-04-18/87374a5f-1a86-4721-8570-322d0e7e034f.jpg'
      },
      {
        url:'https://imgtest-1257418739.cos.ap-guangzhou.myqcloud.com/userFile/392/2019-04-18/87374a5f-1a86-4721-8570-322d0e7e034f.jpg'
      },
    ],
    cartTotal:'',
    shopName:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      shopName: wx.getStorageSync('shopName')
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getBrandList();
    this.getCartTotal();
  },
  changeBrand(e){
    this.setData({
      activeBrand: e.currentTarget.dataset.index
    });
  },
  onChange(e) {
    let index = e.detail;
    this.setData({
      brandId: this.data.brandList[index].id
   });
   this.getCategoryList()
  },
  getBrandList(){
    let params = {
      shopId:wx.getStorageSync('shopId')
    }
    server.getRequest(API.listGoodsBrandForSelect,params).then(res => {
      if(res.code == 100){
        this.setData({
           brandList: res.data, 
           brandId: res.data[0].id 
        });
        this.getCategoryList()
      }
    })
  },
  getCategoryList(){
    let params = {
      brandId:this.data.brandId
    }
    server.getRequest(API.listGoodsCategoryForSelect,params).then(res => {
      if(res.code == 100){
        let categoryList = res.data;
        this.setData({
          categoryList: categoryList
        });
        // this.getGoodList();
      }
    })
  },
  getCartTotal(){
    server.getRequest(API.getShoppingCartCount,{}).then(res => {
      if(res.code == 100){
        this.setData({
          cartTotal: res.data
        });
      }
    })
  },
  toGoodsList(e){
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url:`/pages/shop/goodsList/goodsList?brandId=${this.data.categoryList[index].brandId}&categoryId=${this.data.categoryList[index].id}`
    })
  },
  addCart(e){
    let params = {
      goodsId:e.currentTarget.dataset.id,
      number:1
    }
    server.postRequest(API.addShoppingCart,params).then(res => {
      if(res.code == 100){
        this.setData({
          cartTotal: res.data
        });
      }
    })
  },
  toCart(){
    wx.navigateTo({
      url:"/pages/shop/cart/cart"
    })
  }
})