import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { SvgTest, Track } from './track'

import { Display1 } from 'react-mdc-web'

const COLORS = ['red', 'green', 'orange', 'blue', 'yellow', 'pink']

function PlayerCanvas ({meta, tracks}) {
  let style = {
    width: meta.width,
    height: meta.height,
    backgroundImage: `url(${meta.backgroundUrl})`,
    position: 'relative'
  }
  return (
    <div style={ style }>
      {tracks.map((t, i) => (
        <Track key={i} width={meta.width} height={meta.height} points={t} color={COLORS[i]}/>
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
  let start = session[0].timestamp;
  if (!mac) mac = session[0].devices[0].id
  return session.map(tick => {
      let device = tick.devices.filter(d => d.id === mac)[0]
      return device && Object.assign({
        ts: tick.timestamp - start,
      }, translate(device.lon, device.lat, loc))
    }).filter(Boolean)
}

export default class Player extends PureComponent {
  state = {
    tracks: [],
    timestamp: 0
  }

  
  render() {
    let { meta, sessions } = this.props
    let { tracks, timestamp } = this.state
    tracks = sessions && sessions.map(s => makeTrack(meta, s)) || []
    console.log('tracks', tracks)
    return (
      <div>
        { meta && <PlayerCanvas meta={meta} tracks={tracks} /> }
      </div>
    )
  }
}

Player.defaultProps = {
}

Player.propTypes = {
  meta: PropTypes.object,
  sessions: PropTypes.object
}
