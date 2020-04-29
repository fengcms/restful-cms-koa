const bestRequire = require('best-require')
// best-require 定义常用目录变量
bestRequire(process.cwd(), {
  '@': '~/app',
  config: ':@/config',
  utils: ':@/utils',
  core: ':@/core',
  query: ':core/query'
})
const app = require('./app/index')
const { host, port } = require(':config').APP_HOST
// 启动 APP
app.listen(port, host, () => {
  console.log(`RESTFul CMS api listening on http://${host}:${port}!`)
})
