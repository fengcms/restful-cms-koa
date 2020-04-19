const Sequelize = require('sequelize')
const { STRING, INTEGER, TEXT } = Sequelize

module.exports = {
  User: {
    name: STRING,
    sex: INTEGER
  },
  News: {
    title: STRING,
    content: TEXT
  }
}
