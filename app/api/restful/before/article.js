module.exports = {
  ls (params, ctx) {
    return params
  },
  post (params, ctx) {
    // if (!Object.keys(params).includes('channel_id')) {
    //   ctx.throw(410, '栏目ID不能为空')
    // }
    // console.log(params)
    return params
  },
  get (params, ctx, id) {
    return params
  },
  put (params, ctx, id) {
    return params
  },
  del (params, ctx, id) {
    return params
  }
}
