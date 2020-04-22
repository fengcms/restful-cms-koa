const { logger } = global.tool
// 数据库连接配置
const DB_CONN = {
  host: 'localhost',
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  storage: 'db/news.db',
  logging: function (sql) {
    logger.info(sql)
  }

}
// 数据库表名前缀设置
const DB_PREFIX = 'fungleo_'

// app 运行设置
const APP_HOST = {
  host: '0.0.0.0',
  port: 3000
}
// 项目接口前缀
const API_PREFIX = '/api/v1/'

// 分页列表默认每页条数
const PAGE_SIZE = 10

module.exports = {
  DB_CONN,
  DB_PREFIX,
  APP_HOST,
  API_PREFIX,
  PAGE_SIZE
}
