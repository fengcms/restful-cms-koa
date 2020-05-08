/*
  根据 token 获取或更新个人信息接口
*/

const { getToken } = require(':core/session')
const { getItem, putItem } = require(':query')
const { succ } = global.tool
module.exports = async (ctx, { params, method, token }, next) => {
  if (!token) ctx.throw(401, '请重新登录')
  // 校验 token 信息
  const { role, account, id } = await getToken(token)
  if (!role || !account) ctx.throw(401, '请重新登录')
  // 获取个人信息
  const model = role === 'admin' ? 'Manages' : 'Editor'
  if (['ls', 'get'].includes(method)) {
    // 读取账户信息
    const userInfo = await getItem(model, id)
    if (!userInfo) ctx.throw(500, '账户数据存在异常')
    // 删除密码信息并返回其他信息
    delete userInfo.password
    userInfo.role = role
    ctx.body = succ(userInfo)
  }
  // 更新个人信息
  if (['post', 'put'].includes(method)) {
    if (params.account !== account) ctx.throw(400, '个人账号不允许修改')
    const { password, editor } = params
    if (password) ctx.throw(400, '如果更改密码，请通过 change_password 接口')
    if (!['MARKDOWN', 'RICHEDITOR'].includes(editor)) ctx.throw(400, '个人编辑器参数有误')
    // 通过校验
    await putItem(model, id, params)
    ctx.body = succ('个人信息更新成功')
  }
}
