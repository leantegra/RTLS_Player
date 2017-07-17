/* global fetch */
import { Component } from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/layout'
import Player from '../components/player'
import SessionList from '../components/session'
import { Headline } from 'react-mdc-web'

import debuger from 'debug'
const debug = debuger('location')
const MAX_TRACKS_COUNT = 10

let locations = [
  { slug: 'ltg-web-room', title: 'LTG Office / Web Room' }
]

// FIX: load from server
let sessionIds = [
  'temp.json',
  'dynamic_3wb_tx5_adv500_first.json',
  'dynamic_3wb_tx5_adv500_first_1600_n2.9__sh1.5_lp_0.3_C1.3A-8_h10_sh2.json',
  'dynamic_3wb_tx5_adv500_first_n2.9_sh1.5_lp_0.3_C1.3A-8.json',
  'dynamic_3wb_tx5_adv500_first_n2.9_sh1.5_C1.3A-8.json',
  'dynamic_3wb_tx5_adv500_first_A55_n3.2_lp0.3_sh1.5.json',
  'dynamic_3wb_tx5_adv500_first_A55_n3.2_lp0.2_sh1.5.json',
  
  // 'dynamic_3wb_tx5_adv500_first_A55_n3.2_sh1.5.json',
  // 'dynamic_3wb_tx5_adv500_first_A47_n3.8_lp0.2_sh1.5.json',

  // 'dynamic_3wb_tx5_adv500_first_n4_sh1.5.json',
  // 'dynamic_3wb_tx5_adv500_first_lp0.3_Adivrssi.json',
  // 'dynamic_3wb_tx5_adv500_first_lp0.3_Adivrssi1.2.json',
  // 'dynamic_3wb_tx5_adv500_first_lp0.3_Adivrssi1.3.json',
  // 'dynamic_3wb_tx5_adv500_first_lp0.3_Adivrssi1.4.json',
  // 'dynamic_3wb_tx5_adv500_first_lp0.3_Adivrssi1.45.json',
  // 'dynamic_3wb_tx5_adv500_first_lp0.3_Adivrssi1.47.json',
  // 'dynamic_3wb_tx5_adv500_first_lp0.4_C1.5.json',
  // 'dynamic_3wb_tx5_adv500_first_lp0.7_C1.6.json',
  // 'dynamic_3wb_tx5_adv500_first_lp0.99_C1.7.json',
  // 'dynamic_3wb_tx5_adv500_first_n2.9_lp0.99_C1.5.json',

  // 'dynamic_3wb_tx5_adv100_n2.9_lp0.1_sh1.5_C1.7.json',
  // 'dynamic_3wb_tx5_adv100_n2.9_lp0.1_C1.7.json',
  // 'dynamic_3wb_tx5_adv100_first_lp0.17_A28_n5.34.json',
  // 'dynamic_3wb_tx5_adv100_first_lp0.1_A48_n2.8.json',

  // 'dynamic_3wb_tx5_adv500_second_n2.9_sh1.5_C1.5.json',

  // 'dynamic_3wb_tx5_adv500_first_lp0.3_Adivrssi1.5.json',
  // 'dynamic_3wb_tx5_adv500_first_lp0.3_Adivrssi2.json',
  
  // 'dynamic_3wb_tx5_adv500-h10_sh1.5.json',
  // 'dynamic_3wb_tx5_adv500-h5_sh2.json',
  // 'dynamic_3wb_tx5_adv500-lp0.1.json',
  // 'dynamic_3wb_tx5_adv500-lp0.2.json',
  // 'dynamic_3wb_tx5_adv500-lp0.3.json',
  // 'dynamic_3wb_tx5_adv500-lp0.1-h10_sh1.5.json',
  // 'dynamic_3wb_tx5_adv500-lp0.2_h10_sh1.5.json',
  // 'dynamic_3wb_tx5_adv500-lp0.3_h10_sh1.5.json',
  // 'dynamic_3wb_tx5_adv500_first_lp0.17_A28_n5.34.json',
  // 'dynamic_3wb_tx5_adv100_first_lp0.17_A28_n5.34.json',
  // 'dynamic_3wb_tx5_adv100_first_lp0.1_A28_n5.34.json',
  

  'dynamic_T_3wb_tx5_adv500.json', // base
  'dynamic_T_3wb_tx5_adv500_v1600_n2.9__sh1.5_lp_0.3_C1.3_h10_sh2.0.json',
  'dynamic_T_3wb_tx5_adv500_n2.9_sh1.5_C1.3A-10.json', // +++
  'dynamic_T_3wb_tx5_adv500_A55_n3.2_lp0.3_sh1.5.json',
  'dynamic_T_3wb_tx5_adv500_A55_n3.2_sh1.5.json',
  'dynamic_T_3wb_tx5_adv500_n2.9_sh1.5_lp_0.3_C1.3A-8.json',
  // 'dynamic_T_3wb_tx5_adv500-lp0.2.json',

  'dynamic_T_3wb_tx5_adv500-lp0.3.json',
  // 'dynamic_T_3wb_tx5_adv500-h10_sh1.5.json',
  // 'dynamic_T_3wb_tx5_adv500-lp0.3_A28_n5.34.json',
  // 'dynamic_T_3wb_tx5_adv500_lp0.1_h10_sh1.5.json',
  // 'dynamic_T_3wb_tx5_adv500_lp0.2_h10_sh1.5.json',
  
  'static_13wb_tx5_adv500.json',
  'static_13wb_tx5_adv500_A55_n3.2_lp0.2_sh1.5.json',
  'static_13wb_tx5_adv500_A55_n3.2_sh1.5.json',
  'static_13wb_tx5_adv500_A48_n2.9_sh1.5_C1.3A-8.json',

  'static_all_tx5_adv500_old_antenna.json',
  'static_all_tx5_adv500_old_antenna2706_A48_n2.9_sh1.5_lp0.2_C1.3A-8.json',

  '4wr_spin_0607.json', // rotating in same place
  '4wr_spin_0607_A55_n3.2_sh1.5.json',
  '4wr_spin_0607_A55_n3.2_sh1.5_lp0.2.json',
  '4wr_spin_0607_A48_n2.9_sh1.5_lp0.2_C1.3A-8.json'
]

async function loadMeta (slug) {
  return fetch(`/static/locations/${slug}/meta.json`)
    .then((res) => res.json())
}

async function loadSessions (slug) {
  let files = await Promise.all(sessionIds.map(s => fetch(`/static/locations/${slug}/${s}`).then(r => r.json())))
  return files.filter(Boolean)
}

export default class Location extends Component {
  state = {
    tracks: []
  }

  static async getInitialProps ({ req, query, res }) {
    let location = locations.find(l => l.slug === query.slug)
    if (!location && res) res.statusCode = 404
    return { location }
  }

  onTrackChange = ({ track, checked }) => {
    let { tracks } = this.state
    debug('onTrackChange', tracks.length, track.id, checked)
    if (checked && tracks.length < MAX_TRACKS_COUNT) tracks = tracks.concat(track)
    else tracks = tracks.filter(t => t !== track)
    debug('onTrackChange left', tracks.length, tracks)
    this.setState({ tracks })
  }

  removeAllTracks = () => this.setState({tracks: []})

  /* Load meta and sessions on client only. */
  async componentDidMount () {
    let meta = await loadMeta(this.props.location.slug)
    let sessions = await loadSessions(this.props.location.slug)
    this.setState({ meta, sessions })
  }

  render () {
    let { location } = this.props
    let { meta, tracks } = this.state
    let sidebar = meta ? <SessionList location={meta} tracks={tracks} files={sessionIds} onTrackChange={this.onTrackChange} /> : null
    return (
      <Layout sidebar={sidebar}>
        <Headline>{location ? location.title : 'Unknown'}</Headline>
        <Player meta={meta} tracks={tracks} onTrackChange={this.onTrackChange} removeAllTracks={this.removeAllTracks} />
      </Layout>
    )
  }
}

Location.propTypes = {
  location: PropTypes.object
}
