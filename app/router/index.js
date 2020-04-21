const Router = require('koa-router')
const path = require('path')

const { API_PREFIX } = require(':config')

const otherAPI = global.tool.getJSFile('../api/other')

const router = new Router()

router.all(API_PREFIX + '*', async (ctx, next) => {
  const reqApiName = ctx.request.url.replace(new RegExp(API_PREFIX), '')
  if (otherAPI.includes(reqApiName)) {
    const oApi = require(path.resolve(__dirname, '../api/other/' + reqApiName))
    await oApi(ctx, next)
  } else {
    console.log(ctx.request.body)
    ctx.body = {
      love: 1
    }
  }
})

module.exports = router
