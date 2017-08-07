import Layout from '../components/layout'
import { Link } from '../routes'

import {Display1} from 'react-mdc-web'
import Icon from 'react-mdc-web/lib/Icon'
import {List, ListItem} from 'react-mdc-web/lib/List'
import {reduxPage} from '../config/redux'

const homepage = () => (
  <Layout>
    <Display1>Availbale locations</Display1>
    <List style={{maxWidth: '400px'}}>
      <ListItem>
        <Icon name='room' />
        <Link route='/location/ltg-web-room'><a>LTG Web Room</a></Link>
      </ListItem>
    </List>
  </Layout>
)

export default reduxPage(homepage)
