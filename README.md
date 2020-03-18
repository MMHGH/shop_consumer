# 塔兔蒸汽实验室小程序

## Build Setup

``` bash
# install dependencies
npm install
```
###########目录结构描述
├── Readme.md                   // 目录架构
├── utils                       // 公用js文件夹
│   ├── filter.wxs              // 过滤器
│   ├── md5.js                  // md5算法js
│   ├── tips.js                 // 提示方法
│   └── utils.js                // 项目公共js
├── server                      // 服务配置
│   ├── api.js                  // 接口地址
│   ├── config.js               // 环境配置
│   ├── server.js               // 请求封装
├── pages                       // 页面库
│   ├── index                   // 主页 
│   ├── myCenter                // 个人中心
│   ├── shop                    // 店铺
│       ├── cart                // 购物车  
│       └── shopHome            // 店铺主页
