const {STRING} = require('sequelize')
const db = require('../db')

module.exports = db.define('emojis', {
  description: STRING,
  name: STRING,
  emoji: STRING,
})