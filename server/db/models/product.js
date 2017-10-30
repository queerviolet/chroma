const crypto = require('crypto')
const {STRING, INTEGER, DECIMAL} = require('sequelize')
const db = require('../db')

module.exports = db.define('product', {
  name: STRING,
  red: INTEGER,
  green: INTEGER,
  blue: INTEGER,
  price: DECIMAL(12, 2),
})
