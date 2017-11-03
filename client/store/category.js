import {STOCK_EMOJI} from './emoji'

export default (state={}, {type, emoji}) => type === STOCK_EMOJI
  ? emoji.reduce((byCategory, e) => {
      byCategory[e.category] = e
      return byCategory
    }, {})
  : state