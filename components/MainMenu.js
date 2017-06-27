import { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import Icon from "react-mdc-web/lib/Icon"
import Button from "react-mdc-web/lib/Button"
import { Menu, MenuAnchor, MenuItem } from "react-mdc-web/lib/Menu"

class MainMenu extends Component {
  toogler = () => this.setState({ open: !this.state.open })
  state = {}
  render() {
    return (
      <MenuAnchor style={{position: 'relative'}} >
        <Button onClick={this.toogler}>
          <Icon name="more_vert" />
        </Button>
        <Menu
          right
          open={this.state.open}
          onClose={()=> this.setState({open:false})}
        >
          <MenuItem onClick={console.log('About')}>
            <Link href="/about"><a>About</a></Link>
          </MenuItem>
        </Menu>
      </MenuAnchor>
    )
  }
}

export default MainMenu