import { PureComponent } from 'react'

export default class Timer extends PureComponent {

  state = {
    start: 0,
    end: 0,
    time: 0,
    speed: 1.0
  }

  constructor (props) {
    super(props)
    this.start()
  }

  render () {
    let {time} = this.state
    let style = {
    }
    return (
      <div style={style}>
        Time: { time / 1000 }s
      </div>
    )
  }

  tick = () => {
    let {time, speed, stopped} = this.state
    if (stopped) return;
    time += 1000
    this.setState({time})
    this.props.onTick(time)
    if (time > this.props.max) this.stop()
    else setTimeout(this.tick, 1000 / speed)
  }

  stop() {
    this.setState({stopped: true})
  }

  start() {
    this.setState({
      time: 0,
      stopped: false,
    })
    this.tick()
  }
}

Timer.defaultProps = {
  max: 5 * 60 * 1000
}