const {ARRAY, STRING, ENUM,
       Op: {contains}} = require('sequelize')
const db = require('../db')

const Emoji = module.exports = db.define('emoji', {
  description: STRING,
  emoji: unique(STRING),
  names: notNull(ARRAY(STRING)),
  category: notNull(ENUM(
      'symbols',
      'people',
      'nature',
      'foods',
      'activity',
      'places',
      'objects',
      'flags'))
})

Emoji.oneByName = function(name) {
  return this.findOne({
    where: {
      names: {[contains]: [name]}
    }
  })
}

function notNull(type) {
  return {type, allowNull: false}
}

function unique(type) {
  return {
    type, allowNull: false, unique: true,
  }
}