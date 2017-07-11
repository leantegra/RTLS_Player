import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { SvgTest } from './track'

import { Headline, List, ListItem, ListGroup, ListHeader, Icon, IconToggle, RadioGroup, Radio } from 'react-mdc-web'

function DeviceList({ data }) {
  let macs = data[0] &&  data[0].devices.map(d => d.id).sort() || []
  return (
    <List>
      {macs.map(mac => (<ListItem>{mac}</ListItem>))}
    </List>
  )
}

class SessionListItem extends PureComponent {

  state = {
    expanded: false,
    loading: false,
    loaded: false,
    data: []
  }

  async fetchSession() {
    let { location, file } = this.props
    let { loading, loaded, data } = this.state
    console.log('fetchSession', location, file, loading)
    try {
      data = await fetch(`/static/locations/${location.slug}/${file}`).then(r => r.json())
      loaded = true
    } finally {
      loading = false
    }
    this.setState({ loading, loaded, data })
  }

  toggle() {
    let { expanded, loading, loaded, data } = this.state
    this.setState({ expanded: !expanded })
    if (!loaded && !loading) this.fetchSession()
  }

  render() {
    let { file } = this.props;
    let { expanded, data } = this.state
    return (
      <ListHeader>
        {file}
        <Icon name={expanded ? 'expand_less' : 'expand_more'} onClick={() => this.toggle()} />
        {expanded && data.length ? <DeviceList data={data} /> : ''}
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

