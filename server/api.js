const api = {
    /* 管理统计 */
    getLoginLogByPage: '/api/user/index/getGeneralSituation',//基本信息
    getMusicDetails: '/musicDetails',//音乐详情
    // 使用豆瓣电影在线接口
    getVideoPage: '/v2/movie/in_theaters',//电影列表
    getVideoDetail: '/v2/movie/subject/30261964',//电影详情
  }

  module.exports = api