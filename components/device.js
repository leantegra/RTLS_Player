import { PureComponent } from 'react'
import { translate } from '../utils/session'

export default class Device extends PureComponent {

  render () {
    let [lon, lat] = this.props.device.coords
    let {color, radius} = this.props
    let center = translate(lon, lat, this.props.location)
    let style = {
      fill: color
    }
    return (
      <svg>
        <circle cx={center.x} cy={center.y} r={this.props.radius} style={style} />
      </svg>
    )
  }
}

Device.defaultProps = {
  color: 'orange',
  radius: 10
}
