// 引入公共库
const path = require('path')
const Koa = require('koa')
const koaJson = require('koa-json')
const koaBody = require('koa-body')
const staticFiles = require('koa-static')
const bestRequire = require('best-require')
// best-require 定义常用目录变量
bestRequire(process.cwd(), {
  '@': '~/app',
  config: ':@/config',
  utils: ':@/utils'
})
// 将工具函数挂载到全局
global.tool = require(':utils/tool')
// 引入配置
const { host, port } = require(':config').APP_HOST
const configKoaBody = require(':config/config-koa-body')
// 引入自定义中间件
const koaError = require(':@/middle/error')
const { accessLogger, logger } = require(':@/middle/logger')
// 引入路由
const router = require(':@/router')
// 创建 APP 并注册各种中间件
const app = new Koa()
app.use(koaError)
app.use(accessLogger())
app.use(staticFiles(path.resolve(__dirname, '../static')))
app.use(koaBody(configKoaBody))
app.use(koaJson({ pretty: false, param: 'pretty' }))
app.use(router.routes())
app.use(router.allowedMethods())
app.on('error', (err, ctx) => {
  logger.error(err)
})
// 启动 APP
app.listen(port, host, () => {
  console.log(`RESTFul CMS api listening on http://${host}:${port}!`)
})

// const model = require('./model')
// model.News.create({ title: 'new title test' })
// console.log('test')
