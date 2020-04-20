
module.exports = (ctx, next) => {
  // console.log(Object.keys(ctx.request))
  // console.log(ctx.request.files)
  ctx.body = global.tool.succ({ love: 1 })
}
