const Koa = require('koa')
const json = require('koa-json')
const bodyParser = require('koa-bodyparser')
const router = require('./router')
const { host, port } = require('./config').APP_HOST

const app = new Koa()

app.use(bodyParser())
app.use(json({ pretty: false, param: 'pretty' }))
app.use(router.routes())
app.use(router.allowedMethods())
app.on('error', (err, ctx) => {
  console.log(err)
})
app.listen(port, host, () => {
  console.log(`RESTFul CMS api listening on http://${host}:${port}!`)
})

// const model = require('./model')
// model.News.create({ title: 'new title test' })
// console.log('test')
