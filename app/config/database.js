// 数据库连接配置
/* sqlite 数据库连接配置 */
const DB_CONN = {
  host: 'localhost',
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  query: { raw: true },
  storage: 'db/news.db',
  logging: function (sql) {
    // console.log(sql)
  }
}

/* PostgreSQL 数据库连接配置 */
// const DB_CONN = {
//   host: '10.211.55.9',
//   dialect: 'postgres',
//   database: 'news',
//   username: 'postgres',
//   password: 'postgres',
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   },
//   query: { raw: true },
//   logging: function (sql) {
//   }
// }

/* MYSQL 数据库连接配置 */
// const DB_CONN = {
//   host: '127.0.0.1', // 主机地址
//   port: '3306',
//   dialect: 'mysql',
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   },
//   query: { raw: true },
//   logging: function (sql) {
//   },
//   dialectOptions: {
//     charset: 'utf8mb4' // 字符集
//   }
// }

// 数据库表名前缀设置
const DB_PREFIX = 'fungleo_'

const DB_NAME = 'restful-cms'
const DB_USERNAME = 'root'
const DB_PASSWORD = '123456'

module.exports = {
  DB_CONN, DB_PREFIX, DB_NAME, DB_USERNAME, DB_PASSWORD
}
