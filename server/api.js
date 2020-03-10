const api = {
    // 使用豆瓣电影在线接口
    getSessionKey: '/api/login/jscode2session',//电影列表
    login: '/api/login/login',//登陆
    getWXPhone: '/api/login/getWXPhone',//根据微信加密数据获取
    listShop: '/api/member/listShop',//门店列表
    listMyOrders: '/api/order/listMyOrders',//订单列表
    listGoodsBrandForSelect: '/api/goods/listGoodsBrandForSelect',//商品品牌列表
    listGoodsCategoryForSelect: '/api/goods/listGoodsCategoryForSelect',//分类列表
    addShoppingCart: '/api/goods/addShoppingCart',//加入购物车
    delShoppingCart: '/api/goods/delShoppingCart',//删除购物车
    listMemberCart: '/api/goods/listMemberCart',//查询购物车所有商品
    getShoppingCartCount: '/api/goods/getShoppingCartCount',//查询购物车总数
    updateShoppingCart: '/api/goods/updateShoppingCart',//更新购物车
    refund: '/api/order/refund',//退货
    orderWxPay: '/api/order/orderWxPay ',//微信支付
  }

  module.exports = api