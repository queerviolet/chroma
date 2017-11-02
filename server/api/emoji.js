const {Emoji} = require('../db/models')

module.exports = require('express').Router()
  .param('name', (req, res, next) =>
    Emoji.findOne({where: {name: req.params.name}})
      .then(emoji => {
        req.emoji = emoji
        next()
      })
      .catch(next))

  .get('/', (req, res, next) =>
    Emoji.findAll()
      .then(emoji => res.send(emoji))
      .catch(next))

  .get('/:name', (req, res, next) =>
      res.send(req.emoji))