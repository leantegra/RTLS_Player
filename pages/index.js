import {PureComponent} from 'react'
import Homepage from '../containers/homepage'
import {reduxPage} from '../config/redux'
import {updateLocationList} from '../store/common'

async function loadLocations () {
  // FIX: load from server
  return Promise.resolve([
    { slug: 'ltg-web-room', title: 'LTG Office / Web Room' }
  ])
}

class Index extends PureComponent {

  static async getInitialProps ({ store }) {
    let locations = await loadLocations()
    store.dispatch(updateLocationList(locations))
  }

  render () {
    return (<Homepage />)
  }
}

export default reduxPage(Index)
