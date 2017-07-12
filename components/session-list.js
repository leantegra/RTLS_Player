import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { SvgTest } from './track'

import { Headline, List, ListItem, ListGroup, ListHeader, Icon, IconToggle, RadioGroup, Radio } from 'react-mdc-web'
import {getSessionDeviceIds, makeTrack} from '../utils/session'

function SessionTrackList({ tracks }) {
  return (
    <List>
      {tracks.map(track => (<ListItem>{track.id}</ListItem>))}
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
    let { file } = this.props;
    let { expanded, tracks } = this.state
    return (
      <ListHeader>
        <span onClick={() => this.toggle()}>{file} (0/0)</span>
        {expanded && tracks.length ? <SessionTrackList tracks={tracks} /> : ''}
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

  render() {
    let { files, location } = this.props
    let { tracks, timestamp } = this.state
    return (
      <div>
        <Headline>RTLS sessions</Headline>
        <ListGroup>
          {files.map(file => (
            <SessionListItem location={location} file={file} key={file} />
          ))}
        </ListGroup>
      </div>
    )
  }
}

