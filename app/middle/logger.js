const koaLog = require('koa-log4')
const path = require('path')
const fs = require('fs')

const logDir = path.resolve(process.cwd(), './log')
// 检查临时文件夹是否存在，若不存在则新建
fs.access(logDir, err => {
  if (err) {
    fs.mkdir(logDir, { recursive: true }, (err) => {
      if (err) throw err
    })
  }
})
koaLog.configure({
  appenders: {
    access: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log', // 生成文件的规则
      filename: path.resolve(logDir, 'access.log') // 生成文件名
    },
    application: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log',
      filename: path.resolve(logDir, 'application.log')
    },
    out: {
      type: 'console'
    }
  },
  categories: {
    default: { appenders: ['out'], level: 'info' },
    access: { appenders: ['access'], level: 'info' },
    application: { appenders: ['application'], level: 'WARN' }
  }
})

exports.accessLogger = () => koaLog.koaLogger(koaLog.getLogger('access')) // 记录所有访问级别的日志
exports.logger = koaLog.getLogger('application') // 记录所有应用级别的日志
