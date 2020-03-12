// pages/shop/goodsList/goodsList.js
const server = require('../../../server/server.js')
const API = require('../../../server/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum:1,// 当前页数
    pageSize:10,
    total:0,
    taste:'',
    goodList:[],
    cartTotal:'',
    brandId:'',
    categoryId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      brandId: options.brandId,
      categoryId: options.categoryId
    });
    this.getCartTotal();
    this.getGoodList();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
  getValue: function (e) {
    this.setData({
      taste: e.detail.value
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
  getGoodList(){
    let params = {
      brandId:this.data.brandId,
      categoryId:this.data.categoryId,
      pageNum:this.data.pageNum,
      pageSize:this.data.pageSize,
      shopId:wx.getStorageSync('shopId'),
      taste:this.data.taste
    }
    server.postRequest(API.listGoods,params).then(res => {
      if(res.code == 100){
        // 关闭下拉刷新动画
        wx.stopPullDownRefresh();
        // 返回的数据
        const data = res.data;
        let goodList = this.data.goodList;
        // 数据追加  data.list为返回的数据列表
        if (this.data.pageNum > 1) {
          goodList.push(...data.dataList)
        } else {
          goodList = data.dataList
        }
        this.setData({
          total:data.totalCount,
          goodList: goodList
        });
      }
    })
  },
  searchData(){
    // 初始化页码
    this.setData({
      pageNum: 1
    });
    this.getGoodList();
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 初始化页码
    this.setData({
      pageNum: 1
    });
    this.getGoodList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.goodList.length > this.data.total) {
      wx.showToast({
        title: `数据加载完了`,
        icon: 'none'
      })
    } else {
      // 下一页
      this.setData({
        pageNum: this.data.pageNum += 1
      });
      this.getGoodList();
    }
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