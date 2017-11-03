import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import emoji from './emoji'
import cart from './cart'
import category from './category'

const reducer = combineReducers({user, emoji, cart, category})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer,
  localStorage.store ?  JSON.parse(localStorage.store) : undefined,
  middleware)

window.store = store

store.subscribe(() =>
  localStorage.store = JSON.stringify(store.getState()))
export default store
export * from './user'
