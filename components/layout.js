import Link from 'next/link'
import Head from 'next/head'
import { Grid, Cell } from 'react-mdc-web/lib/Grid'
import { Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle } from 'react-mdc-web/lib/Toolbar'
import Button from 'react-mdc-web/lib/Button'
import { Body2 } from 'react-mdc-web/lib/Typography'

import MainMenu from './MainMenu'

let MainToolbar = () => (
  <Toolbar>
    <ToolbarRow>
      <ToolbarSection align='start'>
        <ToolbarTitle>
          <Link href='/'>
            <Button>Home</Button>
          </Link>
        </ToolbarTitle>
      </ToolbarSection>
      <ToolbarSection />
      <ToolbarSection align='end'>
        <MainMenu />
      </ToolbarSection>
    </ToolbarRow>
  </Toolbar>
)

let Footer = () => (
  <footer>
      <Body2>&copy; leantegra.com, 2017</Body2>
  </footer>
)
/*
*/
export default ({ children, title = 'RTLS player' }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet' />
      <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' rel='stylesheet' />
      { /* <link type="text/css" href="/static/css/mdc.typography.css" rel="stylesheet"> */}
      <link type='text/css' href='/static/css/global.min.css' rel='stylesheet' />
    </Head>
    <MainToolbar />

    <Grid>
      <Cell col={8} tablet={5}>{children}</Cell>
      <Cell col={4} tablet={3}></Cell>
    </Grid>
    
    <Footer />
  </div>
)
