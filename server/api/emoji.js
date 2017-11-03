const {Emoji} = require('../db/models')

class EmojiNotFound extends Error {
  constructor(name) {
    super(`Emoji not found: "${name}"`)
    this.name = name    
  }  

  get statusCode() { return 404 }
}

module.exports = require('express').Router()
  .param('name', (req, res, next) =>
    Emoji.oneByName(req.params.name)
      .then(emoji => {
        if (!emoji)
          return next(new EmojiNotFound(req.params.name))
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