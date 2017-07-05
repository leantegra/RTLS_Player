import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Track from './track'
import Timer from './timer'
import { Display1 } from 'react-mdc-web'

const COLORS = ['red', 'green', 'orange', 'blue', 'yellow', 'pink']
const PLAYER_PADDING = 24;

function PlayerCanvas ({meta, tracks, time, tail}) {
  let style = {
    width: meta.width,
    height: meta.height,
    border: `#f0f0f0 ${PLAYER_PADDING}px solid`,
    background: `url(${meta.backgroundUrl}) no-repeat center`,
    position: 'relative'
  }
  let start = (tail ? Math.max(0, time - tail * 1000) : 0)
  return (
    <div style={ style }>
      {tracks.map((t, i) => (
        <Track key={i} width={meta.width} height={meta.height}
          points={t} color={COLORS[i]} start={start} end={time}
        />
        )
      )}
    </div>
  )
}

// translate geojson to canvas coordinates
function translate (lon, lat, loc) {
  let x = loc.width * (lon - loc.topLeft[0]) / (loc.bottomRight[0] - loc.topLeft[0])
  let y = loc.height * (loc.topLeft[1] - lat) / (loc.topLeft[1] - loc.bottomRight[1])
  return {x: Math.round(x), y: Math.round(y)}
}


function makeTrack(loc, session, mac) {
  let start = session[0].timestamp
  if (!mac) mac = session[0].devices[0].id
  return session.map(tick => {
      let device = tick.devices.filter(d => d.id === mac)[0]
      return device && Object.assign({
        ts: tick.timestamp - start,
        lon: device.lon,
        lat: device.lat,
      }, translate(device.lon, device.lat, loc))
    }).filter(Boolean)
}

export default class Player extends PureComponent {
  state = {
    time: 0,
    tail: 0,
    tracks: [],
  }

  onTick = (time, tail) => this.setState({time, tail})

  render() {
    let { meta, sessions } = this.props
    let { tracks, time, tail } = this.state
    console.log(`Player time=${time}, tail=${tail}`)
    tracks = sessions && sessions.map(s => makeTrack(meta, s)) || []
    let maxTime = tracks.reduce((acc, t) => Math.max(acc, t[t.length -1].ts), 0)
    if (!meta) return null;
    return (
      <div>
        <PlayerCanvas meta={meta} tracks={tracks} time={time} tail={tail} />
        <Timer onTick={this.onTick} max={maxTime} width={meta.width + 2 * PLAYER_PADDING} />
      </div>
    )
  }
}

Player.defaultProps = {
  meta: {}
}

Player.propTypes = {
  meta: PropTypes.object,
  sessions: PropTypes.object
}
