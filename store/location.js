/**
 * State of selected location.
 */
// const {actionCreator, getState} = namespaceConfig('location', DEFAULT_STATE)

// export const getLocationState = (state, slug) => getState()[slug]

const DEFAULT_STATE = {
  slug: null,
  meta: {},
  files: [],
  tracks: []
}

export function updateMeta (state = DEFAULT_STATE, meta) {
  return {...state, meta}
}

export function addTrack (state = DEFAULT_STATE, track) {
  return {...state, tracks: [...state.tracks, track]}
}

export function removeTrack (state = DEFAULT_STATE, track) {
  return {...state, tracks: state.tracks.filter(t => t !== track)}
}

export function removeAllTracks (state = DEFAULT_STATE) {
  return {...state, tracks: []}
}
