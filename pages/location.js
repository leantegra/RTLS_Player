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
  'dynamic_3wb_tx5_adv500_first_n2.9_sh1.5_C1.3A-8.json',
  //'dynamic_3wb_tx5_adv500_first_A55_n3.2_lp0.3_sh1.5.json',
  //'dynamic_3wb_tx5_adv500_first_A55_n3.2_lp0.2_sh1.5.json',
  //'dynamic_3wb_tx5_adv500_first_A55_n3.2_sh1.5.json',
  //'dynamic_3wb_tx5_adv500_first_A47_n3.8_lp0.2_sh1.5.json',

  //'dynamic_3wb_tx5_adv500_first_n4_sh1.5.json',
  //'dynamic_3wb_tx5_adv500_first_lp0.3_Adivrssi.json',
  //'dynamic_3wb_tx5_adv500_first_lp0.3_Adivrssi1.2.json',
  //'dynamic_3wb_tx5_adv500_first_lp0.3_Adivrssi1.3.json',
  //'dynamic_3wb_tx5_adv500_first_lp0.3_Adivrssi1.4.json',
  //'dynamic_3wb_tx5_adv500_first_lp0.3_Adivrssi1.45.json',
  //'dynamic_3wb_tx5_adv500_first_lp0.3_Adivrssi1.47.json',
  // 'dynamic_3wb_tx5_adv500_first_lp0.4_C1.5.json',
  //'dynamic_3wb_tx5_adv500_first_lp0.7_C1.6.json',
  //'dynamic_3wb_tx5_adv500_first_lp0.99_C1.7.json',
  //'dynamic_3wb_tx5_adv500_first_n2.9_lp0.99_C1.5.json',
  //'dynamic_3wb_tx5_adv100_n2.9_lp0.1_sh1.5_C1.7.json',
  // 'dynamic_3wb_tx5_adv100_n2.9_lp0.1_C1.7.json',
  //'dynamic_3wb_tx5_adv500_second_n2.9_sh1.5_C1.5.json',

  //'dynamic_3wb_tx5_adv500_first_lp0.3_Adivrssi1.5.json',
  //'dynamic_3wb_tx5_adv500_first_lp0.3_Adivrssi2.json',
  //'dynamic_3wb_tx5_adv100_first_lp0.17_A28_n5.34.json',
  // 'dynamic_3wb_tx5_adv500-h10_sh1.5.json',
  // 'dynamic_3wb_tx5_adv500-h5_sh2.json',
  // 'dynamic_3wb_tx5_adv500-lp0.1.json',
  // 'dynamic_3wb_tx5_adv500-lp0.2.json',
  // 'dynamic_3wb_tx5_adv500-lp0.3.json',
  //'dynamic_3wb_tx5_adv500-lp0.1-h10_sh1.5.json',
  //'dynamic_3wb_tx5_adv500-lp0.2_h10_sh1.5.json',
  //'dynamic_3wb_tx5_adv500-lp0.3_h10_sh1.5.json',
  //'dynamic_3wb_tx5_adv500_first_lp0.17_A28_n5.34.json',
  // 'dynamic_3wb_tx5_adv100_first_lp0.17_A28_n5.34.json',
  // 'dynamic_3wb_tx5_adv100_first_lp0.1_A28_n5.34.json',
  // 'dynamic_3wb_tx5_adv100_first_lp0.1_A48_n2.8.json',
  
  // 'dynamic_T_3wb_tx5_adv500.json', // base
  // 'dynamic_T_3wb_tx5_adv500_A55_n3.2_lp0.3_sh1.5.json',
  // 'dynamic_T_3wb_tx5_adv500_A55_n3.2_sh1.5.json',
  //'dynamic_T_3wb_tx5_adv500_n2.9_sh1.5_C1.3A-10.json', //+++
  // 'dynamic_T_3wb_tx5_adv500-lp0.2.json',
  
  // 'dynamic_T_3wb_tx5_adv500-lp0.3.json',
  // 'dynamic_T_3wb_tx5_adv500-h10_sh1.5.json',
  //'dynamic_T_3wb_tx5_adv500-lp0.3_A28_n5.34.json',
  //'dynamic_T_3wb_tx5_adv500_lp0.1_h10_sh1.5.json',
  //'dynamic_T_3wb_tx5_adv500_lp0.2_h10_sh1.5.json',
  // user in same place
  //'4wr_spin_0607.json',
  //'static_13wb_tx5_adv500_A55_n3.2_lp0.2_sh1.5.json',
  'temp.json'
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

