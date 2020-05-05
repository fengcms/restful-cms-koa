module.exports = {
  async post (params, role, ctx) {
    const { name } = params
    // 校验必填参数
    if (!name) ctx.throw(410, '作者姓名不能为空')
    return params
  },
  async put (params, role, ctx, id) {
    const { name } = params
    // 校验必填参数
    if (!name) ctx.throw(410, '作者姓名不能为空')
    return params
  }
}
