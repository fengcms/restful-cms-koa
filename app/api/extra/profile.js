/*
  根据 token 获取个人信息接口
*/

const { getToken } = require(':core/session')
const { getItem } = require(':query')
const { succ } = global.tool
module.exports = async (ctx, params, next) => {
  // 校验token是否存在
  const token = ctx.header.token || ctx.cookies.get('token') || ''
  if (!token) ctx.throw(401, '请重新登录')
  // 校验 token 信息
  const { role, account } = await getToken(token)
  if (!role || !account) ctx.throw(401, '请重新登录')
  // 读取账户信息
  const userInfo = await getItem(role === 'admin' ? 'Manages' : 'Editor', { account })
  if (!userInfo) ctx.throw(400)
  // 删除密码信息并返回其他信息
  delete userInfo.password
  ctx.body = succ(userInfo)
}
