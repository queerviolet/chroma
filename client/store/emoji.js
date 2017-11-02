import axios from 'axios'
window.axios = axios

export const STOCK_EMOJI = 'STOCK_EMOJI'
export const stockEmoji = emoji => ({
  type: STOCK_EMOJI, emoji
})

export const loadEmojis = () =>
  dispatch => axios.get('/api/emoji')
    .then(({data: emoji}) => dispatch(stockEmoji(emoji)))    

export default function reducer(state = [], {type, emoji}) {
  if (type === STOCK_EMOJI) return emoji.map(
    e =>
      ({...e, id: String(e.id) }))
  return state
}
