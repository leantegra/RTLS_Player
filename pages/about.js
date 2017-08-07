import Layout from '../components/layout'
import {Display1, Body1} from 'react-mdc-web'
import { reduxPage } from '../store'

/*
const StyleButton = (props) => (

  <div>
    <button className={'large' in props && 'large'}>
      <span>{props.children}</span>
      <style jsx>{`
      button {
        color: red;
        padding: 25px;
        animation-delay: 100;
      }
      .large {
        padding: 40px;
      }
    `}</style>
    </button>
  </div>
)

let Buttons = () => (
  <div>
    <StyleButton>one</StyleButton>
    <h3>
      <StyleButton large>two2</StyleButton>
    </h3>
  </div>
)
*/

const about = () => (
  <Layout title='About us'>
    <Display1>Leantegra RTLS player</Display1>
    <p>Play and visually compare variuos RTLS sessions.</p>
  </Layout>
)

export default reduxPage(about)
