import { PureComponent } from 'react'
import Layout from '../components/layout'
import { Display1 } from 'react-mdc-web'
import Icon from 'react-mdc-web/lib/Icon'
import { List, ListItem } from 'react-mdc-web/lib/List'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { Link } from '../routes'
import { getCommonState, loadLocationList } from '../store/common'

const LocationListItem = ({ location }) => (
  <ListItem key={location.slug}>
    <Icon name='room' />
    <Link route={'/location/' + location.slug}><a>LTG Web Room</a></Link>
  </ListItem>
)

class Homepage extends PureComponent {
  render () {
    let { locationList } = this.props
    return (
      <Layout>
        <Display1>Availbale locations</Display1>
        <List style={{ maxWidth: '400px' }}>
          {locationList.map(l => (<LocationListItem location={l} />))}
        </List>
      </Layout>
    )
  }
}

function mapStateToProps (state) {
  return getCommonState(state)
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators({ loadLocationList }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
