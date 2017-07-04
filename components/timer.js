import { PureComponent } from 'react'
import { Grid, Cell, Textfield, IconToggle, LinearProgress, FormField, Radio } from 'react-mdc-web'

let TimeField = ({ time, onChange }) => (
  <Textfield
    helptext="Duration, sec"
    value={time / 1000}
    onChange={onChange}
  />
)

function SpeedField ({ speed, onChange }) {
  let makeRadio = (value) => (
    <FormField id="radio-speed-{value}" key={value}>
      <Radio
        name="speed"
        value={value}
        onChange={onChange}
        checked={speed === value}
      />
      <label>{value}x</label>
    </FormField>
  )

  return (
    <div>
      {[1, 2, 4, 8].map(makeRadio)}
    </div>
  )
}

export default class Timer extends PureComponent {

  state = {
    start: 0,
    end: 0,
    time: 0,
    speed: 2,
    stopped: true
  }


  render() {
    let { time, speed, stopped } = this.state
    return (
      <Grid>
        <Cell col={1} align="middle">
          <IconToggle className="material-icons" onClick={this.toggle}>
            {(this.state.stopped ? 'play' : 'pause') + '_circle_outline'}
          </IconToggle>
        </Cell>
        <Cell col={11} align="middle">
          <LinearProgress accent progress={time / this.props.max} />
        </Cell>
        <Cell col={4} align="middle">
          <TimeField time={time} onChange={this.onTimeChange} />
        </Cell>
        <Cell col={8} align="middle">
          <SpeedField speed={speed} onChange={this.onSpeedChange} />
        </Cell>

      </Grid>

    )
  }

  onTimeChange = ({ target: { value } }) => {
    // FIX
    let time = +value * 1000
    if (typeof time !== 'number' || time < 0 || time > this.props.max) return
    this.setState({ time })
  }

  onSpeedChange = ({ target: { name, value, checked } }) => {
    console.log('onSpeed', name, value, checked)
    this.setState({ speed: +value })
  }

  tick = (force) => {
    let { time, speed, stopped } = this.state
    console.log('tick', time, stopped, force)
    if (stopped && !force) return;
    time += 1000
    this.setState({ time })
    this.props.onTick(time)
    if (time > this.props.max) this.stop()
    else setTimeout(this.tick, 1000 / speed)
  }

  stop() {
    this.setState({ stopped: true })
  }

  start() {
    this.setState({
      stopped: false
    })
    this.tick(true)
  }

  toggle = () => this.state.stopped ? this.start() : this.stop()
}

Timer.defaultProps = {
  max: 5 * 60 * 1000
}