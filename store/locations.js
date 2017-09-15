/**
 * State of selected location.
 */
import {namespaceConfig} from 'fast-redux'
import mapValues from 'lodash.mapvalues'

const DEFAULT_STATE = {}
const {actionCreator, getState} = namespaceConfig('locations', DEFAULT_STATE)

export const getLocationState = (state, slug) => getState(state)[slug] || {}

export const childActionCreator = (childId, handler, name) => {
  return actionCreator(
    name || handler.name,
    (state = {}, ...args) => {
      if (state === undefined) state = {}
      console.log('reducer for name', name, 'childId', childId, 'state', state, 'args', args)
      let childState = state[childId]
      return {...state, [childId]: handler(childState, ...args)}
    })
}

export function childActionCreators (childId, module) {
  return mapValues(module, (handler, name) => childActionCreator(childId, handler, name))
}
