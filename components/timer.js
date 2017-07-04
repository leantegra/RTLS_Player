import { PureComponent } from 'react'
import { Grid, Cell, Textfield, IconToggle, LinearProgress, FormField, Radio, Icon, Button } from 'react-mdc-web'

let TimeField = ({ time, onChange }) => (
  <Textfield
    helptext="Duration, sec"
    value={time / 1000}
    onChange={onChange}
  />
)

function SpeedControl ({ speed, onChange }) {
  let radioField = (value) => (
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
      {[1, 2, 4, 8].map(radioField)}
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


  renderTimeline() {
    let { time, stopped } = this.state
    let progress = time / (this.props.max || 1)
    return (
      <Grid>
        <Cell col={1} align="middle">
          <IconToggle className="material-icons" onClick={() => this.stop(0)}>
            skip_previous
          </IconToggle>
        </Cell>
        <Cell col={1} align="middle">
          <IconToggle className="material-icons" onClick={this.toggle}>
            {(this.state.stopped ? 'play' : 'pause') + '_circle_outline'}
          </IconToggle>
        </Cell>
        <Cell col={1} align="middle">
          <IconToggle className="material-icons" onClick={() => this.stop(this.props.max)}>
            skip_next
          </IconToggle>
        </Cell>
        
        <Cell col={9} align="middle">
          <LinearProgress accent progress={progress} />
        </Cell>

      </Grid>
    )
  }

  renderFields() {
    let { time, speed } = this.state
    return (
      <Grid>
        <Cell col={4} align="middle">
          <TimeField time={time} onChange={this.onTimeChange} />
        </Cell>
        <Cell col={8} align="middle">
          <SpeedControl speed={speed} onChange={this.onSpeedChange} />
        </Cell>
      </Grid>
    )
  }
  
  render() {
    return (
      <div>
        { this.renderTimeline() }
        { this.renderFields() }
      </div>  
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

  tick = () => {
    let { time, speed, stopped } = this.state
    console.log('tick', time, stopped)
    this.props.onTick(time)
    if (stopped) return;
    time += 1000
    this.setState({ time })
    if (time > this.props.max) this.stop()
    else setTimeout(this.tick, 1000 / speed)
  }

  stop(time) {
    this.setState({stopped: true })
    if (time !== undefined) this.setState({time}, this.tick)
  }

  start() {
    this.setState({
      stopped: false
    }, this.tick)
  }

  toggle = () => this.state.stopped ? this.start() : this.stop()
}

Timer.defaultProps = {
  max: 5 * 60 * 1000
}