module.exports = {
  ls (params, role, ctx) {
    console.log(role)
    return params
  },
  post (params, role, ctx) {
    // if (!Object.keys(params).includes('channel_id')) {
    //   ctx.throw(410, '栏目ID不能为空')
    // }
    // console.log(params)
    return params
  },
  get (params, role, ctx, id) {
    return params
  },
  put (params, role, ctx, id) {
    return params
  },
  del (params, role, ctx, id) {
    return params
  }
}
