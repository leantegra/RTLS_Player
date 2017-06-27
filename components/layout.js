import Link from 'next/link'
import Head from 'next/head'
import { Grid, Cell } from "react-mdc-web/lib/Grid"
import { Toolbar, ToolbarRow, ToolbarSection } from "react-mdc-web/lib/Toolbar"
import MainMenu from './MainMenu'
import { PROJECT_ID } from '../constants'

let MainToolbar = () => (
  <Toolbar>
    <ToolbarRow>
      <ToolbarSection align="start">
        <Link href="/">Home</Link>
      </ToolbarSection>
      <ToolbarSection>
      </ToolbarSection>
      <ToolbarSection align="end">
        <MainMenu />
      </ToolbarSection>
    </ToolbarRow>
  </Toolbar>
)

/*
*/
export default ({ children, title = 'RTLS player' }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet" />
      { /*<link type="text/css" href="/static/css/mdc.typography.css" rel="stylesheet">*/}
      <link type="text/css" href="/static/css/global.min.css" rel="stylesheet" />
    </Head>
    <header><MainToolbar/></header>
    
    <Grid>
      <Cell col={4} tablet={3}>Nav</Cell>
      <Cell col={8} tablet={5}>{ children }</Cell>
    </Grid>


    <footer>
      &copy; leantegra.com, 2017
    </footer>
  </div>
)
