
const current = 'test' //当前环境

const profiles = {
  'dev': {
    'online': false,
    'baseURL': 'http://192.168.1.189:8808' //开发环境
  },
  'test': {
    'online': false,
    'baseURL': 'https://store.ta2tattoo.com' //测试环境
  },
  'prod': {
    'online': true,
    'baseURL': 'https://api.xxx.xxx'//生产环境
  }
}
const ENV = profiles[current]

module.exports =  ENV 
