const Sequelize = require('sequelize')
const { DB_CONN, DB_PREFIX, DB_NAME, DB_USERNAME, DB_PASSWORD } = require(':config')
const models = require('./models')
const sequelize = DB_CONN.dialect === 'sqlite' ? new Sequelize(DB_CONN) : new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, DB_CONN)
Object.keys(models).forEach(item => {
  sequelize.define(
    item,
    models[item],
    {
      freezeTableName: true,
      tableName: (DB_PREFIX + item).toLowerCase(),
      timestamps: false
    }
  )
})
sequelize.sync()
console.log('[INFO] model init success')

module.exports = sequelize
