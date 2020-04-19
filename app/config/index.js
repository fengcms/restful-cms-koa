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

const DB_PREFIX = 'fungleo_'

module.exports = {
  DB_CONN,
  DB_PREFIX
}
