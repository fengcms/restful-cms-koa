// 数据库连接配置
// sqlite 必须安装 sqlite3 依赖
// npm i sqlite3
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
  storage: 'db/data.db',
  logging: function (sql) {
    // console.log(sql)
  }
}

// PostgreSQL 必须安装 pg 依赖
// npm i pg
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

// MYSQL 必须安装 mysql mysql2 依赖
// npm i mysql mysql2
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
const DB_PREFIX = 'car_'
// 以下配置为 PostgreSQL 或 MYSQL 必填
// 数据库名称，用户名，密码
const DB_NAME = 'restful-cms'
const DB_USERNAME = 'root'
const DB_PASSWORD = '123456'

module.exports = {
  DB_CONN, DB_PREFIX, DB_NAME, DB_USERNAME, DB_PASSWORD
}
