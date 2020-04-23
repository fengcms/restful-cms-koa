const koaLog = require('koa-log4')
const path = require('path')

const { LOG_DIR } = require(':config').APP_DIR
const { makeDir } = global.tool
makeDir(LOG_DIR)

koaLog.configure({
  appenders: {
    access: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log', // 生成文件的规则
      filename: path.resolve(LOG_DIR, 'access.log') // 生成文件名
    },
    application: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log',
      filename: path.resolve(LOG_DIR, 'application.log')
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
