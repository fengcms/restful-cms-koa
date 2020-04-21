const Router = require('koa-router')

const { API_PREFIX } = require(':config')
const { models } = require(':@/model')
const { getJSFile, succ } = global.tool
const extraAPI = getJSFile('../api/extra')

const RESTFulModel = Object.keys(models).map(i => i.toLocaleLowerCase())

const router = new Router()

router.all(API_PREFIX + '*', async (ctx, next) => {
  const reqApiName = ctx.request.url.replace(new RegExp(API_PREFIX), '')
  if (extraAPI.includes(reqApiName)) {
    const oApi = require(':@/api/extra/' + reqApiName)
    await oApi(ctx, next)
  } else if (RESTFulModel.includes(reqApiName)) {
    ctx.body = succ({ love: 2 })
  } else {
    ctx.throw(404, 'Not Found')
  }
})

module.exports = router
