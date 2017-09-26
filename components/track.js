import { Component } from 'react'
import { PathLine } from 'react-svg-pathline'
import { translate, translateDistance } from '../utils/session'

export default class Track extends Component {
  getVisiblePoints () {
    let {points, start, end, color} = this.props
    let visible = points.filter(p => (p.ts >= start && p.ts <= end))
    if (visible.length === 1) visible = points.slice(0, 1) // show 1 point at least
    console.log(`show ${visible.length} from ${points.length} for '${color}', start:${start}, end:${end}, last point:`, visible[visible.length - 1])
    return visible
  }

  renderSignal (signal) {
    let loc = this.props.location
    let device = loc.devices.find(d => d.id === signal.id)
    if (!device) return null
    let [lon, lat] = device.coords
    let center = translate(lon, lat, this.props.location)
    let radius = translateDistance(signal.distance, this.props.location)
    let style = {
      fill: 'none',
      strokeWidth: 1,
      stroke: this.props.color
    }
    return (
      <svg>
        <circle cx={center.x} cy={center.y} r={radius} style={style} />
      </svg>
    )
  }

  renderSignals (signals) {
    if (!signals) return null
    return signals.map(s => this.renderSignal(s)) 
  }

  render () {
    let points = this.getVisiblePoints()
    if (!points || !points.length) return null
    let lastPoint = points[points.length - 1]
    return (
      <svg>
        <PathLine
          points={points}
          stroke={this.props.color}
          strokeWidth='2'
          fill='none'
          r={0} />
        { this.renderSignals(lastPoint.signals) }        
      </svg>
    )
  }
}

Track.defaultProps = {
  color: 'red',
  points: [],
  start: 0,
  end: 10000
}