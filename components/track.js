import { Component } from 'react'
import { PathLine } from 'react-svg-pathline'

export class Track extends Component {

  getVisiblePoints () {
    let {points, start, end, color} = this.props
    let visible = points.filter(p => (p.ts >= start && p.ts <= end))
    if (visible.length === 1) visible = points.slice(0, 1) // show 1 point at least
    console.log(`show ${visible.length} from ${points.length} for '${color}', last point:`, visible[visible.length-1])
    return visible
  }

  render () {
    let style = {
      width: this.props.width,
      height: this.props.height,
      position: 'absolute'
    }
    let points = this.getVisiblePoints()
    if (!points || !points.length) return null
    return (<svg style={style}>
      <PathLine
        points={points}
        stroke={this.props.color}
        strokeWidth='2'
        fill='none'
        r={0}
      />
    </svg>)
  }
}

Track.defaultProps = {
  color: 'red',
  points: [],
  start: 0,
  end: 10000
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
