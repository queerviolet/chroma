import React from 'react'
import {connect} from 'react-redux'
import select from '../store/select'

import {loadEmojis} from '../store/emoji'
import {addToCartById} from '../store/cart'

const Badge = connect(
  ({cart}, {emoji: {id}}) => ({
    qty: cart.getIn([id, 'qty'], 0)
  }),
  (dispatch, {emoji: {id}}) => ({
    onClick() {
      return dispatch(addToCartById(id, -1))
    }
  })
)(
  ({qty, onClick, emoji}) =>
    qty
      ? <span className='emojis-item-badge' onClick={onClick}>{qty}</span>
      : null
)

const Emoji = ({emoji, onClick}) =>
  <li className='emojis-item'>
      <a className='emojis-item-emoji' data-emoji-id={emoji.id} onClick={onClick}>
        {emoji.emoji}
      </a>
    <Badge emoji={emoji} />
  </li>

export const ManyEmoji = ({emoji, cart, onClick}) =>
  <ul className='emojis'> {
    emoji.map(emoji =>
      <Emoji key={emoji.id}
        emoji={emoji}
        cart={cart}          
        onClick={onClick}
      />)
  } </ul>

export const ByCategory =
  ({category: categories, onClick}) =>
  <div className="emoji-categories"> {
    Object.keys(categories)
      .map(c =>
        <li key={c} className="emoji-category" data-category={c}>
          <h1 className="emoji-category-header">{c}</h1>
          <ManyEmoji emoji={categories[c]} onClick={onClick} />
         </li>)
  } </div>

export default connect(select('category'), onClick(addToCart())) (
  ByCategory
)

function onClick(onClick) {
  return {onClick}
}

function addToCart(id=e => e.target.dataset.emojiId, qty=e => 1) {
  return e => addToCartById(id(e), qty(e))
}
