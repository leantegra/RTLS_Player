import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { SvgTest } from './track'

import { Display1 } from 'react-mdc-web'

export default class SessionList extends PureComponent {
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

