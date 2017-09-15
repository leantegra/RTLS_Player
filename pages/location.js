import { Component } from 'react'
import PropTypes from 'prop-types'
import Location from '../containers/location'
import { reduxPage } from '../config/redux'

class LocationPage extends Component {
  static async getInitialProps ({ req, query, res }) {
    console.log('getInitialProps', query)
    return { slug: query.slug }
  }

  render () {
    let { slug } = this.props
    console.log('LocationPage.render', this.props, new Date())
    if (!slug) return null
    return (<Location slug={slug} />)
  }
}

Location.propTypes = {
  slug: PropTypes.string
}

export default reduxPage(LocationPage)
