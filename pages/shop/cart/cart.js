// pages/shop/cart/cart.js
const server = require('../../../server/server.js')
const API = require('../../../server/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio:'1',
    totalPrice:'',
    pageNum: 1,
    pageSize: 30,
    total:'',
    hasMoreData: true,
    cartListL:[
      {
        selected:true,
        url:'https://imgtest-1257418739.cos.ap-guangzhou.myqcloud.com/userFile/392/2019-04-18/87374a5f-1a86-4721-8570-322d0e7e034f.jpg',
        name:'青瓜味',
        money:2,
        count:1,
        max:3,
        num:0,
        isDel:false,
        id: 0,//商品id
      },
      {
        selected:true,
        url:'https://imgtest-1257418739.cos.ap-guangzhou.myqcloud.com/userFile/392/2019-04-18/87374a5f-1a86-4721-8570-322d0e7e034f.jpg',
        name:'青瓜味',
        money:2,
        count:1,
        max:3,
        num:0,
        isDel:false,
        id: 0,//商品id
      },
      {
        selected:true,
        url:'https://imgtest-1257418739.cos.ap-guangzhou.myqcloud.com/userFile/392/2019-04-18/87374a5f-1a86-4721-8570-322d0e7e034f.jpg',
        name:'青瓜味',
        money:2,
        count:1,
        max:3,
        num:0,
        isDel:false,
        id: 0,//商品id
      },
      {
        selected:true,
        url:'https://imgtest-1257418739.cos.ap-guangzhou.myqcloud.com/userFile/392/2019-04-18/87374a5f-1a86-4721-8570-322d0e7e034f.jpg',
        name:'青瓜味',
        money:2,
        count:1,
        max:3,
        num:0,
        isDel:false,
        id: 0,//商品id
      },
      {
        selected:true,
        url:'https://imgtest-1257418739.cos.ap-guangzhou.myqcloud.com/userFile/392/2019-04-18/87374a5f-1a86-4721-8570-322d0e7e034f.jpg',
        name:'青瓜味',
        money:2,
        count:1,
        max:3,
        num:0,
        isDel:false,
        id: 0,//商品id
      },
      {
        selected:true,
        url:'https://imgtest-1257418739.cos.ap-guangzhou.myqcloud.com/userFile/392/2019-04-18/87374a5f-1a86-4721-8570-322d0e7e034f.jpg',
        name:'青瓜味',
        money:2,
        count:1,
        max:3,
        num:0,
        isDel:false,
        id: 0,//商品id
      },
      {
        selected:true,
        url:'https://imgtest-1257418739.cos.ap-guangzhou.myqcloud.com/userFile/392/2019-04-18/87374a5f-1a86-4721-8570-322d0e7e034f.jpg',
        name:'青瓜味',
        money:2,
        count:1,
        max:3,
        num:0,
        isDel:false,
        id: 0,//商品id
      },
      {
        selected:true,
        url:'https://imgtest-1257418739.cos.ap-guangzhou.myqcloud.com/userFile/392/2019-04-18/87374a5f-1a86-4721-8570-322d0e7e034f.jpg',
        name:'青瓜味',
        money:2,
        count:1,
        max:3,
        num:0,
        isDel:false,
        id: 0,//商品id
      },
      {
        selected:true,
        url:'https://imgtest-1257418739.cos.ap-guangzhou.myqcloud.com/userFile/392/2019-04-18/87374a5f-1a86-4721-8570-322d0e7e034f.jpg',
        name:'青瓜味',
        money:2,
        count:1,
        max:3,
        num:0,
        isDel:false,
        id: 0,//商品id
      },
      {
        selected:false,
        url:'https://imgtest-1257418739.cos.ap-guangzhou.myqcloud.com/userFile/392/2019-04-18/87374a5f-1a86-4721-8570-322d0e7e034f.jpg',
        name:'青瓜味',
        money:2,
        isDel:false,
        count:2,
        num:1,
        max:1,
        id: 0,//商品id
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow: function() {
    // this.data.goodsCar = API.orderinfo;
    this.totalPrice();
  },
  getData(){
    let self = this;
    let params = {
      apikey:'0df993c66c0c636e29ecbb5344252a4a',
      start:this.start,
      count:this.count
    }
    let cartListL = this.data.cartListL;
    this.$service.get(this.$api.managerialStatis.getVideoPage,params).then(res => {
        // 关闭下拉刷新动画
        wx.stopPullDownRefresh();
        // 返回的数据
        const data = res;
        // 数据追加  data.list为返回的数据列表
        if (self.data.pageNum > 1) {
          cartListL.push(...data.subjects)
        } else {
          cartListL = data.subjects
        }
        self.setData({
          cartListL: cartListL,
          total: data.total
        })
        console.log('电影列表',self.data.cartListL)
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      cartListL: [],
      pageNum: 1
    })
    this.getData();
    wx.showToast({
      title: `下拉刷新`,
      icon: 'none'
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.cartListL.length > this.data.total) {
      wx.showToast({
        title: `数据加载完了`,
        icon: 'none'
      })
    } else {
      // 下一页
      this.setData({
        pageNum: this.data.pageNum += 1,
      }) 
      this.getData();
    }
  },
  open(e){
    let index = e.currentTarget.dataset.index;
    // 获取商品列表
    let list = this.data.cartListL;
    list[index].isDel = true;
    this.setData({
      cartListL: list,
    }) 
  },
  onClose(e){
    let index = e.currentTarget.dataset.index;
    // 获取商品列表
    let list = this.data.cartListL;
    list[index].isDel = false;
    this.setData({
      cartListL: list,
    }) 
  },
  onChangeChecked(e) {
    console.log(e)
    let index = e.currentTarget.dataset.index;
    // 获取商品列表
    let list = this.data.cartListL;
    list[index].selected = !list[index].selected;
    // 重新渲染数据
    this.setData({
      cartListL: list,
    }) 
    this.totalPrice();     
  },
  onChangeNum(e) {
    console.log(e);
    const index = e.currentTarget.dataset.index;
    const currentCount = e.detail;
    let list = this.data.cartListL;
    list[index].count = currentCount;
    this.setData({
      cartListL: list
    });
    this.totalPrice();
  },
  del(e){
    var that = this;
    const index = e.currentTarget.dataset.index;
    // 获取商品列表数据
    let list = this.data.cartListL;
    wx.showModal({
      title: '提示',
      content: '确认删除吗',
      success: function(res) {
        if (res.confirm) {
          // 删除索引从1
          list.splice(index, 1);
          // 页面渲染数据
          that.setData({
            cartListL: list
          });
          // 调用金额渲染数据
          that.totalPrice();
        } 
      },
      fail: function(res) {
        console.log(res);
      }
    })
  },
  // 计算金额
  totalPrice() {
    let list = this.data.cartListL;
    let total = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i].selected) {
        total += list[i].count * list[i].money;
      }
    }
    // 最后赋值到data中渲染到页面
    this.setData({
      cartListL: list,
      totalPrice: total.toFixed(2)
    });
  },
  payment(){
    // wx.setStorageSync('paymentAmount', this.data.totalPrice)
    // 进入付款信息
    wx.navigateTo({
      url:`/pages/shop/paymentInfo/paymentInfo?totalPrice=${this.data.totalPrice}`
    })
  }
})