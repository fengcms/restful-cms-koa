/*
  注册不同的方法对应的查询
*/
const { toType } = global.tool

const ls = require('./ls')
const post = require('./post')
const get = require('./get')
const put = require('./put')
const del = require('./del')

// 系统内部查询数据列表方法
const getList = async (model, params) => {
  const res = await ls({}, model, '', params)
  return res
}
// 系统内部查询单条数据方法
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

// 系统内部添加新数据方法
const postItem = async (model, params) => {
  const res = await post({}, model, '', params)
  return res
}

// 初始化空数据时添加默认数据方法
const initDb = async () => {
  const hasManage = await getItem('Manages', 'first')
  if (!hasManage) {
    postItem('Manages', {
      account: 'admin',
      password: 'QoXr/TKaWtreOTUp7+hUIafOmRYXge7usf8RCvvE745OeaAjVg50Dgg3k+i1xFfvIPcFY4Boifzd7TKcPjzzhw=='
    }).then(() => {
      console.log('初始管理员账号添加完成 admin:123456')
    })
  }
  const hasSite = await getItem('Site', 'first')
  if (!hasSite) {
    postItem('Site', {
      name: 'RESTFul CMS koa By FungLeo',
      title: 'RESTFul CMS koa By FungLeo',
      keywords: 'RESTFul,CMS,koa',
      copyright: 'By FungLeo'
    }).then(() => {
      console.log('初始系统信息完成')
    })
  }
}
// 初始化空数据时添加默认数据
initDb()

module.exports = {
  getList,
  getItem,
  postItem,
  ls,
  post,
  get,
  put,
  del
}
