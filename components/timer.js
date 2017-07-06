import { PureComponent } from 'react'
import { Grid, Cell, Textfield, IconToggle, LinearProgress, FormField, Radio, Icon, Button } from 'react-mdc-web'

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
    tail: 0,
    stopped: true
  }


  renderTimeline() {
    let { time, speed, stopped, tail } = this.state
    let progress = time / (this.props.max || 1)
    let maxSeconds = this.props.max / 1000;
    
    return (
      <Grid>
        <Cell col={12}>
          <LinearProgress accent progress={progress} />
        </Cell>
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
        <Cell col={2} align="middle">
          <input onChange={this.onTimeChange} value={time/1000} title="Video offset, sec"
            type="number" style={{width: '40px'}}/>/{maxSeconds}s
        </Cell>
        <Cell col={5} align="middle">
          <SpeedControl speed={speed} onChange={this.onSpeedChange} />
        </Cell>
        <Cell col={2} align="middle">
          <input onChange={this.onTailChange} title="Video tail, seconds" value={tail} 
            type="number" style={{width: '40px'}}/>s
        </Cell>
        
      </Grid>
    )
  }

  render() {
    return (
      <div style={{width: this.props.width}}>
        { this.renderTimeline() }
      </div>  
    )
  }

  onTimeChange = ({target: {value}}) => {
    // FIX
    let time = +value * 1000
    if (typeof time !== 'number' || time < 0 || time > this.props.max) return
    this.setState({ time })
  }

  onTailChange = ({target: {value}}) => this.setState({tail: +value})

  onSpeedChange = ({ target: { name, value, checked } }) => {
    this.setState({ speed: +value })
  }

  tick = () => {
    let { time, speed, tail, stopped } = this.state
    console.log('tick', time, tail, stopped)
    this.props.onTick(time, tail)
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
    let time = this.state.time;
    if (time >= this.props.max) time = 0; // rewind to start
    this.setState({
      time,
      stopped: false
    }, this.tick)
  }

  toggle = () => this.state.stopped ? this.start() : this.stop()
}

Timer.defaultProps = {
  max: 5 * 60 * 1000
}

/*
let TimeField = ({ time, onChange }) => (

<Textfield
    helptext="Duration, sec"
    value={time / 1000}
    onChange={onChange}
  />
)
*/
