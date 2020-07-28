// 数据库连接配置
/* sqlite 数据库连接配置 */
// const DB_CONN = {
//   host: 'localhost',
//   dialect: 'sqlite',
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   },
//   query: { raw: true },
//   storage: 'db/news.db',
//   logging: function (sql) {
//     // console.log(sql)
//   }
// }

/* PostgreSQL 数据库连接配置 */
const DB_CONN = {
  host: '10.211.55.9',
  dialect: 'postgres',
  database: 'news',
  username: 'postgres',
  password: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  query: { raw: true },
  logging: function (sql) {
  }
}

// 数据库表名前缀设置
const DB_PREFIX = 'fungleo_'

module.exports = {
  DB_CONN, DB_PREFIX
}
