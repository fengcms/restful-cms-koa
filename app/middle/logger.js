const koaLog = require('koa-log4')
const path = require('path')

const { makeDir } = global.tool
const logDir = path.resolve(process.cwd(), './log')
makeDir(logDir)

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

module.exports = {
  accessLogger: () => koaLog.koaLogger(koaLog.getLogger('access')),
  logger: koaLog.getLogger('application')
}
