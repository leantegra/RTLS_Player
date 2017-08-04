import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { rootReducer } from 'fast-redux'
import withRedux from 'next-redux-wrapper'

export const initStore = (initialState = {}) => {
  return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}

export const attachRedux = (comp) => withRedux(initStore)(comp)
