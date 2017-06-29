import React from 'react'
import Layout from '../components/layout'
import {Display1} from 'react-mdc-web'

let locations = [
  { slug: 'ltg-web-room', title: 'LTG Office / Web Room' }
]

export default class extends React.Component {

  static async getInitialProps ({ query, res }) {
    let loc = locations.find(l => l.slug === query.slug)
    if (!loc && res) res.statusCode = 404
    return { loc }
  }

  render () {
    let { loc } = this.props
    return (
      <Layout>
        <Display1>{ loc.title || 'Unknown' }</Display1>
      </Layout>
    )
  }
}
