const Router = require('koa-router')

const core = require(':core')
const { API_PREFIX } = require(':config')
const { models } = require(':@/model')
const { getJSFile } = global.tool
const extraAPI = getJSFile('../api/extra')

/*
  获取数据库模型数据，并输出为对象，格式如下：
  {
    article: Article,
    site: Site
  }
  key 用于关联项目内操作， value 用于模型操作
*/

const RESTFulModel = (() => {
  const res = {}
  Object.keys(models).forEach(i => {
    res[i.toLocaleLowerCase()] = i
  })
  return res
})()

/*
  计算请求方法
  /apiname
    GET     ls      获取资源列表
    POST    post    创新新资源
  /apiname/:id
    GET     get     获取指定ID资源
    PUT     put     更新指定ID资源
    DELETE  del     删除指定ID资源
*/
const calcMethodAndCheckUrl = (reqApiName, reqId, ctx) => {
  const { method } = ctx.request
  let reqMethod = method.toLocaleLowerCase()
  if (reqId) {
    if (method === 'POST') ctx.throw(405)
    if (method === 'DELETE') reqMethod = 'del'
  } else {
    if (['DELETE', 'PUT'].includes(method)) ctx.throw(405)
    if (method === 'GET') reqMethod = 'ls'
  }
  return reqMethod
}

const router = new Router()
/*
  主路由方法，仅支持配置前缀下的请求
*/
router.all(API_PREFIX + '*', async (ctx, next) => {
  // 根据请求 path 获取请求 apiname 以及请求 id，并判断 path 是否合法
  const reqPath = ctx.request.path.replace(new RegExp(API_PREFIX), '')
  const [reqApiName, reqId, errPath] = reqPath.split('/').map(i => i.toLocaleLowerCase())
  if (errPath) ctx.throw(400, '请求路径不支持')
  // 根据请求计算内置请求方法
  const reqMethod = calcMethodAndCheckUrl(reqApiName, reqId, ctx)
  if (extraAPI.includes(reqApiName)) {
    // 扩展接口直接调用扩展文件并执行
    await require(':@/api/extra/' + reqApiName)(ctx, next)
  } else if (Object.keys(RESTFulModel).includes(reqApiName)) {
    // 标准 RESTFul 查询
    const reqModelName = RESTFulModel[reqApiName]
    await core(ctx, reqModelName, reqMethod, reqApiName, reqId, next)
  } else {
    ctx.throw(404)
  }
})

module.exports = router
