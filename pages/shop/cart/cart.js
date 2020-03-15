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
    hasCartList:false,
    hasMoreData: true,
    cartListL:[
      // {
      //   checked:true,
      //   picUrl:'https://imgtest-1257418739.cos.ap-guangzhou.myqcloud.com/userFile/392/2019-04-18/87374a5f-1a86-4721-8570-322d0e7e034f.jpg',
      //   taste:'青瓜味',
      //   goodsPrice:2,
      //   count:10,
      //   max:6,
      //   number:5,
      //   num:0,
      //   isDel:true,
      //   id: 0,//商品id
      // },
      // {
      //   checked:true,
      //   picUrl:'https://imgtest-1257418739.cos.ap-guangzhou.myqcloud.com/userFile/392/2019-04-18/87374a5f-1a86-4721-8570-322d0e7e034f.jpg',
      //   taste:'青瓜味',
      //   goodsPrice:2,
      //   count:10,
      //   max:2,
      //   number:1,
      //   num:1,
      //   isDel:true,
      //   id: 0,//商品id
      // },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  onShow: function() {
    this.getData();
  },
  getData(){
    let self = this;
    server.getRequest(API.listMemberCart,{}).then(res => {
      if(res.code == 100){
         // 返回的数据
         const data = res.data;
         self.setData({
           cartListL: data,
           hasCartList:!data.length?true:false
         })
        this.totalPrice();
      }
    })
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
    let currentChecked = e.detail;
    let index = e.currentTarget.dataset.index;
    // 获取商品列表
    // let list = this.data.cartListL;
    // list[index].selected = !list[index].selected;
    // 重新渲染数据
    // this.setData({
    //   cartListL: list,
    // }) 
    this.updateShoppingCart('checked',index,currentChecked);
  },
  onChangeNum(e) {
    console.log(66,e);
    let index = e.currentTarget.dataset.index;
    let constcurrentCount = e.detail;
    // let list = this.data.cartListL;
    // list[index].count = currentCount;
    // this.setData({
    //   cartListL: list
    // });
    // this.totalPrice();
    this.updateShoppingCart('change',index,constcurrentCount);
  },
  updateShoppingCart(type,index,value){
    let list = this.data.cartListL;
    let params = {
      id:list[index].id,
      goodsId:list[index].goodsId,
    }
    if(type == 'checked'){
      params.number = list[index].number;
      params.checked = value;
    }else{
      params.number = value;
      params.checked = list[index].checked;
    }
    server.postRequest(API.updateShoppingCart,params).then(res => {
      if(res.code == 100){
        this.getData()
      }
    })
  },
  del(e){
    var that = this;
    // 获取商品列表数据
    let list = this.data.cartListL;
    wx.showModal({
      title: '提示',
      content: '确认删除吗',
      success: function(res) {
        if (res.confirm) {
          let params = {
            id:e.currentTarget.dataset.id
          }
          server.getRequest(API.delShoppingCart,params).then(res => {
            if(res.code == 100){
              that.getData()
            }
          })
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
      if (list[i].checked) {
        total += list[i].number * Number(list[i].goodsPrice);
      }
    }
    this.setData({
      totalPrice: total.toFixed(2)
    });
  },
  payment(){
    if(this.data.totalPrice == 0){
      wx.showToast({
        title: `请选择商品`,
        icon: 'none'
      })
      return;
    }
    // 进入付款信息
    wx.navigateTo({
      url:`/pages/shop/paymentInfo/paymentInfo?totalPrice=${this.data.totalPrice}`
    })
  }
})