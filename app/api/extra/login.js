const { succ } = global.tool
module.exports = async (ctx, params, next) => {
  console.log(params)
  ctx.cookies.set('token', 'admin||xxxxxx')
  ctx.body = succ({ token: 'admin||xxxxxx' })
}
