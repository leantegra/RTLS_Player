import React from 'react'

let locations = [
  { slug: 'ltg-web-room', title: 'LTG Office / Web Room' }
]

export default class extends React.Component {

  static async getInitialProps ({ query, res }) {
    console.log('Location q', query)
    let loc = locations.find(l => l.slug === query.slug)

    if (!loc && res) res.statusCode = 404

    return { loc }
  }

  render () {
    let { loc } = this.props

    if (!loc) return <h1>Location isn't found</h1>

    return <h1>{loc.title}</h1>
  }
}
