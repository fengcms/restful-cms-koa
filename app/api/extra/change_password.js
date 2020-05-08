const { getToken } = require(':core/session')
const { getItem, putItem } = require(':query')
const { succ, rsa } = global.tool
module.exports = async (ctx, { params, roleName }, next) => {
  // 校验入参
  const { oldPassword, newPassword } = params
  if (!oldPassword && !newPassword) ctx.throw(410, '请输入原密码以及新密码')

  // 校验传入密码是否可以解密
  const oldPw = await rsa.decrypt(oldPassword).catch(e => ctx.throw(410, '原密码有误，请检查客户端RSA配置'))
  const newPw = await rsa.decrypt(newPassword).catch(e => ctx.throw(410, '新密码有误，请检查客户端RSA配置'))

  if (newPw.length < 6) ctx.throw(410, '新密码长度不能小于6位')

  // 校验token是否存在
  const token = ctx.header.token || ctx.cookies.get('token') || ''
  if (!token) ctx.throw(401, '请重新登录')

  // 校验 token 信息
  const { role, account } = await getToken(token)
  if (!role || !account) ctx.throw(401, '请重新登录')

  // 读取账户信息
  const model = role === 'admin' ? 'Manages' : 'Editor'
  const userInfo = await getItem(model, { account })
  if (!userInfo) ctx.throw(500, '账户数据存在异常')

  // 从账户信息中获取密码并解密
  const dbPw = await rsa.decrypt(userInfo.password).catch(e => ctx.throw(500, '账户数据存在异常'))

  if (oldPw !== dbPw) ctx.throw(410, '原密码不正确')

  // 通过校验
  await putItem(model, userInfo.id.toString(), { password: newPassword })
  ctx.body = succ('密码修改成功')
}
