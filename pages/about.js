import Layout from '../components/layout'

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

export default () => (
  <Layout title='About us'>
    <p>RTLS player</p>
  </Layout>
)
