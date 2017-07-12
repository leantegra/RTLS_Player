/* global fetch */
import { Component, PureComponent } from 'react'
import debuger from 'debug'
import PropTypes from 'prop-types'
import { SvgTest } from './track'

import { Headline, List, ListItem, ListGroup, ListHeader, Checkbox } from 'react-mdc-web'
import { getSessionDeviceIds, makeTrack } from '../utils/session'

const debug = debuger('sessions')

class TrackListItem extends PureComponent {
  state = {
    checked: false
  }

  onStateChange = ({ target: { checked } }) => {
    let { track, onChange } = this.props
    onChange({ track, checked })
  }

  render () {
    let { track, checked } = this.props
    debug('TLI', track, checked)
    return (
      <ListItem>
        <Checkbox
          onChange={this.onStateChange}
          checked={checked}
        />
        <label>{track.id}</label>
      </ListItem>
    )
  }
}

class TrackList extends Component {
  render () {
    let { tracks, onTrackChange, isTrackActive } = this.props
    return (
      <List>
        {tracks.map(track => (<TrackListItem track={track} key={track.id} onChange={onTrackChange} checked={isTrackActive(track)} />))}
      </List>
    )
  }
}

class SessionListItem extends Component {
  state = {
    expanded: false,
    loading: false,
    loaded: false,
    tracks: []
  }

  async loadTracks () {
    let { location, file } = this.props
    let { loading, loaded, tracks } = this.state
    debug('fetchSession', location, file, loading)
    try {
      let session = await fetch(`/static/locations/${location.slug}/${file}`).then(r => r.json())
      let ids = getSessionDeviceIds(session)
      tracks = ids.map(id => makeTrack(location, session, id))
      loaded = true
    } finally {
      loading = false
    }
    this.setState({ loading, loaded, tracks })
  }

  toggle () {
    let { expanded, loading, loaded } = this.state
    this.setState({ expanded: !expanded })
    if (!loaded && !loading) this.loadTracks()
  }

  renderTrackList () {
    let { onTrackChange, isTrackActive } = this.props
    let { expanded, tracks } = this.state
    if (!expanded || !tracks.length) return ''
    return (
      <TrackList tracks={tracks} onTrackChange={onTrackChange} isTrackActive={isTrackActive} />
    )
  }

  render () {
    let { file } = this.props
    let { tracks } = this.state
    return (
      <ListHeader>
        <span onClick={() => this.toggle()}>{file} (0/{tracks.length})</span>
        { this.renderTrackList() }
        <style jsx>{`
          span:hover {
            cursor: pointer;
          }
       `}</style>
      </ListHeader>
    )
  }
}

export default class SessionList extends PureComponent {
  state = {
    tracks: [],
    timestamp: 0
  }

  onTrackChange = ({ track, checked }) => {
    let { tracks } = this.state
    if (checked && tracks.length < 10) tracks = tracks.concat(track)
    else tracks = tracks.filter(t => t !== track)
    debug('onTrackChange', tracks, track, checked)
    this.setState({ tracks })
  }

  isTrackActive = (track) => {
      return this.state.tracks.indexOf(track) > -1
  }

  render () {
    let { files, location } = this.props
    return (
      <div>
        <Headline>RTLS sessions</Headline>
        <ListGroup>
          {files.map(file => (
            <SessionListItem location={location}
              file={file}
              key={file}
              onTrackChange={this.onTrackChange}
              isTrackActive={this.isTrackActive}
            />
          ))}
        </ListGroup>
      </div>
    )
  }
}
