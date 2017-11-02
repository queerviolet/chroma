import axios from 'axios'

export const STOCK_CART = 'STOCK_CART'
export const stockCart = cart => ({
  type: STOCK_CART, cart
})

export const loadCart = () =>
  dispatch => axios.get('/api/cart')
    .then(({data: cart}) => dispatch(stockCart(cart)))

export const addToCartById = (emojiId, delta = 1) =>
  dispatch => axios.put('/api/cart', {emojiId, delta})
    .then(() => dispatch(loadCart()))

export default function reducer(state = {
  cart: {},
  byId: {}
}, {type, cart}) {
  if (type === STOCK_CART) {
    return {
      cart,
      byId: cart.emojis.reduce((byId, emoji) => {
        byId[emoji.id] = Object.assign({},
          emoji, {qty: emoji.line_item.qty})
        return byId
      }, {})
    }
  }

  return state
}
