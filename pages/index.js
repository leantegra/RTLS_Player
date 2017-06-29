import Layout from '../components/layout'
import Link from 'next/link'
import {Display1} from 'react-mdc-web'
import Icon from 'react-mdc-web/lib/Icon'
import {List, ListItem} from 'react-mdc-web/lib/List'

export default () => (
  <Layout>
    <Display1>Availbale locations</Display1>
    <List style={{maxWidth: '400px'}}>
      <ListItem>
        <Icon name='room' />
        <Link href='/location/ltg-web-room'><a>LTG Web Room</a></Link>
      </ListItem>
    </List>
  </Layout>
)
