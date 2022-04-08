const { getToken } = require(':core/session')
const { getItem, putItem } = require(':query')
const { succ, rsa } = global.tool
const { getStrSha256 } = require(':utils/hash')

module.exports = async (ctx, { params, roleName }, next) => {
  // 校验入参
  const { oldPassword, newPassword } = params
  if (!oldPassword && !newPassword) ctx.throw(400, '请输入原密码以及新密码')

  // 校验传入密码是否可以解密
  const oldPw = await rsa.decrypt(oldPassword).catch(e => ctx.throw(400, '原密码有误，请检查客户端RSA配置'))
  const newPw = await rsa.decrypt(newPassword).catch(e => ctx.throw(400, '新密码有误，请检查客户端RSA配置'))

  if (newPw.length < 6) ctx.throw(400, '新密码长度不能小于6位')

  // 校验token是否存在
  const token = ctx.header.token || ctx.cookies.get('token') || ''
  if (!token) ctx.throw(401, '请重新登录')

  // 校验 token 信息
  const { role, account, id } = await getToken(token)
  if (!role || !account) ctx.throw(401, '请重新登录')

  // 读取账户信息
  const model = role === 'admin' ? 'Manages' : 'Editor'
  const userInfo = await getItem(model, id)
  if (!userInfo) ctx.throw(500, '账户数据存在异常')

  const hashOldPw = getStrSha256(oldPw + userInfo.salt)
  // 从账户信息中获取密码并解密
  // const dbPw = await rsa.decrypt(userInfo.password).catch(e => ctx.throw(500, '账户数据存在异常'))

  if (hashOldPw !== userInfo.password) ctx.throw(400, '原密码不正确')

  const hashNewPw = getStrSha256(newPw + userInfo.salt)

  // 通过校验
  await putItem(model, id, { password: hashNewPw })
  ctx.body = succ('密码修改成功')
}
