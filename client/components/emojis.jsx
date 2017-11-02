import React from 'react'
import {connect} from 'react-redux'

import {loadEmojis} from '../store/emoji'
import {addToCartById} from '../store/cart'

const Badge = connect(
  ({cart: {byId}}) => ({cart: byId}),
  (dispatch, {emoji: {id}}) => ({
    onClick() {
      return dispatch(addToCartById(id, -1))
    }
  })
)(
  ({emoji: {id}, cart, onClick}) =>
    cart[id] && cart[id].qty
        ? <span className='emojis-item-badge' onClick={onClick}>{cart[id].qty}</span>
        : null
)

const Emoji = ({emoji, cart, onClick}) =>
  <li className='emojis-item'>
    <div className='emojis-item-emoji'>
      <a data-emoji-id={emoji.id} onClick={onClick}>
        {emoji.emoji}
      </a>
    </div>
    <Badge emoji={emoji} />    
  </li>

export class Emojis extends React.Component {
  componentDidMount() {
    this.props.loadEmojis()
      .catch(alert)
  }

  render() {
    const {emoji, cart, onClick} = this.props
    return <ul className='emojis'> {
      emoji.map(emoji =>
        <Emoji key={emoji.id}
          emoji={emoji}
          cart={cart}          
          onClick={onClick}
        />)
    } </ul>
  }
}

export default connect(
  ({emoji, cart}) => ({emoji, cart}),
  {
    loadEmojis,
    onClick(evt) {
      const id = +evt.target.dataset.emojiId
      return addToCartById(id)
    }
  })(Emojis)
