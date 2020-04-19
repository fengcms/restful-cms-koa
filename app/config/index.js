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
  storage: 'db/news.db'
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
module.exports = {
  DB_CONN,
  DB_PREFIX,
  APP_HOST,
  API_PREFIX
}
