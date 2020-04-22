const { fail, logger } = global.tool
module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500
    ctx.body = fail(err.message, ctx.status)
    logger.error(err.message)
  }
}
