import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { List, ListItem, Button, Icon, Subheading2 } from 'react-mdc-web'
import Track from './track'
import Timer from './timer'
import { translate } from '../utils/session'

import debuger from 'debug'
const debug = debuger('sessions')

const COLORS = ['red', 'green', 'purple', 'orange', 'navy', 'deeppink', 'brown', 'magenta', 'indigo', 'black']
const PLAYER_PADDING = 24

function getTrackColor (index) {
  return COLORS[index] || COLORS[COLORS.length - 1]
}

function LocationDevices ({meta}) {
  return null;
}

function SvgCanvas ({width, height, children}) {
  let style = {
    width,
    height,
    position: 'absolute',
    overflow: 'visible'
  }
  return (
    <svg style={style}>{children}</svg>
  )
}

function PlayerCanvas ({ meta, tracks, time, tail }) {
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
      <SvgCanvas width={meta.width} height={meta.height}>
        {tracks.map((t, i) => (
          <Track key={i} width={meta.width} height={meta.height}
            points={t.points} color={getTrackColor(i)} start={start} end={time}
          />)
        )}
      </SvgCanvas>
    </div>
  )
}

function PlayerLegend ({ tracks, onTrackChange }) {
  return (
    <List dense style={{maxWidth: 600}}>
      {
        tracks.map((t, i) => (
          <ListItem key={i}>
            <span style={{ color: getTrackColor(i) }}>{t.id} ({t.file})</span>
            <Icon className='clear-icon' name='clear' onClick={() => onTrackChange({track: t, checked: false})} />
          </ListItem>
        ))
      }
      <style jsx>{`
        // demo of style-jsx problem
        List, ul {
          maxWidth: 600px;
        }
        .clear-icon {
          color: red;
          cursor: pointer;
        }
      `}</style>
    </List>
  )
}

function PlayerFooter ({ tracks, onTrackChange, removeAllTracks }) {
  if (!tracks.length) return null
  return (
    <div>
      <Subheading2>Visible tracks</Subheading2>
      <PlayerLegend tracks={tracks} onTrackChange={onTrackChange} />
      <Button onClick={removeAllTracks}>Remove all</Button>
    </div>
  )
}

export default class Player extends PureComponent {
  static propTypes = {
    tracks: PropTypes.array,
    onTrackChange: PropTypes.func,
    removeAllTracks: PropTypes.func
  }

  state = {
    time: -1,
    tail: 0
  }

  onTick = (time, tail) => this.setState({ time, tail })

  clear = () => this.props.removeAllTracks()

  render () {
    let { meta, tracks, onTrackChange } = this.props
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
        <PlayerFooter tracks={tracks} onTrackChange={onTrackChange} removeAllTracks={this.clear} />
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
