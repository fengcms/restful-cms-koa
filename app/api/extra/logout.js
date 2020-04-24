const { removeToken } = require(':core/session')
const { succ } = global.tool
module.exports = async (ctx, params, role, next) => {
  const token = ctx.header.token || ctx.cookies.get('token') || ''
  await removeToken(token)
  ctx.body = succ('退出成功')
}
