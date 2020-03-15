// pages/shop/shopHome/shopHome.js
const server = require('../../../server/server.js')
const API = require('../../../server/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopName:'',
    brandId:'',
    categoryId:'',
    activeBrandName: '',
    activeCategoryIndex:0,
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

    pageNum:1,// 当前页数
    pageSize:200,
    total:0,
    hidden: true,//用于控制当 scroll-view 滚动到底部时，显示 “数据加载中...” 的提示
    loadingData: false,//数据是否正在加载中，避免用户瞬间多次下滑到底部，发生多次数据加载事件
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
   * 上滑加载更多
   */
  scrollToLower: function(e) {
    var hidden = this.data.hidden,
        loadingData = this.data.loadingData,
        that = this;
    if (hidden) {
      this.setData({
        hidden: false
      });
    }
    if (loadingData) {
      return;
    }
    this.setData({
      loadingData: true
    });
    if (this.data.goodList.length >= this.data.total) {
      wx.showToast({
        title: `数据加载完了`,
        icon: 'none'
      })
    } else {
      // 下一页
      this.setData({
        pageNum: this.data.pageNum += 1
      });
      wx.showLoading({  
        title: '数据加载中...',  
      });  
      that.getGoodList(true, () => {  
        that.setData({  
          hidden: true,  
          loadingData: false  
        });  
        wx.hideLoading();  
      });  
      console.info('上拉数据加载完成.');  
    }
  },
  scrollToUpper: function(e) {
   // 初始化页码
    // this.setData({
    //   pageNum: 1
    // });
    // this.getGoodList();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getBrandList();
    this.getCartTotal();
  },
  changeBrand(e) {
    this.setData({
      activeBrandName: e.currentTarget.dataset.id,
      brandId: e.currentTarget.dataset.id,
      activeCategoryIndex:0
    });
    this.getCategoryList()
  },
  changeCategory(e) {
    this.setData({
      activeCategoryIndex: e.currentTarget.dataset.index,
      categoryId:e.currentTarget.dataset.id
    });
    this.getGoodList();
  },
  getBrandList(){
    let params = {
      shopId:wx.getStorageSync('shopId')
    }
    server.getRequest(API.listGoodsBrandForSelect,params).then(res => {
      if(res.code == 100){
        this.setData({
           brandList: res.data, 
           brandId: res.data[0].id,
           activeBrandName: res.data[0].id
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
          categoryList: categoryList,
          categoryId: res.data[0].id
        });
        this.getGoodList();
      }
    })
  },
  getGoodList(){
    let params = {
      brandId:this.data.brandId,
      categoryId:this.data.categoryId,
      pageNum:this.data.pageNum,
      pageSize:this.data.pageSize,
      taste:'',
      shopId:wx.getStorageSync('shopId')
    }
    server.postRequest(API.listGoods,params).then(res => {
      if(res.code == 100){
        const data = res.data;
        this.setData({  
          goodList: data.dataList,  
        });  
        // var oldArticles = this.data.goodList,  
        //     newArticles = tail ? oldArticles.concat(data.dataList) : data.dataList;  
        //     this.setData({  
        //       goodList: newArticles,  
        //       total:data.totalCount,
        //     });  
        //     if (callback) {  
        //       callback();  
        //     }  
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
    wx.redirectTo({
      url:`/pages/shop/goodsList/goodsList?brandId=${this.data.categoryList[index].brandId}&categoryId=${this.data.categoryList[index].id}`
    })
  },
  addCart(e){
    let params = {
      goodsId:e.currentTarget.dataset.id,
      number:1
    }
    // if(!e.currentTarget.dataset.inventory){
    //   wx.showToast({
    //     title: `库存不足,请选择其他商品!`,
    //     icon: 'none'
    //   })
    //   return;
    // }
    server.postRequest(API.addShoppingCart,params).then(res => {
      if(res.code == 100){
        this.setData({
          cartTotal: res.data
        });
        wx.showToast({
          title: `加入购物车成功`,
          icon: 'none'
        })
      }
    })
  },
  toCart(){
    wx.navigateTo({
      url:"/pages/shop/cart/cart"
    })
  }
})