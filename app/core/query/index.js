/*
  注册不同的方法对应的查询
*/
const { toType } = global.tool

const ls = require('./ls')
const post = require('./post')
const get = require('./get')
const put = require('./put')
const del = require('./del')

const getList = async (model, params) => {
  const res = await ls({}, model, '', params)
  return res
}

const getItem = async (model, params) => {
  if (toType(params) === 'object') {
    const res = await getList(model, params)
    if (res.list.length) {
      return res.list[0].dataValues
    } else {
      return null
    }
  } else {
    const res = await get({}, model, '', {}, params)
    return res
  }
}

module.exports = {
  getList,
  getItem,
  ls,
  post,
  get,
  put,
  del
}
