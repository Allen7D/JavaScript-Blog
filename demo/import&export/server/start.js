require('babel-register')({
  presets: [ 'env' ]
})
// 导入初始的启动文件
module.exports = require('./server.js')
