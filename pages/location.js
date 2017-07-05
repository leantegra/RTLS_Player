/* global fetch */
import { Component } from 'react'
import PropTypes from 'prop-types';
import Layout from '../components/layout'
import Player from '../components/player'
import { Display1 } from 'react-mdc-web'

let locations = [
  { slug: 'ltg-web-room', title: 'LTG Office / Web Room' }
]

// FIX: load from server
let sessionIds = [
  'dynamic_3wb_tx5_adv500_first.json', 
  'dynamic_3wb_tx5_adv500-h10_sh1.5.json',
  'dynamic_3wb_tx5_adv500-h5_sh2.json',
  //'dynamic_T_3wb_tx5_adv500.json',
  //'dynamic_T_3wb_tx5_adv500-h10_sh1.5.json'
]

async function loadMeta(slug) {
  return fetch(`/static/locations/${slug}/meta.json`)
    .then((res) => res.json())
}

async function loadSessions(slug) {
  let files = await Promise.all(sessionIds.map(s => fetch(`/static/locations/${slug}/${s}`).then(r => r.json())))
  return files.filter(Boolean)
}

export default class Location extends Component {
  state = {}

  static async getInitialProps({ req, query, res }) {
    let location = locations.find(l => l.slug === query.slug)
    if (!location && res) res.statusCode = 404
    return { location }
  }

  /* Load meta and sessions on client only. */
  async componentDidMount() {
    let meta = await loadMeta(this.props.location.slug)
    let sessions = await loadSessions(this.props.location.slug)
    this.setState({ meta, sessions })
  }

  render() {
    let { location } = this.props
    let { meta, sessions } = this.state
    return (
      <Layout>
        <Display1>{location && location.title || 'Unknown'}</Display1>
        <Player meta={meta} sessions={sessions} />
      </Layout>
    )
  }
}

Location.propTypes = {
  location: PropTypes.object
}

