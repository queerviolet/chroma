'use strict'

const debug = require('debug')('cart')
const {Order, Emoji, LineItem} = require('../db/models')

/**
 * Puts a cart on req.cart.
 *  
 */
async function withCart(req, res, next) {
  // Look and see if there's already a req.cart, and if so bail:
  if (req.cart) return next()

  // If there's a cartId on the session, we'll want to 
  // load it up and put it on req.cart.
  const {cartId} = req.session
  if (cartId) {
    debug('loading cartId=%s', cartId)
    const cart = await Order.findOne(
      {where: {id: cartId, status: 'cart'},
      include: [Emoji]})
    if (cart) return sendCart(cart)
  }

  Order.cartForUser(req.user)
    .then(cart => {
      debug('created cart, setting cartId=', cart.id)
      req.session.cartId = cart.id
      return cart
    })
    .then(sendCart)
    .catch(next)

  function sendCart(cart) {
    req.cart = cart
    next()
  }

  // Otherwise, create an order that will serve as the cart,
  // and set its id on req.session.

  // debug('creating...')
  // return Order.create({userId: req.user ? req.user.id : null})
  //   .then(cart => {
  //     debug('created cart, setting cartId=', cart.id)
  //     req.session.cartId = cart.id
  //     return cart
  //   })
  //   .then(sendCart)
  //   .catch(next)
}

module.exports = require('express').Router()
  .use(withCart)
  .get('/', (req, res) => res.send(req.cart))
  .put('/', (req, res, next) => {
    const {emojiId, delta} = req.body
    req.cart.updateQty(emojiId, delta)
      .then(() => res.send('OK'))
      .catch(next)
  })
  .post('/buy', (req, res, next) =>
    req.cart.update({status: 'paid'})
      .then(cart => res.send(cart))
  )
