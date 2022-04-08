const { rsa } = global.tool
const { getList, getItem } = require(':query')
const { getToken } = require(':core/session')
const { getStrMd5, getStrSha256 } = require(':utils/hash')

const checkParams = async ({ account, name, password, editor }, role, ctx) => {
  // 校验必填参数
  if (!account) ctx.throw(400, '超级管理员账号不能为空')
  if (!name) ctx.throw(400, '超级管理员姓名不能为空')
  // 校验编辑器参数
  if (editor && !['MARKDOWN', 'RICHEDITOR'].includes(editor)) ctx.throw(400, '个人编辑器参数有误')
  // 校验传入密码是否能 RSA 解密
  if (password) await rsa.decrypt(password).catch(e => ctx.throw(400, '超级管理员登录密码有误，请检查客户端RSA配置'))
}

module.exports = {
  async post (ctx, { params, params: { account, password }, role }) {
    // 公共校验方法
    await checkParams(params, role, ctx)
    // 校验必填参数
    if (!password) ctx.throw(400, '超级管理员登录密码不能为空')

    // 校验账号是否唯一
    const mamageInfo = await getItem('Manages', { account })
    if (mamageInfo) ctx.throw(400, '超级管理员账号已经存在')

    params.salt = getStrMd5(String(Math.random()))
    const pw = await rsa.decrypt(password)
    params.password = getStrSha256(pw + params.salt)

    return params
  },
  async put (ctx, { params, params: { account }, role, id }) {
    // 公共校验方法
    await checkParams(params, role, ctx)

    // 校验账号是否唯一
    const mamageInfo = await getItem('Manages', id)
    if (!mamageInfo) ctx.throw(404, '您要更新信息的超级管理员账号不存在')
    if (mamageInfo.account !== account) ctx.throw(400, '超级管理员账号不允许修改')
    delete params.password
    delete params.salt
    return params
  },
  async del (ctx, { params, role, token, id }) {
    // 校验是否是最后一个超管账号
    const managesList = await getList('Manages')
    if (managesList.count <= 1) ctx.throw(400, '系统至少需要一个超级管理员账号')
    // 校验token是否存在
    if (!token) ctx.throw(401, '请重新登录')
    // 校验 token 信息
    const { account } = await getToken(token)
    if (!account) ctx.throw(401, '请重新登录')
    // 校验是否是删除自己
    const userInfo = await getItem('Manages', id)
    if (userInfo.account === account) ctx.throw(400, '不能删除自己哦！')
    // 通过校验
    return params
  }
}
