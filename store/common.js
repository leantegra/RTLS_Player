/**
 * State of selected location.
 */
import {namespaceConfig} from 'fast-redux'

const DEFAULT_STATE = {}
const {actionCreator, getState} = namespaceConfig('common', DEFAULT_STATE)

export const getCommonState = getState

export const updateLocationList = actionCreator(function updateLocationList (state, locationList) {
  return {...state, locationList}
})
