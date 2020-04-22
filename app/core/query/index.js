/*
  注册不同的方法对应的查询
*/
module.exports = {
  ls: require('./ls'),
  post: require('./post'),
  get: require('./get'),
  put: require('./put'),
  del: require('./del')
}
