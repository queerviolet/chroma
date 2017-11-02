const db = require('../db')
const {ENUM} = require('sequelize')

const Order = module.exports = db.define('order', {
  status: ENUM('cart', 'paid', 'pending', 'shipped')
})

/**
 * @param{User?} user
 */
Order.cartForUser = function(user) {
  const {Emoji} = require('.')  
  if (!user) return Order.create({status: 'cart'})
  return Order.findOrCreate({
    where: {userId: user.id, status: 'cart'},
    include: [Emoji]
  }).then(([cart]) => cart)
}

Order.prototype.updateQty = async function(emojiId, by) {
  const {LineItem} = require('.')
  const line = await LineItem
    .findOrCreate(
      {
        where: {emojiId, orderId: this.id},
        defaults: {qty: 0}
      }
    )
    .then(([l]) => l)
  return line.increment('qty', {by})
}
