const Router = require('koa-router')

const Core = require(':core')
const Authentication = require(':core/authentication')
const { API_PREFIX } = require(':config')
const { models } = require(':@/model')
const { getJSFile, objKeyLower } = global.tool
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
const calcMethodAndCheckUrl = (apiName, id, ctx) => {
  const { method } = ctx.request
  let reqMethod = method.toLocaleLowerCase()
  if (id) {
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
  const [apiName, id, errPath] = reqPath.split('/').map(i => i.toLocaleLowerCase())
  if (errPath) ctx.throw(400, '请求路径不支持')
  // 根据请求计算内置请求方法
  const method = calcMethodAndCheckUrl(apiName, id, ctx)
  // 请求鉴权，并返回角色名称
  const { roleName, token } = await Authentication(ctx, apiName, method)
  // 根据请求方法整理参数
  const params = method === 'ls' ? objKeyLower(ctx.request.query) : ctx.request.body
  const allParams = { apiName, params, roleName, method, id, token }
  if (extraAPI.includes(apiName)) {
    // 扩展接口直接调用扩展文件并执行
    await require(':@/api/extra/' + apiName)(ctx, allParams, next)
  } else if (Object.keys(RESTFulModel).includes(apiName)) {
    // 标准 RESTFul 查询
    const model = RESTFulModel[apiName]
    allParams.model = model
    await Core(ctx, allParams, next)
  } else {
    ctx.throw(404)
  }
})

module.exports = router
