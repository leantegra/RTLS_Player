import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { SvgTest } from './track'

import { Headline, List, ListItem, ListGroup, ListHeader, Icon, Checkbox } from 'react-mdc-web'
import {getSessionDeviceIds, makeTrack} from '../utils/session'

class TrackListItem extends PureComponent  {
  state = {
    checked: false
  }

  onStateChange = ({target: {checked}}) => {
    let {track, onChange} = this.props
    onChange({track, checked})
    this.setState({checked})
  }

  render () {
    let {track} = this.props
    let {checked} = this.state
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

function TrackList({tracks, onTrackChange}) {
  return (
    <List>
      {tracks.map(track => (<TrackListItem track={track} key={track.id} onChange={onTrackChange} />))}
    </List>
  )
}

class SessionListItem extends PureComponent {

  state = {
    expanded: false,
    loading: false,
    loaded: false,
    tracks: []
  }

  async loadTracks() {
    let { location, file } = this.props
    let { loading, loaded, tracks } = this.state
    console.log('fetchSession', location, file, loading)
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

  toggle() {
    let { expanded, loading, loaded, data } = this.state
    this.setState({ expanded: !expanded })
    if (!loaded && !loading) this.loadTracks()
  }

  render() {
    let { file, onTrackChange } = this.props;
    let { expanded, tracks } = this.state
    return (
      <ListHeader>
        <span onClick={() => this.toggle()}>{file} (0/0)</span>
        {expanded && tracks.length ? <TrackList tracks={tracks} onTrackChange={onTrackChange} /> : ''}
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

  onTrackChange = ({track, checked}) => {
    let {tracks} = this.state
    if (checked) tracks = tracks.concat(track)
    else tracks = tracks.filter(t => t !== track)
    console.log('onTrackChange', tracks)
    this.setState({tracks})
  }

  render() {
    let { files, location } = this.props
    let { tracks, timestamp } = this.state
    return (
      <div>
        <Headline>RTLS sessions</Headline>
        <ListGroup>
          {files.map(file => (
            <SessionListItem location={location} file={file} key={file} onTrackChange={this.onTrackChange} />
          ))}
        </ListGroup>
      </div>
    )
  }
}

