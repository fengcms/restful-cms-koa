// const Koa = require('koa')
// const app = new Koa()
//
// app.use(async ctx => {
//   ctx.body = 'Hello World'
// })
//
// app.listen(3000)

const model = require('./model')
model.News.create({ title: 'new title test' })
console.log('test')
