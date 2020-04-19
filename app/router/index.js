const Router = require('koa-router')
const { API_PREFIX } = require('../config')
const router = new Router()

router.all(API_PREFIX + '*', (ctx, next) => {
  console.log(ctx.request.body)
  console.log(JSON.stringify(ctx.request))
  ctx.body = {
    love: 1
  }
})

module.exports = router
