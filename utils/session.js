import debuger from 'debug'
const debug = debuger('utils/session')

export function getSessionDeviceIds (session) {
  return session[0] && session[0].devices.map(d => d.id)
}

// translate geojson to canvas coordinates
export function translate (lon, lat, loc) {
  let x = loc.width * (lon - loc.topLeft[0]) / (loc.bottomRight[0] - loc.topLeft[0])
  let y = loc.height * (loc.topLeft[1] - lat) / (loc.topLeft[1] - loc.bottomRight[1])
  return {x: Math.round(x), y: Math.round(y)}
}

export function makeTrack (loc, file, session, mac) {
  debug('makeTrack', loc, file, session, mac)
  let start = session[0].timestamp
  if (!mac) mac = session[0].devices[0].id
  let points = session.map(tick => {
    let device = tick.devices.filter(d => d.id === mac)[0]
    return device && Object.assign({
      ts: tick.timestamp - start,
      lon: device.lon,
      lat: device.lat,
      signals: device.signals
    }, translate(device.lon, device.lat, loc))
  }).filter(Boolean)
  return { id: mac, file, points }
}

// FIXME: calculate widthInMeters from coordinates
export function translateDistance (distance, loc) {
  return Math.round(loc.width * distance / loc.widthInMeters)
}

const LONG = 71400.0 // Coefficient of conversion of longitude degrees to distance
const LAT = 111280.0 // Coefficient of conversion of latitude degrees to distance

// return distance between points a and b in meters
function getDistanceBetweenCoordinates (a, b) {
  let dx = (a[0] - b[0]) * LONG
  let dy = (a[1] - b[1]) * LAT
  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
}
