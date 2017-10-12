/* global fetch */
import { Component } from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/layout'
import Player from '../components/player'
import SessionList from '../components/session'
import { Headline } from 'react-mdc-web'
import debug from 'debug'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {childActionCreators, getLocationState} from '../store/locations'
import * as locationActions from '../store/location'

const MAX_TRACKS_COUNT = 10
const log = debug('location')

// FIX: load from server

let sessionIds = [
  'temp.json',
  'temp_t3d.json',
  'temp_T_t3d.json',
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

class Location extends Component {
  state = {
    tracks: []
  }

  onTrackChange = ({ track, checked }) => {
    let { tracks } = this.props
    log('onTrackChange', tracks.length, track.id, checked)
    if (checked && tracks.length < MAX_TRACKS_COUNT) this.props.addTrack(track)
    else this.props.removeTrack(track)
    log('onTrackChange remaining', tracks.length, tracks)
  }

  removeAllTracks = () => this.props.removeAllTracks()

  /* Load meta and sessions on client only. */
  async componentDidMount () {
    let {slug} = this.props
    // load location info by slug
    let meta = await loadMeta(slug)
    this.props.updateMeta(meta)
  }

  getSidebar (meta, tracks) {
    if (!meta) return null
    return (<SessionList location={meta} tracks={tracks} files={sessionIds} onTrackChange={this.onTrackChange} />)
  }

  render () {
    let { meta, tracks } = this.props
    let sidebar = this.getSidebar(meta, tracks)
    return (
      <Layout sidebar={sidebar}>
        <Headline>{meta ? meta.title : ''}</Headline>
        {tracks
        ? <Player meta={meta} tracks={tracks} onTrackChange={this.onTrackChange}
          removeAllTracks={this.removeAllTracks} /> : null }

      </Layout>
    )
  }
}

Location.propTypes = {
  slug: PropTypes.string,
  meta: PropTypes.object,
  tracks: PropTypes.array
}

function mapStateToProps (state, props) {
  return {...getLocationState(state, props.slug), slug: props.slug}
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators(childActionCreators(props.slug, locationActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Location)
