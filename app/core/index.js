const query = require('./query')
const { succ, getJSFile } = global.tool
const beforeHandle = getJSFile('../api/restful/before')
const afterHandle = getJSFile('../api/restful/after')
/*
  RESTFul 核心处理方法，在此加载前处理、后处理，并查询数据
*/
module.exports = async (ctx, { params, model, method, apiName, roleName, id }, next) => {
  // 如有前处理，加载前处理
  if (beforeHandle.includes(apiName)) {
    const handle = require(':@/api/restful/before/' + apiName)[method]
    if (handle) params = await handle(params, roleName, ctx, id)
    // 在前处理中如果没有返回任何值，则终止后续操作
    if (!params) return
  }
  // 进入数据库查询
  let data = await query[method](ctx, model, method, params, id)
  // 如有后处理，对查询结果进行处理
  if (afterHandle.includes(apiName)) {
    const handle = require(':@/api/restful/after/' + apiName)[method]
    if (handle) data = await handle(data, roleName, ctx, id)
  }
  ctx.body = succ(data)
}
