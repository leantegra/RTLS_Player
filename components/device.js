import { PureComponent } from 'react'
import { translate } from '../utils/session'

export default class Device extends PureComponent {

  render() {
    let device = this.props.device;
    let [lon, lat] = device.coords
    let { color, size } = this.props
    let center = translate(lon, lat, this.props.location)
    let style = {
      fill: color
    }
    return (
      <svg>
        <rect
          x={center.x - size / 2}
          y={center.y - size / 2}
          width={size}
          height={size}
          rx={size / 5}
          ry={size / 5}
          style={style}
        />
        <title>{device.id}</title>
      </svg>
    )
  }
}

Device.defaultProps = {
  color: 'grey',
  size: 16
}
