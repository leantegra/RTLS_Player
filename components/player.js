import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { SvgTest } from './track'

import { Display1 } from 'react-mdc-web'

function PlayerCanvas ({meta}) {
  let {width, height, url} = meta.background
  let style = {width, height, backgroundImage: `url(${url})`}
  return (
    <div style={ style }>
      <SvgTest />
    </div>
  )
}

export default class Player extends PureComponent {
  state = {
    tracks: [],
    timestamp: 0
  }

  
  render() {
    let { meta, sesions } = this.props
    let { tracks, timestamp } = this.state
    return (
      <div>
        { meta && <PlayerCanvas meta={meta} /> }
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
