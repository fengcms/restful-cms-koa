module.exports = {
  async post (ctx, { params, role }) {
    const { name } = params
    // 校验必填参数
    if (!name) ctx.throw(400, '作者姓名不能为空')
    return params
  },
  async put (ctx, { params, role, id }) {
    const { name } = params
    // 校验必填参数
    if (!name) ctx.throw(400, '作者姓名不能为空')
    return params
  }
}
