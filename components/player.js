import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {List, ListItem} from 'react-mdc-web'
import Track from './track'
import Timer from './timer'
import debuger from 'debug'

const debug = debuger('sessions')

const COLORS = ['red', 'green', 'purple', 'orange', 'navy', 'deeppink', 'brown', 'magenta', 'indigo', 'black']
const PLAYER_PADDING = 24

function getTrackColor (index) {
  return COLORS[index] || COLORS[COLORS.length - 1]
}

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
    <div style={style}>
      {tracks.map((t, i) => (
        <Track key={i} width={meta.width} height={meta.height}
          points={t.points} color={getTrackColor(i)} start={start} end={time}
        />
        )
      )}
    </div>
  )
}

function PlayerLegend ({tracks}) {
  return (
    <List dense>
      {
        tracks.map((t, i) => (
          <ListItem key={i} style={{color: getTrackColor(i)}}>{t.id} ({t.file})</ListItem>
        ))
      }
    </List>
  )
}

export default class Player extends PureComponent {
  state = {
    time: -1,
    tail: 0
  }

  onTick = (time, tail) => this.setState({time, tail})

  render () {
    let { meta, tracks } = this.props
    let { time, tail } = this.state
    debug(`Player time=${time}, tail=${tail}`, tracks)
    if (!meta) return null
    let last = (list) => list[list.length - 1] // fix Javascript array
    let maxTime = tracks.reduce((acc, t) => Math.max(acc, last(t.points).ts), 0)
    if (time < 0) time = maxTime
    return (
      <div>
        <PlayerCanvas meta={meta} tracks={tracks} time={time} tail={tail} />
        <Timer onTick={this.onTick} max={maxTime} width={meta.width + 2 * PLAYER_PADDING} />
        <PlayerLegend tracks={tracks} />
      </div>
    )
  }
}

Player.defaultProps = {
  meta: {}
}

Player.propTypes = {
  meta: PropTypes.object,
  tracks: PropTypes.array
}
