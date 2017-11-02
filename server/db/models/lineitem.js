const db = require('../db')
const {INTEGER} = require('sequelize')

module.exports = db.define('line_item', {
  qty: {
    type: INTEGER,
    allowNull: false,
  },
})
