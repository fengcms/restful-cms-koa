/*
  注册不同的方法对应的查询
*/
const { toType, rsa } = global.tool
const { IS_POST_TEST_DB } = require(':config')
const ls = require('./ls')
const post = require('./post')
const get = require('./get')
const put = require('./put')
const del = require('./del')
const { getStrMd5, getStrSha256 } = require(':utils/hash')

// 系统内部查询数据列表方法
const getList = async (model, params = {}) => {
  const res = await ls({}, model, '', params)
  return res
}
// 系统内部查询单条数据方法
const getItem = async (model, params) => {
  if (toType(params) === 'object') {
    const res = await getList(model, params)
    if (res.list.length) {
      return res.list[0]
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

// 系统内部修改数据方法
const putItem = async (model, id, params) => {
  const res = await put({}, model, '', params, id)
  return res
}

// 初始化空数据时添加默认数据方法
const initDb = async () => {
  const hasManage = await getItem('Manages', 'first')
  const salt = getStrMd5(String(Math.random()))
  const password = getStrSha256('123456' + salt)
  if (!hasManage) {
    postItem('Manages', {
      account: 'admin',
      name: 'admin',
      password,
      salt,
      email: 'web@web.com',
      mark: '系统初始管理员账号'
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
      console.log('初始系统信息数据完成')
    })
  }
  const hasChan = await getItem('Channel', 'first')
  if (!hasChan) {
    const calcchannelMockDat = (pid, pre = '顶级') => {
      return 'leo'.split('').map((i, index) => {
        return { pid, name: `${pre}栏目${pid}${index}` }
      })
    }
    const { ids } = await postItem('Channel', calcchannelMockDat(0))
    ids.forEach(async i => {
      const { ids } = await postItem('Channel', calcchannelMockDat(i, '二级'))
      ids.forEach(async i => {
        await postItem('Channel', calcchannelMockDat(i, '三级'))
      })
    })
    console.log('初始测试栏目数据完成')
  }
}
// 初始化空数据时添加默认数据
IS_POST_TEST_DB && setTimeout(() => initDb(), 2000)

module.exports = {
  getList,
  getItem,
  postItem,
  putItem,
  ls,
  post,
  get,
  put,
  del
}
