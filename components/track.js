import { Component } from 'react'
import { PathLine } from 'react-svg-pathline'

export default class Track extends Component {
  getVisiblePoints () {
    let {points, start, end, color} = this.props
    let visible = points.filter(p => (p.ts >= start && p.ts <= end))
    if (visible.length === 1) visible = points.slice(0, 1) // show 1 point at least
    console.log(`show ${visible.length} from ${points.length} for '${color}', start:${start}, end:${end}, last point:`, visible[visible.length - 1])
    return visible
  }

  render () {
    let points = this.getVisiblePoints()
    if (!points || !points.length) return null
    return (
      <PathLine
        points={points}
        stroke={this.props.color}
        strokeWidth='2'
        fill='none'
        r={0} />
    )
  }
}

Track.defaultProps = {
  color: 'red',
  points: [],
  start: 0,
  end: 10000
}