const ENV = require('./config.js')
const baseUrl = ENV.baseURL;
import Toast from '@vant/weapp/toast/toast';

const http = ({url,param  = {},method = 'GET'})=>{
    param = { ...param, openid: wx.getStorageSync('openid') }
    return new Promise((resolve,reject) => {
      wx.request({
        url: baseUrl + url,
        data: param,
        method: method,
        header: {
          'content-type': 'application/json', // 默认值
          't-n': wx.getStorageSync('userToken'),
        },
        success: res => {
          if (res.data.code != 100) {
            Toast.clear();
            wx.showToast({
              title: res.data.message,
              icon: 'none'
            })
          }
          resolve(res.data)
        },
        fail: err => {
          wx.showToast({
            title: '网络错误，请稍后再试',
            icon: 'none'
          })
          reject(err)
        }
      })
    })
  }

// get方法
const _get = (url, param = {}) => {
    return http({
        url,
        param
    })
}

const _post = (url, param = {}) => {
    return http({
        url,
        param,
        method: 'post'
    })
}

module.exports = {
    postRequest: _post,
    getRequest: _get
}