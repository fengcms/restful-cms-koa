const { succ, rsa } = global.tool
module.exports = async (ctx, params, next) => {
  const { account, password, role } = params
  if (!account || !password || !role) {
    ctx.throw(400, '请输入用户名密码')
  }
  if (!['admin', 'editor'].includes(role)) {
    ctx.throw(400, '用户角色参数错误')
  }
  const reqPw = await rsa.decrypt(password).catch(e => {
    ctx.throw(400, '用户名密码错误')
  })
  console.log(reqPw)
  ctx.cookies.set('token', 'admin||xxxxxx', {
    httpOnly: true
  })
  ctx.body = succ({ token: 'admin||xxxxxx' })
}
