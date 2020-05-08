const { PERMISSION } = require(':config')
const { checkToken } = require(':core/session')
module.exports = async (ctx, apiName, method) => {
  // 获取 token 并从 token 获取用户角色
  // 同时支持 header 中和 cookies 中读取 token
  const token = ctx.header.token || ctx.cookies.get('token') || ''
  const tokenCheckRes = await checkToken(token)
  const reqRoleName = tokenCheckRes ? tokenCheckRes.role : ''
  const roleName = ['editor', 'admin'].includes(reqRoleName) ? reqRoleName : 'anyone'

  // 从权限配置名单中，读取对应接口的权限配置
  const apiPerm = PERMISSION[apiName]
  if (apiPerm) {
    const apiRolePerm = apiPerm[roleName]
    if (!apiRolePerm) ctx.throw(500, '服务端接口权限配置有误')
    if (!apiRolePerm.includes(method)) {
      if (roleName === 'anyone') {
        ctx.throw(401, '请登录后操作')
      } else {
        ctx.throw(403, '您没有权限操作')
      }
    }
  } else {
    /*
      如权限配置内未配置的接口名称，当前放走，交由路由层面处理
      也可在此直接 返回 404
      ctx.throw(404)
    */
  }
  return { roleName, token }
}
