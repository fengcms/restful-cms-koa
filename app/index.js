// 引入公共库
const path = require('path')
const Koa = require('koa')
const koaJson = require('koa-json')
const koaBody = require('koa-body')
const staticFiles = require('koa-static')

// 将工具函数挂载到全局
global.tool = require(':utils/tool')
// 引入自定义中间件
const { accessLogger, logger } = require(':@/middle/logger')
global.tool.logger = logger // 将打日志方法挂载到全局工具
const koaError = require(':@/middle/error')

// 引入配置

const configKoaBody = require(':config/config-koa-body')
// 引入路由
const router = require(':@/router')
// 创建 APP 并注册各种中间件
const app = new Koa()
app.use(koaError)
app.use(accessLogger())
app.use(staticFiles(path.resolve(process.cwd(), './static')))
app.use(koaBody(configKoaBody))
app.use(koaJson({ pretty: false, param: 'pretty' }))
app.use(router.routes())
app.use(router.allowedMethods())
app.on('error', (err, ctx) => {
  logger.error(err)
})

module.exports = app
