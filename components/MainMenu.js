import { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import Icon from "react-mdc-web/lib/Icon"
import Button from "react-mdc-web/lib/Button"
import { Menu, MenuAnchor, MenuItem } from "react-mdc-web/lib/Menu"

let routeTo = (url) => () => Router.push(url)

class MainMenu extends Component {
  toogler = () => this.setState({ open: !this.state.open })
  state = {}
  render() {
    return (
      <MenuAnchor style={{ position: 'relative' }} >
        <Button onClick={this.toogler}>
          <Icon name="more_vert" />
        </Button>
        <Menu
          right
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
        >
          <MenuItem><Link href='/about'><Button>About</Button></Link></MenuItem>
        </Menu>
      </MenuAnchor>
    )
  }
}

export default MainMenu