const { rsa } = global.tool
const { getList, getItem } = require(':query')
const { getToken } = require(':core/session')
module.exports = {
  async post (params, role, ctx) {
    const { account, name, password } = params
    // 校验必填参数
    if (!account) ctx.throw(410, '超级管理员账号不能为空')
    if (!name) ctx.throw(410, '超级管理员姓名不能为空')
    if (!password) ctx.throw(410, '超级管理员登录密码不能为空')
    // 校验账号是否唯一
    const hasAccount = await getItem('Manages', { account })
    if (hasAccount) ctx.throw(410, '超级管理员账号已经存在')
    // 校验传入密码是否能 RSA 解密
    await rsa.decrypt(password).catch(e => ctx.throw(410, '超级管理员登录密码有误，请检查客户端RSA配置'))
    return params
  },
  async put (params, role, ctx, id) {
    const { account, name, password } = params
    // 校验必填参数
    if (!account) ctx.throw(410, '超级管理员账号不能为空')
    if (!name) ctx.throw(410, '超级管理员姓名不能为空')
    // 校验账号是否唯一
    const hasAccount = await getItem('Manages', { account })
    if (hasAccount && hasAccount.id.toString() !== id) ctx.throw(410, '超级管理员账号已经存在')
    // 校验传入密码是否能 RSA 解密
    if (password) {
      await rsa.decrypt(password).catch(e => ctx.throw(410, '超级管理员登录密码有误，请检查客户端RSA配置'))
    }
    return params
  },
  async del (params, role, ctx, id) {
    // 校验是否是最后一个超管账号
    const managesList = await getList('Manages')
    if (managesList.count <= 1) ctx.throw(410, '系统至少需要一个超级管理员账号')
    // 校验token是否存在
    const token = ctx.header.token || ctx.cookies.get('token') || ''
    if (!token) ctx.throw(410, '请重新登录')
    // 校验 token 信息
    const { account } = await getToken(token)
    if (!account) ctx.throw(410, '请重新登录')
    // 校验是否是删除自己
    const userInfo = await getItem('Manages', id)
    if (userInfo.account === account) ctx.throw(410, '不能删除自己哦！')
    // 通过校验
    return params
  }
}
