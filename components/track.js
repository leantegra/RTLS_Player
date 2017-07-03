import { Component } from 'react'
import { PathLine } from 'react-svg-pathline'

export class Track extends Component {

  getVisiblePoints () {
    return this.props.points
  }

  render () {
    let style = {
      width: this.props.width,
      height: this.props.height,
      position: 'absolute'
    }
    return (<svg style={style}>
      <PathLine
        points={this.getVisiblePoints()}
        stroke='red'
        strokeWidth='3'
        fill='none'
        r={0}
      />
    </svg>)
  }
}

export class SvgTest extends React.Component {
  render () {
    return (<svg>
      <PathLine
        points={[{ x: 0, y: 0 }, { x: 125, y: 0 }, { x: 125, y: 125 }, { x: 250, y: 125 }, {x: 250, y: 102}, {x: 10, y: 10}]}
        stroke='red'
        strokeWidth='3'
        fill='none'
        r={10}
      />
    </svg>)
  }
}

export default SvgTest
