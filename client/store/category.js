import {STOCK_EMOJI} from './emoji'

export default (state={}, {type, emoji}) => type === STOCK_EMOJI
  ? emoji.reduce((byCategory, e) => {
      const cat = (byCategory[e.category] = byCategory[e.category] || [])
      cat.push({...e, id: String(e.id)})
      return byCategory
    }, {})
  : state