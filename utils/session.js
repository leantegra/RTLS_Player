export function getSessionDeviceIds (session) {
  return session[0] && session[0].devices.map(d => d.id)
}

// translate geojson to canvas coordinates
export function translate (lon, lat, loc) {
  let x = loc.width * (lon - loc.topLeft[0]) / (loc.bottomRight[0] - loc.topLeft[0])
  let y = loc.height * (loc.topLeft[1] - lat) / (loc.topLeft[1] - loc.bottomRight[1])
  return {x: Math.round(x), y: Math.round(y)}
}

export function makeTrack (loc, session, mac) {
  let start = session[0].timestamp
  if (!mac) mac = session[0].devices[0].id
  let points = session.map(tick => {
    let device = tick.devices.filter(d => d.id === mac)[0]
    return device && Object.assign({
      ts: tick.timestamp - start,
      lon: device.lon,
      lat: device.lat
    }, translate(device.lon, device.lat, loc))
  }).filter(Boolean)
  return { id: mac, points }
}
