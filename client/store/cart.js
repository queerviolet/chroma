import axios from 'axios'

export const STOCK_CART = 'STOCK_CART'
export const stockCart = cart => ({
  type: STOCK_CART, cart
})

export const UPDATE_QTY = 'UPDATE_QTY'
export const updateQty = (emojiId, delta) => ({
  type: UPDATE_QTY, emojiId, delta
})

export const loadCart = () =>
  dispatch => axios.get('/api/cart')
    .then(({data: cart}) => dispatch(stockCart(cart)))

export const addToCartById = (emojiId, delta = 1) =>
  dispatch => {
    dispatch(updateQty(emojiId, delta))
    return axios.put('/api/cart', {emojiId, delta})
  }


const {Map, fromJS} = require('immutable')

export default function reducer(state = Map(), {type, cart, emojiId, delta}) {
  if (type === '@@INIT') {
    return fromJS(state)
  }

  if (type === STOCK_CART) {
    return Map().withMutations(C =>
      cart.emojis.forEach(emoji => {
        C.set(String(emoji.id), fromJS(emoji))
        C.setIn([String(emoji.id), 'qty'], emoji.line_item.qty)
      }))
  }

  if (type === UPDATE_QTY) {
    return state.updateIn([emojiId, 'qty'], 0, qty => qty + delta)
  }

  return state
}
